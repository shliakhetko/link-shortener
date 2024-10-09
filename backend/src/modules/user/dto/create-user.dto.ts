import {IsEmail, IsMongoId, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsMongoId({ each: true })
    links: string[];
}