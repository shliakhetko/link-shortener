import {Body, Request, Controller, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {LoginDto} from "./dto/login.dto";
import {LocalGuard} from "./guards/local.guard";
import {JwtGuard} from "./guards/jwt.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Request() req:any, @Body() loginDto: LoginDto) {
        return this.authService.login(req.user);
    }
    
    @UseGuards(JwtGuard)
    @Post('profile')
    getProfile(@Request() req:any) {
        return req.user;
    }
}