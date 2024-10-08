import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {LinkDocument} from "./schemas/link.schema";
import {CreateLinkDto} from "./dto/create-link.dto";
import {UpdateLinkDto} from "./dto/update-link.dto";
import {nanoid} from "nanoid";

@Injectable()
export class LinkService {
    constructor(@InjectModel('Link') private linkModel: Model<LinkDocument>) {}

    async create(createLinkDto: CreateLinkDto) : Promise<LinkDocument> {

        let shortLink: string, linkExists: boolean;
        do {
            shortLink = nanoid(4);
            linkExists = !!(await this.linkModel.findOne({ shortLink }).exec());
        }
        while (linkExists)

        const createdLink = new this.linkModel({...createLinkDto, shortLink});
        return createdLink.save();
    }

    async findAll() : Promise<LinkDocument[]> {
        return this.linkModel.find().exec();
    }

    async findOne(id: string) : Promise<LinkDocument> {
        return this.linkModel.findById(id).exec();
    }

    async findLinkByShort(shortLink: string): Promise<LinkDocument | null> {
        return this.linkModel.findOne({ shortLink }).exec();
    }
    async update(id: string, updateLinkDto: UpdateLinkDto) : Promise<LinkDocument> {
        return this.linkModel.findByIdAndUpdate(id, updateLinkDto, {new: true}).exec();
    }

    async remove(id: string) : Promise<LinkDocument> {
        return this.linkModel.findByIdAndDelete(id).exec();
    }
}