import { HttpException, HttpStatus } from '@nestjs/common';

export function createResponse(
  status: 'success' | 'error',
  message: string,
  data: any = null,
  httpStatusCode: HttpStatus = HttpStatus.OK,
) {
  const response = {
    status,
    message,
    data,
  };

  if (status === 'error') {
    throw new HttpException(response, httpStatusCode);
  }

  return {
    ...response,
    httpStatusCode,
  };
}
