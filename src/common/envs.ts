import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
import { Environment } from './constants';

/**
 * Важно! Если из этого файла нужно делать импорт какой-либо env переменной - надо обязательно в том же файле, где используем переменную делать такой же dotenvConfig - иначе будет undefined
 * это не касается переменной isProduction - для нее енв сетается при старте команд
 * start:prod или start:dev через либу cross-env
 */

dotenvConfig({
    path: resolve(process.cwd(), process.env.NODE_ENV === Environment.PROD ? '.env' : '.env.dev'),
});

const CURR_ENV = process.env.NODE_ENV ?? Environment.PROD;
export const isProduction = CURR_ENV === Environment.PROD;
