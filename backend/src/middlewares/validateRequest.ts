import { safeParse, z } from 'zod';
import { Request, Response, NextFunction } from 'express';
const SOURCE = ['body', 'query', 'params'] as const;

export const validateRequest =
    (schema: z.ZodType, source: (typeof SOURCE)[number]) => (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) {
            res.status(400).json({
                message: 'Помилка валідації',
                errors: result.error.issues.map(issue => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            });
            return;
        }
        if (source === 'body') {
            req.body = result.data; 
        } else {
            res.locals[source] = result.data;
        }
        next();
    };
