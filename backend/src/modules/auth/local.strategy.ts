import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
       super({
            usernameField: 'emailOrUsername'
        });
    }
    
    async validate(emailOrUsername: string, password: string) {
        const user = await this.authService.validateUser(emailOrUsername, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
    
}