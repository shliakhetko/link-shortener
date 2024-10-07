import {IsOptional, IsString, IsUrl} from "class-validator";

export class CreateLinkDto {
    @IsOptional()
    @IsString()
    title?: string;
    
    @IsUrl()
    link: string;
    
    @IsString()
    shortLink: string;
}