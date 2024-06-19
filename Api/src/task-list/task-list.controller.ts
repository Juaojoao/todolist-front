import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskDto } from './dto/task/create-task.dto';
import { CreateTaskListDto } from './dto/task-list/create-task-list.dto';
import { UpdateTaskListDto } from './dto/task-list/update-task-list.dto';

@Controller('tasklist')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  // Inicio TaskList
  @Post('/create')
  async create(@Body() data: CreateTaskListDto) {
    return await this.taskListService.createTaskList(data);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() { name }: UpdateTaskListDto) {
    return await this.taskListService.updateTaskList(id, name);
  }

  @Get('/get/:userId')
  async getAll(@Param('userId') userId: number) {
    return await this.taskListService.getAllTaskList(userId);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.taskListService.deleteTaskList(id);
  }
  // Fim TaskList

  // Inicio Task
  @Post('/task/create')
  async createTask(@Body() data: CreateTaskDto) {
    return await this.taskListService.createTask(data);
  }

  @Patch('/task/update/:id')
  async updateTask(@Param('id') id: number, @Body() data: CreateTaskDto) {
    return await this.taskListService.updateTask(id, data);
  }

  @Get('/task/get')
  async getAllTasks() {
    return await this.taskListService.getAllTasks();
  }

  @Delete('/task/delete/:id')
  async deleteTaskById(@Param('id') id: number) {
    return await this.taskListService.deleteTask(id);
  }

  @Put('/task/updateStatus/:id')
  async updateStatus(@Param('id') id: number, @Body() status: boolean) {
    return await this.taskListService.updateStatusTask(id, status);
  }
  // Fim Task
}
