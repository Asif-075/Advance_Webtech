
import { Doctor } from 'src/doctor/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,BeforeInsert, JoinColumn } from 'typeorm';
import * as bcrypt from'bcrypt';


@Entity()
export class Paitent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  appointment: boolean;

  @Column({ type: 'date' })
  appointmentDate: Date;

  @Column({ type: 'float' })
  fees: number;

  @Column()
  doctorId: number;


  @ManyToOne(() => Doctor, (doctor) => doctor.paitent)
  @JoinColumn({name : 'doctorId' })
  doctor: Doctor;

  @BeforeInsert()
     async  hashPassword(){
        this.password =await bcrypt.hash(this.password,10)
      }

}
