import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { PaitentModule } from './paitent/paitent.module';
import { Doctor } from './doctor/doctor.entity';
import { Paitent } from './paitent/paitent.entity';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'asif22',
      database: 'doctor',
      entities: [Doctor, Paitent],
      synchronize: true,
    }),
    DoctorModule,
    PaitentModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
