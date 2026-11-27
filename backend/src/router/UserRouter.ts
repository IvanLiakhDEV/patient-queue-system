import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { registerSchema } from '../zodSchemas/userSchema.js';
import { UserController } from '../controllers/UserController.js';
const userRouter = Router();

userRouter.post('', validateRequest(registerSchema, 'body'), UserController.register);
userRouter.get('', (req, res) => {
    res.status(400);
});

export default userRouter;
