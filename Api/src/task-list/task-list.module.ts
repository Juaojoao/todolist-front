import { Module } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';
import { PrismaService } from '../database/prismaService';

@Module({
  controllers: [TaskListController],
  providers: [TaskListService, PrismaService],
})
export class TaskListModule {}
