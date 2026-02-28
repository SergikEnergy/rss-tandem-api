import * as winston from 'winston';
import 'winston-daily-rotate-file';

import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

import { isProduction } from '../../common/envs';

dotenvConfig({
    path: resolve(process.cwd(), isProduction ? '.env' : '.env.dev'),
});

const { colorize, combine, json, timestamp, printf } = winston.format;

const customFormat = combine(
    timestamp(),
    colorize(),
    printf(({ timestamp, level, stack, message }) => `${timestamp} - [${level}] - ${stack || message}`),
);

const ConsoleLogger = new winston.transports.Console({
    format: customFormat,
});

const JsonErrorLogger = new winston.transports.DailyRotateFile({
    filename: 'logs/server-error%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '40m',
    maxFiles: '5d',
    format: combine(timestamp(), json()),
    level: 'error',
});

const JsonLogger = new winston.transports.DailyRotateFile({
    filename: 'logs/server-info%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '3d',
    format: combine(timestamp(), json()),
});

const transports: winston.transport[] = isProduction ? [ConsoleLogger] : [JsonLogger, JsonErrorLogger];

export const CustomLogger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    level: process.env.LOG_LEVEL || 'info',
    format: json(),
    transports,
    rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })],
});

CustomLogger.info('Logger initialized successfully');
