import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'asifuzzamanasif637@gmail.com',       
      pass: 'ntdy zhyh kovs mwyb',         
    },
  });

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: '"Smart Hospital" <your-gmail@gmail.com>',
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
