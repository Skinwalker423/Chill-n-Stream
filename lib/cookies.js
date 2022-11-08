const cookie = require('cookie');

const MAX_AGE = 60 * 60 * 24 * 7 // 1 week

export const setCookieToken = (token, res) => {
    const setCookie = cookie.serialize("token", token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
    res.setHeader('Set-Cookie', setCookie);
    return setCookie;
}

export const getCookies = (req, res) => {
    const cookies = cookie.parse(`token; ${req.headers.cookie}`);
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    return cookies;
}

export const deleteCookieToken = (res) => {
    const setCookie = cookie.serialize("token", '', {
        maxAge: -1,
        path: '/',
    });
    res.setHeader('Set-Cookie', setCookie);
    return setCookie;
}
