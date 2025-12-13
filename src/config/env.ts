import { config } from 'dotenv';
import ms from 'ms';
import {
  DEF_ACCESS_TOKEN_EXPIRE_TIME,
  DEF_APP_PORT,
  DEF_CRYPT_SALT,
  DEF_REFRESH_TOKEN_EXPIRE_TIME,
} from '../common/constants';

config({ quiet: true });

export const envVar = {
  PORT: Number(process.env.PORT) || DEF_APP_PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY,

  TOKEN_EXPIRE_TIME: (process.env.TOKEN_EXPIRE_TIME ||
    DEF_ACCESS_TOKEN_EXPIRE_TIME) as ms.StringValue,

  TOKEN_REFRESH_EXPIRE_TIME: (process.env.TOKEN_REFRESH_EXPIRE_TIME ||
    DEF_REFRESH_TOKEN_EXPIRE_TIME) as ms.StringValue,

  CRYPT_SALT: Number(process.env.CRYPT_SALT) || DEF_CRYPT_SALT,
} as const;
