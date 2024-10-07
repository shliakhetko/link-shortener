﻿import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {BaseSchema} from "../../../common/schemas/base.schema";

@Schema()
export class UserDocument extends BaseSchema {
    @Prop({required: true, unique: true})
    username: string;
    
    @Prop({required: true, unique: true})
    email: string;
    
    @Prop({required: true})
    password: string;
    
    @Prop({default: []})
    links: string[];
}
export const UserSchema = SchemaFactory.createForClass(UserDocument);