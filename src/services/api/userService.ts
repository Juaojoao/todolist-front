import { JwtPayload, jwtDecode } from 'jwt-decode';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../../util/connections/auth';
import { connectionAPI } from './api';
import { User } from '../../interfaces/todo-list.interface';

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
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
    }
  }
}
