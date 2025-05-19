import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DoctorService } from 'src/doctor/doctor.service';
import { LocalStrategy } from './local.stratigies';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Doctor } from 'src/doctor/doctor.entity';
import { MailModule } from 'src/mail/mail.module';
import { Paitent } from 'src/paitent/paitent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor,Paitent]),
    JwtModule.register({
      secret: 'supersecretkey', 
      signOptions: { expiresIn: '1d' },
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, DoctorService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

