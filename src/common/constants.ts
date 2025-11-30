export const UUID_VER = 4;
export const DEF_PORT = 4000;

export const ErrorMessage = {
  InvalidUUID: 'invalid UUID',
  InvalidRequestBody: 'request body does not contain required fields',
  NotFound: (s: TemplateStringsArray | string) => `${s[0]} not found`,
} as const;
