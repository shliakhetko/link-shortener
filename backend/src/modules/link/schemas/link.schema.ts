import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {BaseSchema} from "../../../common/schemas/base.schema";

@Schema()
export class LinkDocument extends BaseSchema {
    @Prop({required: false})
    title?: string;
    
    @Prop({required: true})
    link: string;
    
    @Prop({required: true, unique: true})
    shortLink: string;
}

export const LinkSchema = SchemaFactory.createForClass(LinkDocument);