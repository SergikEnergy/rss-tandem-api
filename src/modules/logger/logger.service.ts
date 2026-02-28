import { Injectable } from '@nestjs/common';
import { CustomLogger } from './winston.config';

@Injectable()
export class LoggerService {
    constructor() {
        this.globalRejectHandler();
    }

    globalRejectHandler() {
        process.on('uncaughtException', (err: Error) => {
            this.error(
                `${JSON.stringify({
                    type: 'UncaughtException',
                    message: err.message,
                    stack: err.stack,
                })}`,
                'uncaught event',
            );
        });

        process.on('unhandledRejection', (reason: unknown) => {
            this.error(
                `${JSON.stringify({
                    type: 'UnhandledRejection',
                    reason:
                        reason instanceof Error
                            ? {
                                  message: reason.message,
                                  stack: reason.stack,
                              }
                            : JSON.stringify(reason),
                })}`,
                'unhandled event',
            );

            process.exit(1);
        });
    }

    log(message: string, context?: string) {
        CustomLogger.info(message, { context });
    }

    error(message: string, trace: string, context?: string) {
        CustomLogger.error(message, { context, trace });
    }

    warn(message: string, context?: string) {
        CustomLogger.warn(message, { context });
    }

    debug(message: string, context?: string) {
        CustomLogger.debug(message, { context });
    }
}
