import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateDoctorDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    resetToken?: string;

    

}
