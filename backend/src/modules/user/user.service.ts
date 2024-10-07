import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto) : Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll() : Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string) : Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto) : Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true}).exec();
    }

    async remove(id: string) : Promise<UserDocument> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}