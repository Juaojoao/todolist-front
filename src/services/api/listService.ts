import { List } from '../../interfaces/todo-list.interface';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../../util/connections/auth';
import { connectionAPI } from './api';

export class ListService {
  private api = connectionAPI;
  private token = getTokenFromLocalStorage();

  async getAllList(userId?: number) {
    if (!userId || !this.token) return;
    try {
      getAuthorizationToken(this.token);
      return (await this.api.get<List[]>(`/activitieslist/get/${userId}`)).data;
    } catch (error) {
      console.error('Error getting List', error);
      return null;
    }
  }

  async createList(name: string, frameId: number, order?: number) {
    if (!name || !frameId || !this.token) return;
    try {
      getAuthorizationToken(this.token);
      await this.api.post('/activitieslist/create', { name, frameId, order });
    } catch (error) {
      console.error('Error creating List', error);
    }
  }

  async deleteList(id: number) {
    if (!id || !this.token) return;

    try {
      getAuthorizationToken(this.token);
      await this.api.delete(`/activitieslist/delete/${id}`);
    } catch (error) {
      console.error('Error deleting List', error);
    }
  }

  async updateList(id?: number, name?: string) {
    if (!id || !name || !this.token) return;

    try {
      getAuthorizationToken(this.token);
      await this.api.put(`/activitieslist/update/${id}`, { name });
    } catch (error) {
      console.error('Error updating List', error);
    }
  }

  async orderList(id: number, order: number) {
    if (!id || !order || !this.token) return;

    try {
      getAuthorizationToken(this.token);
      await this.api.put(`/activitieslist/order/${id}`, { order });
    } catch (error) {
      console.error('Error ordering List', error);
    }
  }
}
