import {IsDateString, IsNotEmpty, IsString, IsEnum} from "class-validator";

import { GenderEnum } from '../enums/gender.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;
    @IsDateString()
    readonly DOB: string;
    @IsNotEmpty()
    @IsString()
    @IsEnum(GenderEnum)
    readonly gender: string;
}
