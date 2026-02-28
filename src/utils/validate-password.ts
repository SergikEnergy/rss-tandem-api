import { compare, hash } from 'bcrypt';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
import { isProduction } from '../common/envs';

dotenvConfig({
    path: resolve(process.cwd(), isProduction ? '.env' : '.env.dev'),
});

export const hashString = async (password: string) => {
    const salt = Number(process.env.PASSWORD_SALT ?? '10');

    return await hash(password, salt);
};

export const compareStrings = async (rawString: string, hash: string) => {
    try {
        return await compare(rawString, hash);
    } catch {
        return false;
    }
};
