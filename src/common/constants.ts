export const APP_PATHS = Object.freeze({
    HEALTH: 'health',
    USER: 'users',
    AUTH: 'auth',
    SIGN_UP: 'signup',
    LOGIN: 'login',
});

export const SWAGGER_TAGS = Object.freeze({
    HEALTH: 'health',
    USER: 'users',
    AUTH: 'auth',
    SIGN_UP: 'signup',
    LOGIN: 'login',
});

export enum Environment {
    PROD = 'production',
    DEV = 'development',
}

export const MIN_PASS_LENGTH = 8;
export const MAX_PASS_LENGTH = 30;

export const MIN_LOGIN_LENGTH = 5;
export const MAX_LOGIN_LENGTH = 30;
