import { Card } from '../../interfaces/todo-list.interface';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../../util/connections/auth';
import { connectionAPI } from './api';

export class CardService {
  private api = connectionAPI;
  private token = getTokenFromLocalStorage();

  async getAllCard(userId?: number) {
    if (!this.token) return;
    try {
      getAuthorizationToken(this.token);
      return (await this.api.get<Card[]>(`/card/get/${userId}`)).data;
    } catch (error) {
      console.error('Error getting Card', error);
      return null;
    }
  }
}
