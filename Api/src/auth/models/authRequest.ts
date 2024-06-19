import { Request } from 'express';
import { userEntity } from '../../user/entities/user.entity';

export interface AuthRequest extends Request {
  user: userEntity;
}
