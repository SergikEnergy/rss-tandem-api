export const signUpSuccessExample = {
    statusText: 'Email отправлен!',
    message: 'Ссылка для подтверждения регистрации отправлена на email, указанный при регистрации.',
};

export const userWithEmailExistError = {
    message: 'Пользователь с таким email уже существует.',
    error: 'Bad Request',
    statusCode: 400,
};

export const userWithLoginExistError = {
    message: 'Пользователь с таким login уже существует.',
    error: 'Bad Request',
    statusCode: 400,
};

export const emailRequired = {
    message: 'Поле email является обязательным!',
    error: 'Bad Request',
    statusCode: 400,
};

export const invalidCredentials = {
    statusCode: 403,
    message: 'Неверные логин или пароль.',
};
