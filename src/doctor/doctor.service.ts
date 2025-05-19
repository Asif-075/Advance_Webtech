import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/creat-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { MailService } from 'src/mail/mail.service';
import { Paitent } from 'src/paitent/paitent.entity';

@Injectable()
export class DoctorService {
    constructor(
      @InjectRepository(Doctor)
      private doctorRepository: Repository<Doctor>,
      @InjectRepository(Paitent)
      private readonly paitentRepository: Repository<Paitent>,
      private mailService: MailService,
    ) {}

      findAll() : Promise<Doctor[]> {
        return this.doctorRepository.find();
      }

      async create(body: CreateDoctorDto) {
        const doctor = this.doctorRepository.create(body);
      
        try {
          const savedDoctor = await this.doctorRepository.save(doctor);
      
          await this.mailService.sendMail(
            savedDoctor.email,
            'Welcome to Smart Hospital',
            `Hello Dr. ${savedDoctor.name}, your account has been created successfully.`
          );
      
          return savedDoctor;
        } catch (error) {
          if (error.code === '23505') {
            throw new BadRequestException('Email already exists');
          }
          throw error;
        }
      }
      async save(doctor: Doctor): Promise<Doctor> {
        return this.doctorRepository.save(doctor);
      }
      
      async findByName(name:string){
        return await this.doctorRepository.findOne({
          where:{
            name,
          }
        })
      }

      async findOne(id: number): Promise<Doctor> {
        const doctor = await this.doctorRepository.findOneBy({ id });
        
        if (!doctor){
            throw new NotFoundException('doctor not found');
        }
        return doctor;

      }
      async update(id: number, doctorDto: UpdateDoctorDto): Promise<Doctor>
      {
        const doctor = await this.doctorRepository.findOneBy({ id });
          
        if(!doctor){
            throw new NotFoundException('doctor not found');
        }
        Object.assign(doctor, doctorDto);
        return this.doctorRepository.save(doctor);
      }



      async remove (id: number): Promise<void>
      {
        const doctor = await this.doctorRepository.findOneBy({ id });
        if (!doctor){
            throw new NotFoundException('doctor not found');  
        }

        await this.doctorRepository.delete(id);
      }
      async getDoctorSummaryByName(name: string) {
        const doctor = await this.doctorRepository.findOne({
          where: { name },
        });
      
        if (!doctor) {
          throw new NotFoundException('Doctor not found');
        }
      
        const patients = await this.paitentRepository.find({
          where: { doctor: { id: doctor.id }, appointment: true },
        });
      
        const summary = {
          totalPatients: patients.length,
          totalIncome: 0,
          byDay: {},
          byMonth: {},
          byYear: {},
        };
      
        for (const p of patients) {
          const date = new Date(p.appointmentDate);
          const day = date.toISOString().split('T')[0];
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          const year = `${date.getFullYear()}`;
      
          summary.totalIncome += p.fees;
      
          summary.byDay[day] = (summary.byDay[day] || 0) + p.fees;
          summary.byMonth[month] = (summary.byMonth[month] || 0) + p.fees;
          summary.byYear[year] = (summary.byYear[year] || 0) + p.fees;
        }
      
        return summary;
      }
      
      async findByEmail(email: string): Promise<Doctor | null> {
        return this.doctorRepository.findOne({ where: { email } });
      }
      
      async findByResetToken(resetToken: string): Promise<Doctor | null> {
        return this.doctorRepository.findOne({ where: { resetToken } });
      }
}
