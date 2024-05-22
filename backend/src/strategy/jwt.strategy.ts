

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenExpiredError } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { TokenDecodePayload } from 'src/auth/dto/tokenPayload.dto';
@Injectable()

//Authorizition
export class JwtStrategy extends PassportStrategy(Strategy, "myJwt") {
    constructor(config: ConfigService, private readonly jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRECT_KEY,
        });
    }
    prisma = new PrismaClient();
    async validate(payload: any) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: payload.id
            },
            select: {
                refresh_token: true
            }
        });
        try {
            const decodeRefresh: TokenDecodePayload = await this.jwtService.verify(user.refresh_token, {
                secret: process.env.SECRECT_KEY_REFRESH,
            });
            if (payload.keyPair === decodeRefresh.keyPair) {
                return payload;
            }
            throw new UnauthorizedException();
        }
        catch (error) {
            throw new HttpException("Refresh token is expired", HttpStatus.UNAUTHORIZED);
        }
    }
}