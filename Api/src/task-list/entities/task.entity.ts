import { Task as PrismaTask } from '@prisma/client';

export class CreateTaskEntity implements PrismaTask {
  id: number;
  name: string;
  status: boolean;
  taskListId: number;
  order: number;
}
