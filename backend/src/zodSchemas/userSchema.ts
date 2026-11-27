import { z } from 'zod';
export const registerSchema = z.object({
    firstName: z.string().min(1, { message: "Ім'я є обов'язковим" }),
    lastName: z.string().min(1, { message: "Прізвище є обов'язковим" }),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({ message: 'Некоректна адреса електронної пошти' })),
    password: z.string().min(8, { message: 'Пароль повинен бути не менше 8 символів' }),
});
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({ message: 'Некоректна адреса електронної пошти' })),
    password: z.string().min(1, { message: "Поле обов'язкове до заповнення" }),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
