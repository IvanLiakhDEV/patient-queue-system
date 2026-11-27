import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../zodSchemas/userSchema.js';
import { UserController } from '../controllers/UserController.js';
const userRouter = Router();

userRouter.post('/register', validateRequest(registerSchema, 'body'), UserController.register);
userRouter.post('/login', validateRequest(loginSchema, 'body'), UserController.login);

export default userRouter;
