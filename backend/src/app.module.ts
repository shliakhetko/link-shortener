import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import {LinkModule} from "./modules/link/link.module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";

@Module({
  imports: [
      ConfigModule.forRoot({
            isGlobal: true,
      }),
      DatabaseModule,
      LinkModule,
      UserModule,
      AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
