import { registerNewUser } from '../services/UserService.js';
import { catchAsyncErrors } from '../utils/catchAsyncErrors.js';

export class UserController {
    static register = catchAsyncErrors(async (req, res) => {
        const user = await registerNewUser(req.body);
        res.status(201).json({ success: true, user });
    });
}
