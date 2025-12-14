export const UUID_VER = '4';
export const DEF_APP_PORT = 4000;
export const DEF_DB_PORT = 5432;
export const DEF_CRYPT_SALT = 10;
export const DEF_ACCESS_TOKEN_EXPIRE_TIME = '1h';
export const DEF_REFRESH_TOKEN_EXPIRE_TIME = '24h';
export const DEF_LOG_LEVEL = 4;
export const DEF_LOG_MAX_SIZE_KB = 50;

export const ErrorMessage = {
  InvalidUUID: 'invalid UUID',
  InvalidRequestBody: 'request body does not contain required fields',
  NotFound: (s: TemplateStringsArray | string) => `${s[0]} not found`,
} as const;
