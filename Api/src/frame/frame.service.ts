import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prismaService';
import { CreateFrameDto } from './dto/create-frame.dto';

@Injectable()
export class FrameService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ userId, name }: CreateFrameDto) {
    if (!userId) {
      return { message: 'User does not exist' };
    }

    const userExists = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    if (!userExists) {
      return { message: 'User does not exist' };
    }
    await this.prisma.frame.create({
      data: { userId, name },
    });

    return 'Frame created successfully';
  }

  async findByOwnerId(userId: number) {
    const user = Number(userId);

    if (!user) {
      return { message: 'User does not exist' };
    }

    return await this.prisma.frame.findMany({
      where: { userId: user },
      orderBy: { order: 'asc' },
    });
  }

  async update(id: number, { name }: CreateFrameDto) {
    const frameId = Number(id);

    if (!frameId || name === '') {
      return { message: 'User or Frame does not exist' };
    }

    const frameExists = await this.prisma.frame.findFirst({
      where: { id: frameId },
    });

    if (!frameExists) {
      return { message: 'User or Frame does not exist' };
    }

    await this.prisma.frame.update({
      where: { id: frameId },
      data: { name },
    });

    return 'Frame updated successfully';
  }

  async delete(id: number) {
    const frameId = Number(id);

    if (!frameId) {
      return { message: 'User or Frame does not exist' };
    }
    const frameExists = await this.prisma.frame.findFirst({
      where: { id: frameId },
    });

    if (!frameExists) {
      return { message: 'User or Frame does not exist' };
    }

    try {
      await this.prisma.$transaction([
        this.prisma.task.deleteMany({
          where: {
            TaskList: { Card: { ActivitiesList: { frameId: frameId } } },
          },
        }),

        this.prisma.taskList.deleteMany({
          where: { Card: { ActivitiesList: { frameId: frameId } } },
        }),

        this.prisma.card.deleteMany({
          where: { ActivitiesList: { frameId: frameId } },
        }),

        this.prisma.activitiesList.deleteMany({
          where: { frameId: frameId },
        }),

        this.prisma.frame.delete({
          where: { id: frameId },
        }),
      ]);
    } catch (error) {
      return { message: 'Frame not deleted' };
    }
  }

  async order(id: number, possition: any) {
    const frameId = Number(id);
    const { order } = possition;

    if (!frameId || !order) {
      return { message: 'Frame does not exist' };
    }

    const frame = await this.prisma.frame.findFirst({
      where: { id: frameId },
    });

    if (!frame) {
      return { message: 'Frame does not exist' };
    }

    await this.prisma.frame.update({
      where: { id: frameId },
      data: { order: order },
    });

    return 'Frame reordered successfully';
  }
}
