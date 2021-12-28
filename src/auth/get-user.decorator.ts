import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  console.log('eren11');
  console.log(req.user);
  return req.user;
});
