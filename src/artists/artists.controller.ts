import { Controller } from '@nestjs/common';

@Controller()
export class ArtistsController {
  constructor() {
    console.log('ArtistsController created');
  }
}
