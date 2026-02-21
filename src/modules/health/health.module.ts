import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { InMemoryHealthStore } from './store/health-store';
import { HEALTH_STORE } from './constants/health';

@Module({
    controllers: [HealthController],
    providers: [HealthService, { useClass: InMemoryHealthStore, provide: HEALTH_STORE }],
})
export class HealthModule {}
