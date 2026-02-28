import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';
import { APP_PATHS, SWAGGER_TAGS } from '../../common/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/guards/is-public';

@ApiTags(SWAGGER_TAGS.HEALTH)
@Controller(APP_PATHS.HEALTH)
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    @IsPublic()
    @ApiOperation({ summary: 'Get current date in string format' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'return current date',
        example: '2025-01-22T06:00:57.327Z',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Server is unreachable',
    })
    async health() {
        return this.healthService.checkAlive();
    }
}
