import { Response, CookieOptions } from 'express';

export const sendTokens = (res: Response, accessToken: string, refreshToken: string) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions: CookieOptions = { httpOnly: true, secure: isProduction, sameSite: isProduction ? 'none' : 'lax' };
    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 });
};
