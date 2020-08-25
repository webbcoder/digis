import {IsDateString, IsNotEmpty, IsString, IsEnum} from "class-validator";

import { GenderEnum } from '../enums/gender.enum';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    @ApiProperty()
    @IsDateString()
    readonly DOB: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEnum(GenderEnum)
    readonly gender: string;
}
