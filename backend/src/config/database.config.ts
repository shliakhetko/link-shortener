import * as process from "node:process";
import {ConfigService} from "@nestjs/config";

export const databaseConfig = (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI')
});