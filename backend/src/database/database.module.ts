import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {databaseConfig} from "../config/database.config";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configureService: ConfigService) => databaseConfig(configureService),
            inject: [ConfigService],
        })
    ],
    exports: [MongooseModule]
})
export class DatabaseModule {}