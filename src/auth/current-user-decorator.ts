import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { PayloadType } from './types';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return request.user as PayloadType;
  },
);
