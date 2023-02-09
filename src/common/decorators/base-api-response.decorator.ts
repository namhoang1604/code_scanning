import { Type, applyDecorators } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
/**
 * The decorator wrap up response swagger
 */
export const BaseApiResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiResponse({
      schema: {
        properties: {
          statusCode: { type: 'number', example: 200 },
          message: { type: 'string' },
          data: { $ref: getSchemaPath(model) },
        },
      },
    }),
  );
};
