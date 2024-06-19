import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task/create-task.dto';
import { PrismaService } from '../database/prismaService';
import { UpdateTaskDto } from './dto/task/update-task.dto';
import { CreateTaskListDto } from './dto/task-list/create-task-list.dto';

@Injectable()
export class TaskListService {
  constructor(private readonly prisma: PrismaService) {}

  // Inicio Task List
  async createTaskList(data: CreateTaskListDto) {
    const cardId = Number(data.cardId);

    const cardExists = await this.prisma.card.findFirst({
      where: { id: cardId },
    });

    if (!cardExists) {
      return {
        messege: 'Card does not exist',
      };
    }

    await this.prisma.taskList.create({ data: data });

    return 'Task List created Successfuly';
  }

  async updateTaskList(id: number, name: string) {
    const taskListId = Number(id);

    console.log(name);

    if (!taskListId) {
      return {
        messege: 'Card or Task List not found',
      };
    }

    const taskListExists = await this.prisma.taskList.findFirst({
      where: { id: taskListId },
    });

    if (!taskListExists) {
      return {
        messege: 'Task List not found',
      };
    }

    await this.prisma.taskList.update({
      where: { id: taskListId },
      data: { name },
    });

    return 'Task List updated Successfuly';
  }

  async getAllTaskList(userId: number) {
    const userIdNumber = Number(userId);

    if (!userIdNumber) {
      return {
        messege: 'User does not exist',
      };
    }

    const userExists = await this.prisma.user.findFirst({
      where: { id: userIdNumber },
    });

    if (!userExists) {
      return { message: 'User does not exist' };
    }

    return await this.prisma.taskList.findMany({
      where: {
        Card: {
          ActivitiesList: { Frame: { userId: { equals: userIdNumber } } },
        },
      },
      include: { tasks: true },
    });
  }

  async deleteTaskList(id: number) {
    const taskListId = Number(id);

    if (!taskListId) {
      return {
        messege: 'Card or Task List not found',
      };
    }

    const taskListExists = await this.prisma.taskList.findFirst({
      where: { id: taskListId },
    });

    if (!taskListExists) {
      return {
        messege: 'task List not found',
      };
    }

    await this.prisma.$transaction([
      this.prisma.task.deleteMany({
        where: { taskListId: taskListId },
      }),
      this.prisma.taskList.delete({
        where: { id: taskListId },
      }),
    ]);

    return 'Task List deleted Successfuly';
  }

  // Fim Task List

  // Inicio Task
  async createTask(data: CreateTaskDto) {
    const taskListId = Number(data.taskListId);

    const taskListExists = await this.prisma.taskList.findFirst({
      where: { id: taskListId },
    });

    if (!taskListExists) {
      return {
        messege: 'task list does not exist',
      };
    }

    await this.prisma.task.create({ data: data });

    return 'Task created Successfuly';
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    const taskId = Number(id);

    if (!taskId) {
      return {
        messege: 'Task not found',
      };
    }

    const taskExists = await this.prisma.task.findFirst({
      where: { id: taskId },
    });

    if (!taskExists) {
      return {
        messege: 'task not found',
      };
    }

    await this.prisma.task.update({
      where: { id: taskId },
      data: data,
    });

    return 'Task updated Successfuly';
  }

  async updateStatusTask(id: number, statusTask: any) {
    const taskId = Number(id);

    const { status } = statusTask;

    if (!taskId) {
      return {
        messege: 'Task not found',
      };
    }

    const taskExists = await this.prisma.task.findFirst({
      where: { id: taskId },
    });

    if (!taskExists) {
      return {
        messege: 'task not found',
      };
    }

    await this.prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return 'Task status updated Successfuly';
  }

  async getAllTasks() {
    return await this.prisma.task.findMany();
  }

  async deleteTask(id: number) {
    const taskId = Number(id);

    if (!taskId) {
      return {
        messege: 'Task or task List not found',
      };
    }

    const taskExists = await this.prisma.task.findFirst({
      where: { id: taskId },
    });

    if (!taskExists) {
      return {
        messege: 'Task or task List not found',
      };
    }

    await this.prisma.task.delete({
      where: { id: taskId },
    });

    return 'Task deleted Successfuly';
  }
  // Fim task
}
