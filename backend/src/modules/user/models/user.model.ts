﻿import {BaseModel} from "../../../common/models/base.model";

export class User extends BaseModel{
    username: string;
    email: string;
    password: string;
    links: string[];
}