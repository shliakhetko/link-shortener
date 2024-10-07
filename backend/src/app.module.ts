import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import {LinkModule} from "./modules/link/link.module";
import {UserModule} from "./modules/user/user.module";

@Module({
  imports: [
      ConfigModule.forRoot({
            isGlobal: true,
      }),
      DatabaseModule,
      LinkModule,
      UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
