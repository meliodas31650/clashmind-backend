// src/translations/translations.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { TranslationsService, Lang } from './translations.service';

@Controller('api/translations')
export class TranslationsController {
  constructor(private readonly service: TranslationsService) {}

  @Get('/_debug')
  debug() {
    const here = __dirname;
    const seedDir = path.join(__dirname, 'seed');
    const exists = fs.existsSync(seedDir);
    const files = exists ? fs.readdirSync(seedDir) : [];
    return { here, seedDir, exists, files };
  }


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
