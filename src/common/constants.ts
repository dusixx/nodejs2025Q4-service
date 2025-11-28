export const UUID_VER = 4;
export const DEF_PORT = 4000;

export const ErrorMessage = {
  InvalidOldPassword: 'old password is invalid',
  InvalidUUID: 'invalid UUID',
  InvalidRequestBody: 'request body does not contain required fields',
  NotFound: (s: TemplateStringsArray | string) => `${s[0]} not found`,
  AlreadyExists: (s: TemplateStringsArray | string) => `${s[0]} already exists`,
} as const;
