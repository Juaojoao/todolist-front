import { Tasks } from '../../interfaces/todo-list.interface';
import {
  getAuthorizationToken,
  getTokenFromLocalStorage,
} from '../../util/connections/auth';
import { connectionAPI } from './api';

export class TaskListService {
  private api = connectionAPI;
  private token = getTokenFromLocalStorage();

  //TaskList
  async getAllTaskList(userId?: number) {
    if (!this.token || !userId) return;

    try {
      getAuthorizationToken(this.token);
      return (await this.api.get(`tasklist/get/${userId}`)).data;
    } catch (error) {
      console.error('Error getting TaskList', error);
    }
  }

  //Task
  async createTask({ name, taskListId }: Tasks) {
    if (!this.token || name === '' || !taskListId) return;

    try {
      getAuthorizationToken(this.token);
      return await this.api.post('tasklist/task/create', { name, taskListId });
    } catch (error) {
      console.error('Error creating TaskList', error);
    }
  }

  async updateTaskStatus({ id, status }: Tasks) {
    if (!this.token || !id) return;
    try {
      getAuthorizationToken(this.token);
      return await this.api.put(`tasklist/task/updateStatus/${id}`, {
        status,
      });
    } catch (error) {
      console.error('Error updating Task', error);
    }
  }
}
