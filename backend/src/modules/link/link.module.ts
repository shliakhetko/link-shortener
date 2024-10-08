import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {LinkController} from "./link.controller";
import {LinkService} from "./link.service";
import {LinkSchema} from "./schemas/link.schema";
import {RedirectController} from "./redirect.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Link', schema: LinkSchema}])],
    controllers: [LinkController, RedirectController],
    providers: [LinkService]
})
export class LinkModule {}