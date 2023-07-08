import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.local';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(12121212)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(process.env.JWT_SECRET_KEY)
    return req.user;
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log(req.body.refresh)
    return this.authService.refreshToken(req.user)
  }
}