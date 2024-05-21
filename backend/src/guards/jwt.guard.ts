import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError } from "jsonwebtoken";


@Injectable()
export class JwtAuthGuard extends AuthGuard("myJwt") {
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (err || !user) {
            if (info instanceof TokenExpiredError) {
                throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED)
            }
            else {
                throw err || new UnauthorizedException();
            }
        }
        return user;
    }
}