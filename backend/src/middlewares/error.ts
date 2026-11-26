import { ErrorRequestHandler } from 'express';
import { AppError } from '../utils/error.js';

interface CustomError extends Error {
    statusCode?: number;
    errors?: Record<string, { message: string }>;
}

export const errorMiddleware: ErrorRequestHandler = (err: CustomError, req, res, next) => {
    if (err.name === 'ValidationError' && err.errors) {
        const message = Object.values(err.errors)
            .map(value => value.message)
            .join(', ');
        err = new AppError(message, 400);
    }
    const statusCode = err.statusCode || 500;
    const message = err.message;

    res.status(statusCode).json({ success: false, message });
};
