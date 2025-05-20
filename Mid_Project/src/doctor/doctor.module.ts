import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { Paitent } from 'src/paitent/paitent.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor,Paitent]), MailModule],
  providers: [DoctorService],
  controllers: [DoctorController]
})
export class DoctorModule {}
