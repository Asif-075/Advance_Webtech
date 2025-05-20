import { Body, Controller,Get, Post, Param, Res } from '@nestjs/common';
import { PaitentService } from './paitent.service';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';

@Controller('paitent')
export class PaitentController {
    constructor(private paitentService: PaitentService){}

    @Get()
    async getAllPaitent() {
        return this.paitentService.findAll();
    }
    @Get(':id')
        async getDoctor(@Param('id') id: number) {
          return this.paitentService.findOne(id);
        }

    @Post()
    async createPaitent(@Body() body){
        const {name, email, password, appointment, appointmentDate, fees, doctorId}= body;
        return this.paitentService.create(name, email, password, appointment, appointmentDate ,fees, doctorId);
    }
    @Post('download')
    async downloadPDF(@Body('name') name: string, @Res() res: Response) {
    try {
      console.log('Searching for patients with name:', name);
      const paitents = await this.paitentService.findByName(name);

      if (!paitents || paitents.length === 0) {
        return res.status(404).send('No patient found');
      }

      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=paitents.pdf');
      doc.pipe(res);

      doc.fontSize(16).text(`Patient Records for "${name}"`, { underline: true });
      doc.moveDown();

      paitents.forEach((p, index) => {
        doc
          .fontSize(12)
          .text(
            `#${index + 1} \nName: ${p.name} \nEmail: ${p.email} \nAppointment: ${p.appointment} \nDate: ${p.appointmentDate} \nFee: ${p.fees}\n`
          );
        doc.moveDown();
      });

      doc.end();
    } catch (error) {
      console.error('Error generating PDF:', error.stack);
      return res.status(500).send('Internal Server Error');
    }
  }
}

