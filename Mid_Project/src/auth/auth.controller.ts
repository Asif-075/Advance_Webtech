import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateDoctorDto } from 'src/doctor/dto/creat-doctor.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('register')
  async register(@Body() createDoctorDto: CreateDoctorDto) {
    return this.authService.registerDoctor(createDoctorDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('reset-password')
  resetPassword(@Body('token') token: string, @Body('newPassword') newPassword: string) {
    return this.authService.resetPassword(token, newPassword);
  }
}
