import { Body, Controller, Post, Req, Get, Query, Headers, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post("/register")
  register(@Body() data: registerDto) {
    return this.authService.register(data);
  }
  @Post("/login")
  login(@Body() data: loginDto) {
    return this.authService.login(data)
  }
  @ApiBearerAuth("access-token")
  @Post("/refresh-token")
  refreshToken(@Req() req : Request) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
      throw new UnauthorizedException();
    }
    return this.authService.refreshToken(authHeader.replace("Bearer ", ""));
  }
}
