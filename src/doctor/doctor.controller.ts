import { Controller,Get,Post,Put,Delete,Param,Body,UseGuards,Request,} from '@nestjs/common';
  import { DoctorService } from './doctor.service';
  import { CreateDoctorDto } from './dto/creat-doctor.dto';
  import { UpdateDoctorDto } from './dto/update-doctor.dto';
  import { AuthGuard } from '@nestjs/passport';
  
  @Controller('doctor')
  export class DoctorController {
    constructor(private doctorService: DoctorService) {}
  
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllDoctors(@Request() req) {
      return this.doctorService.findAll();
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createDoctor(@Body() body: CreateDoctorDto) {
      return this.doctorService.create(body);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getDoctor(@Param('id') id: number) {
      return this.doctorService.findOne(id);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateDoctor(@Param('id') id: number, @Body() body: UpdateDoctorDto) {
      return this.doctorService.update(id, body);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteDoctor(@Param('id') id: number) {
      return this.doctorService.remove(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('summary')
    async getSummaryByName(@Body('name') name: string) {
    return this.doctorService.getDoctorSummaryByName(name);
    }
  }
  
    