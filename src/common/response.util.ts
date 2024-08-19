export function createResponse(status: 'success' | 'error', message: string, data: any = null) {
  return {
    status,
    message,
    data,
  };
}
