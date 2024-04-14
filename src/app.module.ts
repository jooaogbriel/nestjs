import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers';
import { SongsModule } from './songs/songs.module';

const devConfig = { port: 3000 };
const proConfig = { port: 400 };

// Decorator TypeScript que define a classe AppModule como um módulo
@Module({
  imports: [SongsModule],
  controllers: [AppController], // Define o controlador AppController como parte do módulo
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ], // Define o provedor AppService como parte do módulo
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
