import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./database/database.module";
import {LinkModule} from "./modules/link/link.module";

@Module({
  imports: [
      ConfigModule.forRoot({
            isGlobal: true,
      }),
      DatabaseModule,
      LinkModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
