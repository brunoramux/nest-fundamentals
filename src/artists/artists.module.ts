import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  // NECESSARIO EXPORTAR UM SERVICE QUANDO ELE FOR UTILIZADO EM OUTRO MODULO
  // NAO ESQUECA DE IMPORTAR ESTE MODULO DENTRO DO OUTRO MODULO ONDE DESEJA USAR O SERVICE
  exports: [ArtistsService],
})
export class ArtistsModule {}
