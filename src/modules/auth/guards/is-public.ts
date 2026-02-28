import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../constants/auth';

export const IsPublic = () => SetMetadata(PUBLIC_KEY, true);
