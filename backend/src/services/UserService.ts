import type { LoginBody, RegisterBody } from './../zodSchemas/userSchema.ts';
import { AppError } from '../utils/error.js';
import User from '../models/User.js';
import { getAccessToken, getRefreshToken } from './TokenService.js';

export const registerNewUser = async (data: RegisterBody) => {
    const checkIfExist = await User.findOne({ email: data.email });
    if (checkIfExist) {
        throw new AppError('Користувач з таким email вже існує', 409);
    }
    const newUser = await User.create(data);
    return newUser;
};
export const loginUser = async (data: LoginBody) => {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) throw new AppError('Користувач з таким email не існує', 404);

    const isPasswordCorrect = await user.comparePassword(data.password);
    if (!isPasswordCorrect) throw new AppError('Невірний пароль', 401);

    const accessToken = getAccessToken(user._id);
    const refreshToken = getRefreshToken(user._id);

    await User.findByIdAndUpdate(user._id, { refreshToken });

    return { user, accessToken, refreshToken };
};
