import { Paitent } from "src/paitent/paitent.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn  } from "typeorm";
import * as bcrypt from'bcrypt';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true, type: 'varchar'})
     resetToken: string ;

    @OneToMany(()=> Paitent, (paitent) => paitent.doctor)
    paitent: Paitent[];

    @BeforeInsert()
   async  hashPassword(){
      this.password =await bcrypt.hash(this.password,10)
    }
    
}