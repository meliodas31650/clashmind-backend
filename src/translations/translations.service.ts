import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

export type Lang = 'fr' | 'en';

@Injectable()
export class TranslationsService {
  // Runtime writable (Render: ephemeral but fine)
  private basePath = path.join(process.cwd(), 'data');

  // Shipped with the code (always available after build)
  private seedPath = path.join(__dirname, 'seed');

  private filePath(lang: Lang) {
    return path.join(this.basePath, `translations.${lang}.json`);
  }

  private seedFilePath(lang: Lang) {
    return path.join(this.seedPath, `translations.${lang}.json`);
  }

  private async readJsonOrEmpty(file: string) {
    try {
      const raw = await fs.readFile(file, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  async getTranslations(lang: Lang) {
    // 1) Try runtime file in /data
    const fromData = await this.readJsonOrEmpty(this.filePath(lang));
    if (fromData) return fromData;

    // 2) Fallback to seed shipped with app (dist/translations/seed)
    const fromSeed = await this.readJsonOrEmpty(this.seedFilePath(lang));
    if (fromSeed) return fromSeed;

    // 3) Nothing found
    return {};
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
