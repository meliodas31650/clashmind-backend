import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslationsModule } from './translations/translations.module';

@Module({
  imports: [
    TranslationsModule, // 🔹 Module i18n live
  ],
  controllers: [
    ApiController,
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
