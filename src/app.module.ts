import {
  Module,
  type MiddlewareConsumer,
  type NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

const dev = { port: 3000, host: 'localhost' };
const prod = { port: 80, host: 'bb.com.br' };

@Module({
  imports: [
    // Modulo responsavel por controlar as variaveis ambiente, injetando nos modulos do Nest
    // isGlobal = true faz com que o Modulo fique disponivel sem necessidade de instanciar
    // Configuration contem o objeto que coleta as variaveis ambiente do process.env
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      load: [configuration],
    }),
    // Utiliza variavel de configuracao para obter dados da conexao com o banco de dados
    // Necessario para usar ConfigModule e ConfigService e assim acessar as variaveis de ambiente dentro de um modulo Nest
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? dev : prod;
      },
    },
  ],
  exports: ['CONFIG'],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('dbName', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
