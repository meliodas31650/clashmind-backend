// src/translations/translations.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TranslationsService, Lang } from './translations.service';

@Controller('api/translations')
export class TranslationsController {
  constructor(private readonly service: TranslationsService) {}

  @Get()
  async get(@Query('lang') lang: Lang = 'en') {
    const data = await this.service.getTranslations(lang);
    return { lang, data };
  }

  @Post()
  async set(
    @Body()
    body: { lang: Lang; key: string; value: string },
  ) {
    const { lang, key, value } = body;
    return this.service.setTranslation(lang, key, value);
  }
}
