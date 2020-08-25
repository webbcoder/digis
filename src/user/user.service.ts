import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import * as mongoose from 'mongoose'
import {InjectModel} from "@nestjs/mongoose";

import {IUser} from "./interfaces/user.interface";
import {CreateUserDto} from "./dto/create-user.dto";
import { client } from './cache/user.cache';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly UserModel: Model<IUser>) {}

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        try {
            const user: IUser = new this.UserModel({...createUserDto, DOB: new Date(createUserDto.DOB)});
            await UserService.setCache(user);
            return await user.save();
        } catch (error) {
            throw error
        }

    }

    async getAllUsers() {
        try {
            return await this.UserModel.find();
        } catch (error) {
            throw error
        }
    }

    async getUserById(id: string): Promise<IUser> {
        try {
            return await this.UserModel.findById(new mongoose.Types.ObjectId(id));
        } catch (error) {
            throw error
        }
    }

    async updateUser(id: string, createUserDto: CreateUserDto) {
        try {
            const user = await this.UserModel.findOneAndUpdate(
                {_id: id},
                {$set: {...createUserDto, DOB: new Date(createUserDto.DOB)}},
                {new: true});
                await UserService.setCache(user);
            return user;
        } catch (error) {
            throw error
        }
    }

    static async setCache(user: IUser){
        await client.setex(user._id.toString(), 3600, JSON.stringify(user));
    }
}
