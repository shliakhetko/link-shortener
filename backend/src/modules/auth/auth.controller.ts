import {Body, Request, Controller, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req:any, @Body() loginDto: LoginDto) {
        return this.authService.login(req.user);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Post('profile')
    getProfile(@Request() req:any) {
        return req.user;
    }
}