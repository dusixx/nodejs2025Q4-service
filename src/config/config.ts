import ms from 'ms';
import {
  DEF_ACCESS_TOKEN_EXPIRE_TIME,
  DEF_APP_PORT,
  DEF_REFRESH_TOKEN_EXPIRE_TIME,
} from '../common/constants';
import { DEF_CRYPT_SALT } from './../common/constants';

export type EnvironmentVariables = {
  PORT: number;
  JWT_SECRET_KEY: string;
  JWT_SECRET_REFRESH_KEY: string;
  TOKEN_EXPIRE_TIME: string;
  TOKEN_REFRESH_EXPIRE_TIME: string;
  CRYPT_SALT: number;
};

export default (): EnvironmentVariables => ({
  PORT: Number(process.env.PORT) || DEF_APP_PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY,

  TOKEN_EXPIRE_TIME: (process.env.TOKEN_EXPIRE_TIME ||
    DEF_ACCESS_TOKEN_EXPIRE_TIME) as ms.StringValue,

  TOKEN_REFRESH_EXPIRE_TIME: (process.env.TOKEN_REFRESH_EXPIRE_TIME ||
    DEF_REFRESH_TOKEN_EXPIRE_TIME) as ms.StringValue,

  CRYPT_SALT: Number(process.env.CRYPT_SALT) || DEF_CRYPT_SALT,
});
