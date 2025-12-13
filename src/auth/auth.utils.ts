import { UnauthorizedException } from '@nestjs/common';
import { hasOwnKeys } from '../common/utils';

export const getBearerToken = (request: Request): string => {
  if (!hasOwnKeys<{ authorization: string }>(request.headers, 'authorization')) {
    throw new UnauthorizedException();
  }
  const [type, token] = request.headers.authorization.split(' ');
  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedException();
  }
  return token;
};
