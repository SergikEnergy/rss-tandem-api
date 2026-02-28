export enum ErrorMessage {
    INVALID_CREDENTIALS = 'Неверные логин или пароль.',
    USER_NOT_FOUND = 'Пользователь не найден.',
    USER_EXIST_LOGIN = 'Пользователь с таким login уже существует.',
    USER_EXIST_EMAIL = 'Пользователь с таким email уже существует.',
    PASSWORD_NOT_MATCH = 'Пароли не совпадают.',
    HASH_PASSWORD_ERROR = 'Ошибка при кодировании пароля. Повторите запрос позже.',
    PASSWORD_REGEXP = 'Пароль не менее 8 символов, с заглавной буквой и цифрой.',
    ERROR_CREATE_JWT_TOKEN = 'Ошибка создания JWT токена',
    INCORRECT_PASSWORD = 'Пароль указан неправильно.',
    UNAUTH_MESSAGE = 'Для осуществления данного запроса необходима авторизация.',
}
