﻿import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString({each: true})
    @IsStrongPassword()
    links: string[];
}