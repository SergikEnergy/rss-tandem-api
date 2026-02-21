import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import type { IHealthService, IHealthStore } from './interfaces/health-interface';
import { HEALTH_STORE } from './constants/health';

@Injectable()
export class HealthService implements IHealthService {
    constructor(@Inject(HEALTH_STORE) private readonly store: IHealthStore) {}

    async checkAlive(): Promise<string> {
        try {
            return await this.store.checkAlive();
        } catch (error) {
            throw new InternalServerErrorException(`Something went wrong! ${JSON.stringify(error)}`);
        }
    }
}
