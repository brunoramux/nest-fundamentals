import type { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(`Request...`, new Date().toLocaleDateString('pt-BR'));
    next();
  }
}
