import { Module } from '@nestjs/common';
import { PaitentService } from './paitent.service';
import { PaitentController } from './paitent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paitent } from  './paitent.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Paitent])],
  providers: [PaitentService],
  controllers: [PaitentController]
})
export class PaitentModule {}
