import { Tasks, taskList } from '../../interfaces/todo-list.interface';
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

  async createTaskList({ cardId, name, order }: taskList) {
    if (!this.token || !cardId || name === '') return;

    try {
      getAuthorizationToken(this.token);
      return await this.api.post('tasklist/create', { cardId, name, order });
    } catch (error) {
      console.error('Error creating TaskList', error);
    }
  }

  async deleteTaskList(id: number) {
    if (!this.token || !id) return;

    try {
      getAuthorizationToken(this.token);
      return await this.api.delete(`tasklist/delete/${id}`);
    } catch (error) {
      console.error('Error deleting TaskList', error);
    }
  }

  async updateNameTaskList({ id, name }: taskList) {
    if (!this.token || !id || name === '') return;

    try {
      getAuthorizationToken(this.token);
      const response = await this.api.patch(`tasklist/update/${id}`, { name });
      return response;
    } catch (error) {
      console.error('Error updating TaskList', error);
    }
  }

  //Task
  async createTask({ name, taskListId, order }: Tasks) {
    if (!this.token || name === '' || !taskListId) return;

    try {
      getAuthorizationToken(this.token);
      return await this.api.post('tasklist/task/create', {
        name,
        taskListId,
        order,
      });
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

  async updateTask({ id, name }: Tasks) {
    if (!this.token || !id) return;

    try {
      getAuthorizationToken(this.token);
      return await this.api.patch(`tasklist/task/update/${id}`, { name });
    } catch (error) {
      console.error('Error updating Task', error);
    }
  }

  async deleteTask(id: number) {
    if (!this.token || !id) return;

    try {
      getAuthorizationToken(this.token);
      return await this.api.delete(`tasklist/task/delete/${id}`);
    } catch (error) {
      console.error('Error deleting Task', error);
    }
  }
}
