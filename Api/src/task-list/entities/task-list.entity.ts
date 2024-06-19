import { TaskList as PrismaTaskList } from '@prisma/client';

export class CreateTaskListEntity implements PrismaTaskList {
  id: number;
  name: string;
  cardId: number;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}
