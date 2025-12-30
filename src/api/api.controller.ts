import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get('/')
  root() {
    return 'Hello World!';
  }

  @Get('/health')
  health() {
    return { ok: true, service: 'clashmind-backend', ts: Date.now() };
  }
}
