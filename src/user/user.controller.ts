import {Body, Controller, Get, Param, Post, Put, Res, ValidationPipe} from '@nestjs/common';
import { Response } from 'express';

import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./interfaces/user.interface";
import {ApiParam, ApiTags} from "@nestjs/swagger";
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/create')
    async createUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
        @Res() res:Response): Promise<void> {
        try {
            const user: IUser = await this.userService.createUser(createUserDto);
            res.send(user);
        } catch (error) {
            res.send(error.message)
        }
    }
    @Get('/all')
    async getUsers( @Res() res:Response): Promise<void> {
        try {
            const users: IUser[] = await this.userService.getAllUsers();
            res.send(users);
        } catch (error) {
            res.send(error.message)
        }
    }
    @ApiParam({name: 'id', type: 'string', required: true})
    @Get('/:id')
    async getUser(@Param() params, @Res() res:Response): Promise<void> {
        try {
            const user: IUser = await this.userService.getUserById(params.id);
            res.send(user);
        } catch (error) {
            res.send(error.message);
        }
    }

    @ApiParam({name: 'id', type: 'string', required: true})
    @Put('/:id')
    async updateUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
        @Param() params,
        @Res() res:Response): Promise<void>{
        try {
            const user: IUser = await this.userService.updateUser(params.id, createUserDto);
            res.send(user);
        } catch (error) {
            res.send(error.message);
        }
    }

}
