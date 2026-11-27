import type { RegisterBody } from './../zodSchemas/userSchema.ts';
import { AppError } from '../utils/error.js';
import User from '../models/User.js';

export const registerNewUser = async (data: RegisterBody) => {
    const checkIfExist = await User.findOne({ email: data.email });
    if (checkIfExist) {
        throw new AppError('Користувач з таким email вже існує', 409);
    }
    const newUser = await User.create(data);
    return newUser;
};
