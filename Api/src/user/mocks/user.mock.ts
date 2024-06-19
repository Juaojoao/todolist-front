import { userEntity } from '../entities/user.entity';

export const userMock: userEntity = {
  id: 1,
  name: 'João Vitor',
  email: 'joaovitor@gmail.com',
  password: 'Joaovitor123@',
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};
