// src/translations/translations.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

export type Lang = 'fr' | 'en';

@Injectable()
export class TranslationsService {
  private basePath = path.join(process.cwd(), 'data');

  private filePath(lang: Lang) {
    return path.join(this.basePath, `translations.${lang}.json`);
  }

  async getTranslations(lang: Lang) {
    try {
      const raw = await fs.readFile(this.filePath(lang), 'utf-8');
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  async setTranslation(lang: Lang, key: string, value: string) {
    const data = await this.getTranslations(lang);
    data[key] = value;

    await fs.mkdir(this.basePath, { recursive: true });
    await fs.writeFile(
      this.filePath(lang),
      JSON.stringify(data, null, 2),
      'utf-8',
    );

    return { lang, key, value };
  }
}
