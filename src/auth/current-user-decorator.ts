import { ExecutionContext, createParamDecorator } from '@nestjs/common';

interface userSchema {
  userId: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return request.user as userSchema;
  },
);
