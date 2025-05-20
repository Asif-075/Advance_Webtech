import { IsEmail, IsOptional, IsString } from "class-validator";


export class UpdateDoctorDto {
    @IsOptional()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

     @IsOptional()
        @IsString()
        resetToken?: string;
    
   
}
