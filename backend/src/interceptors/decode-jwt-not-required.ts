// src/common/interceptors/jwt-decode.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtDecodeNotRequired implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];
        if (authHeader) {
            const token = authHeader.replace("Bearer ", ""); // Assuming 'Bearer <token>'
            try {
                const decoded = await this.jwtService.verify(token, {
                    secret: process.env.SECRECT_KEY,
                });
                request.user = decoded;
            } catch (error) {
                request.user = null;
                // If decoding fails, proceed without setting request.user
            }
        }

        return next.handle().pipe(
            tap(() => {
                // This can be used to do something with the response if needed
            }),
        );
    }
}
