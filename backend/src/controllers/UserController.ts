import { loginUser, registerNewUser } from '../services/UserService.js';
import { catchAsyncErrors } from '../utils/catchAsyncErrors.js';
import { sendTokens } from '../utils/tokens.js';

export class UserController {
    static register = catchAsyncErrors(async (req, res) => {
        const user = await registerNewUser(req.body);
        res.status(201).json({ success: true, user });
    });
    static login = catchAsyncErrors(async (req, res, next) => {
        const { user, accessToken, refreshToken } = await loginUser(req.body);
        sendTokens(res, accessToken, refreshToken);
        res.status(200).json({
            success: true,
            message: 'Авторизація успішна',
            data: user,
        });
    });
}
