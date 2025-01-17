﻿import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {hashPassword} from "../../utils/hash.util";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto) : Promise<UserDocument> {
        const hashedPassword = await hashPassword(createUserDto.password);
        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword
        });
        return createdUser.save();
    }

    async findAll() : Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string) : Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }

    async findByEmailOrUsername(emailOrUsername: string): Promise<UserDocument | null> {
        return this.userModel.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        }).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto) : Promise<UserDocument> {
        if (updateUserDto.password) {
            updateUserDto.password = await hashPassword(updateUserDto.password);
        }
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true}).exec();
    }

    async remove(id: string) : Promise<UserDocument> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}