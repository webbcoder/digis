import {Document} from "mongoose";

export interface IUser extends Document{
    readonly fullName: string;
    readonly DOB: Date;
    readonly gender: string;
}
