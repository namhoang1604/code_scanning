import { Controller, Get } from '@nestjs/common';

/**
 * App controller
 */
@Controller()
export class AppController {
  /**
   * The health check function
   *
   * @returns The text
   */
  @Get()
  healthCheck(): string {
    return 'Success';
  }
}
