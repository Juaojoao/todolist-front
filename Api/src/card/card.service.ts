import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../database/prismaService';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCardDto) {
    const activityListId = Number(data.activitiesListId);

    if (!activityListId) {
      return { message: 'Activity List does not exist' };
    }

    const activityListExists = await this.prisma.activitiesList.findFirst({
      where: { id: activityListId },
    });

    if (!activityListExists) {
      return { message: 'Activity List does not exist' };
    }

    await this.prisma.card.create({ data: data });

    return 'Card created successfully';
  }

  async update(id: number, data: UpdateCardDto) {
    const cardId = Number(id);

    if (!cardId) {
      return { message: 'Activity List does not exist' };
    }
    const cardExists = await this.prisma.card.findFirst({
      where: { id: cardId },
    });

    if (!cardExists) {
      return { message: 'Activity List does not exist' };
    }

    await this.prisma.card.update({
      where: { id: cardId },
      data: data,
    });

    return 'Card updated successfully';
  }

  async getAll(userId: number) {
    const userIdNumber = Number(userId);

    if (!userIdNumber) {
      return { message: 'User does not exist' };
    }

    const userExists = await this.prisma.user.findFirst({
      where: { id: userIdNumber },
    });

    if (!userExists) {
      return { message: 'User does not exist' };
    }

    return await this.prisma.card.findMany({
      where: {
        ActivitiesList: { Frame: { userId: { equals: userIdNumber } } },
      },
      include: {
        tasklist: {
          include: { tasks: true },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async delete(id: number) {
    const cardId = Number(id);

    if (!cardId) {
      return { message: 'Activity List does not exist' };
    }

    const cardExists = await this.prisma.card.findFirst({
      where: { id: cardId },
    });

    if (!cardExists) {
      return { message: 'Activity List does not exist' };
    }

    try {
      await this.prisma.$transaction([
        this.prisma.task.deleteMany({
          where: { TaskList: { cardId: cardId } },
        }),
        this.prisma.taskList.deleteMany({ where: { cardId: cardId } }),
        this.prisma.card.delete({ where: { id: cardId } }),
      ]);
      return 'Card deleted successfully';
    } catch (error) {
      return { message: 'Error deleting card' };
    }
  }

  async updateDescription({ id, description }: CardEntity) {
    const cardId = Number(id);

    if (!cardId) {
      return { message: 'Activity List does not exist' };
    }

    const cardExists = await this.prisma.card.findFirst({
      where: { id: cardId },
    });

    if (!cardExists) {
      return { message: 'Activity List does not exist' };
    }

    await this.prisma.card.update({
      where: { id: cardId },
      data: { description },
    });

    return 'Card description updated successfully';
  }
}
