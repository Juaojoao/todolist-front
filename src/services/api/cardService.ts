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

  async createCard({ activitiesListId, name, description }: Card) {
    if (!this.token || !activitiesListId || name === '') return;

    try {
      getAuthorizationToken(this.token);
      await this.api.post('/card/create', {
        activitiesListId,
        name,
        description,
      });
    } catch (error) {
      console.error('Error creating Card', error);
    }
  }

  async updateCard({ id, name, description }: Card) {
    if (!this.token || name === '' || !id) return;

    try {
      getAuthorizationToken(this.token);
      await this.api.patch(`/card/update/${id}`, { id, name, description });
    } catch (error) {
      console.error('Error updating Card', error);
    }
  }

  async deleteCard(id: number) {
    if (!this.token || !id) return;

    try {
      getAuthorizationToken(this.token);
      await this.api.delete(`/card/delete/${id}`);
    } catch (error) {
      console.error('Error deleting Card', error);
    }
  }
}
