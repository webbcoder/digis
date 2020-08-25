import * as mongoose from 'mongoose';
import {GenderEnum} from "../enums/gender.enum";

export const UserSchema = new mongoose.Schema({
    fullName: {type: String, required: true, default: 'Guest'},
    DOB: {type: Date, required: true, default: null},
    gender:{type: String, required: true, enum: Object.values(GenderEnum)}
});

