import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { registerDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { TokenDecodePayload, TokenPayload } from './dto/tokenPayload.dto';
import { JwtService } from '@nestjs/jwt';
import generateRandomString from 'src/ultility/generatorRandomString';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private readonly jwtService: JwtService) { }
    prisma = new PrismaClient();
    async register(form: registerDto) {
        const user = await this.prisma.users.findFirst({
            where: {
                email: form.email
            }
        });
        if (!user) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(form.password, saltOrRounds);
            try {
                await this.prisma.users.create({
                    data: {
                        fullname: form.fullname,
                        email: form.email,
                        password: hash,
                        age : form.age
                    }
                });
                return {
                    statusCode: HttpStatus.CREATED,
                    message: "User created successfully"
                }
            }
            catch (error) {
                throw new Error(error);
            }
        }
        else throw new HttpException("Email already registered", HttpStatus.CONFLICT);
    }
    async createPairAccessAndRefreshToken(payload: TokenPayload, idUser: number) {
        const keyPairRandom = generateRandomString(+process.env.LENGTH_KEY_PAIR);
        payload.keyPair = keyPairRandom;
        const accessToken = await this.createAccessToken(payload);
        const refreshToken = await this.createRefreshToken(payload);
        await this.prisma.users.update({
            where: {
                id: idUser
            },
            data: {
                refresh_token: refreshToken
            }
        });
        return accessToken;
    }
    async login(form: loginDto) {
        const user = await this.prisma.users.findFirst({
            where: {
                email: form.email
            }
        });
        if (user) {
            const isPasswordValid = await bcrypt.compare(form.password, user.password);
            if (isPasswordValid) {
                const payload: TokenPayload = {
                    id: user.id,
                    email: user.email,
                    fullname: user.fullname,
                    keyPair: "",
                    avatar: ""
                };
                const accessToken = await this.createPairAccessAndRefreshToken(payload, user.id);
                return {
                    statusCode: HttpStatus.CREATED,
                    message: "accessToken successfully",
                    data: accessToken
                };
            }
        }
        else {
            throw new HttpException("Email not registered", HttpStatus.NOT_FOUND);
        }
    }

    async createAccessToken(payload: TokenPayload): Promise<string> {
        const token = this.jwtService.sign(payload, {
            secret: process.env.SECRECT_KEY,
            expiresIn: process.env.EXPIRES_IN
        });
        return token;
    }
    async createRefreshToken(payload: TokenPayload): Promise<string> {
        const token = this.jwtService.sign(payload, {
            secret: process.env.SECRECT_KEY_REFRESH,
            expiresIn: process.env.REFRESH_EXPIRES_IN
        })
        return token;
    }
    async refreshToken(token: string) {
        const payload: TokenDecodePayload = this.jwtService.decode(token);
        const user = await this.prisma.users.findUnique({
            where: {
                id: payload.id
            }
        });
        if (user) {
            const { refresh_token } = user;
            const decodeRefresh: TokenDecodePayload = this.jwtService.decode(refresh_token);
            if (payload.keyPair === decodeRefresh.keyPair) {
                const _payload: TokenPayload = {
                    id: user.id,
                    email: user.email,
                    fullname: user.fullname,
                    keyPair: "",
                    avatar: ""
                };
                ///////
                const accessToken = await this.createPairAccessAndRefreshToken(_payload, user.id);
                return {
                    statusCode: HttpStatus.CREATED,
                    message: "accessToken successfully",
                    data: accessToken
                };
            }
            throw new HttpException("Token not right", HttpStatus.NOT_ACCEPTABLE);
        }
        throw new UnauthorizedException();
    }
}
