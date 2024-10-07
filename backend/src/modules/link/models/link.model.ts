import {BaseModel} from "../../../common/models/base.model";

export class Link extends BaseModel{
    title?: string;
    link: string;
    shortLink: string;
}