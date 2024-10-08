import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {comparePasswords} from "../../utils/hash.util";

@Injectable()
export class AuthService {
    constructor(private userService:UserService, private jwtService:JwtService) {}
    
    async validateUser(emailOrUsername: string, password: string) {
        const user = await this.userService.findByEmailOrUsername(emailOrUsername);
        if (user && await comparePasswords(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }
    
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}