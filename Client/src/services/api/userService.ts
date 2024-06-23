import { JwtPayload, jwtDecode } from 'jwt-decode';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../../util/connections/auth';
import { connectionAPI } from './api';
import { User } from '../../interfaces/todo-list.interface';
import { AxiosError } from 'axios';

export class UserService {
  private api = connectionAPI;
  private token = getTokenFromLocalStorage();

  async getInfoUser(): Promise<User | null> {
    if (!this.token) return null;
    try {
      getAuthorizationToken(this.token);
      const decodedToken = jwtDecode<JwtPayload>(this.token);
      const userId = Number(decodedToken.sub);
      return (await this.api.get<User>(`user/${userId}`)).data;
    } catch (error: AxiosError | any) {
      console.error('Error getting user info:', error);
      if (error.response.status === 401) localStorage.removeItem('token');
      return null;
    }
  }

  async createUser({ email, name, password }: User) {
    if (!email || !name || !password) return;
    try {
      return await this.api.post('user/create', { email, name, password });
    } catch (error: AxiosError | any) {
      return error.response;
    }
  }
}
