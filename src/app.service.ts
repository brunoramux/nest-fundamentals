import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('CONFIG')
    private config: { port: number; host: string },
  ) {
    console.log(config.port);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
