/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  // eslint-disable-next-line @typescript-eslint/require-await
  protected async getTracker(req: Request): Promise<string> {
    const user = (req as Request & { user?: User }).user;
    const userId = user?.id;
    return `user-${userId}`;
  }

  protected getRequestResponse(context: ExecutionContext) {
    const http = context.switchToHttp();

    return {
      req: http.getRequest<Request>(),
      res: http.getResponse(),
    };
  }
}
