import { Injectable } from '@nestjs/common';
import { IHealthStore } from '../interfaces/health-interface';

@Injectable()
export class InMemoryHealthStore implements IHealthStore {
    async checkAlive(): Promise<string> {
        try {
            return new Date().toISOString();
        } catch {
            return 'Server is not available';
        }
    }
}
