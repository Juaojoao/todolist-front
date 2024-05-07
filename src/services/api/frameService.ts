import { Quadro } from '../../interfaces/todo-list.interface';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../../util/connections/auth';
import { connectionAPI } from './api';

export class FrameService {
  private api = connectionAPI;
  private token = getTokenFromLocalStorage();

  async createFrame(userId?: number, name?: string) {
    if (!userId || !name || !this.token) return;
    const UserId = Number(userId);
    try {
      getAuthorizationToken(this.token);
      await this.api.post('frame/create', { userId: UserId, name: name });
    } catch (error) {
      console.error('Error creating Frame', error);
    }
  }

  async getAllFrames(userId?: number) {
    if (!userId || !this.token) return;
    try {
      getAuthorizationToken(this.token);
      return (await this.api.get<Quadro[]>(`/frame/${userId}`)).data;
    } catch (error) {
      console.error('Error getting Frame', error);
      return null;
    }
  }

  async updateInfoFrame(frameId: number, name: string) {
    if (!frameId || name === '' || !this.token) return;
    try {
      getAuthorizationToken(this.token);
      return await this.api.patch<Quadro>(`/frame/${frameId}`, { name });
    } catch (error) {
      console.error('Error updating Frame', error);
      return null;
    }
  }

  async deleteFrame(frameId: number) {
    if (!frameId || !this.token) return;
    try {
      getAuthorizationToken(this.token);
      await this.api.delete(`/frame/delete/${frameId}`);
    } catch (error) {
      console.error('Error deleting Frame', error);
    }
  }
}
