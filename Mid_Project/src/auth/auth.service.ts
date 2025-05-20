import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { DoctorService } from 'src/doctor/doctor.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { CreateDoctorDto } from 'src/doctor/dto/creat-doctor.dto';

@Injectable()
export class AuthService {
  constructor(
    private doctorService: DoctorService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateDoctor(name: string, password: string) {
    const doctor = await this.doctorService.findByName(name);
    if (!doctor) throw new UnauthorizedException('Doctor not found');

    const isMatch = await compare(password, doctor.password);
    if (!isMatch) throw new UnauthorizedException('Wrong password');

    return { id: doctor.id, name: doctor.name };
  }

  async login(doctor: any) {
    const payload = { sub: doctor.id, name: doctor.name };
    const token = this.jwtService.sign(payload);
    return {
      message: `Welcome Dr. ${doctor.name}`,
      access_token: token,
    };
  }

  async forgotPassword(email: string) {
    const doctor = await this.doctorService.findByEmail(email);
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }
    if (doctor.resetToken) {
      throw new UnauthorizedException('You are already logged in');
    }
    const resetToken = randomBytes(20).toString('hex');
    doctor.resetToken = resetToken;
    await this.doctorService.save(doctor);
  
    await this.mailService.sendMail(
      doctor.email,
      'Reset Your Password',
      `Use this token to reset your password: ${resetToken}`
    );
  
    return { message: 'Reset token sent to email' };
  }
  
  async resetPassword(token: string, newPassword: string) {
    const doctor = await this.doctorService.findByResetToken(token);
    if (!doctor) throw new BadRequestException('Invalid token');

    doctor.password = await bcrypt.hash(newPassword, 10);
    doctor.resetToken = '';

    await this.doctorService.save(doctor);
    return { message: 'Password successfully reset' };
  }
  async registerDoctor(createDoctorDto: CreateDoctorDto) {
    const existingDoctor = await this.doctorService.findByEmail(createDoctorDto.email);
    if (existingDoctor) {
      throw new BadRequestException('Doctor with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);
    createDoctorDto.password = hashedPassword;
    const newDoctor = await this.doctorService.create(createDoctorDto);

    await this.mailService.sendMail(
      newDoctor.email,
      'Welcome to Smart Hospital',
      `Hello Dr. ${newDoctor.name}, your account has been created successfully.`
    );

    return newDoctor;
  }
}




