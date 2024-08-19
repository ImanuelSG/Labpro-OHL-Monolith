import { Injectable, ValidationPipe, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class LoggingValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const result = await super.transform(value, metadata);

      return result;
    } catch (error) {
      // Log the validation errors
      if (error instanceof BadRequestException) {
        console.log('Validation error:', error.getResponse());
      }

      throw error;
    }
  }
}
