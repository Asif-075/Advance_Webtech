import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Paitent} from './paitent.entity';
import * as PDFDocument from 'pdfkit';
import * as streamBuffers from 'stream-buffers';


@Injectable()
export class PaitentService {
    constructor( @InjectRepository(Paitent) private paitentRepository: Repository<Paitent>,)
    {}

    create(name: string, email: string, password: string, appointment: boolean, appointmentDate: Date, fees: number, doctorId: number  ): Promise<Paitent>{
        const paitent= this.paitentRepository.create({ name, email, password, appointment, appointmentDate, fees, doctorId});

        return this.paitentRepository.save(paitent);
    }

    async findOne(id: number): Promise<Paitent> {
            const paitent = await this.paitentRepository.findOneBy({ id });
            
            if (!paitent){
                throw new NotFoundException('doctor not found');
            }
            return paitent;
    
          }
    findAll(): Promise<Paitent[]>{
        return this.paitentRepository.find();
    }

    async findByName(name: string): Promise<Paitent[]> {
    console.log('Finding patients with name:', name);
    const patients = await this.paitentRepository.find({ where: { name } });
    console.log('Patients found:', patients);
     return patients;
    }

}
