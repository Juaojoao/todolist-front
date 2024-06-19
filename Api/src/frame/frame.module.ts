import { Module } from '@nestjs/common';
import { FrameService } from './frame.service';
import { FrameController } from './frame.controller';
import { PrismaService } from '../database/prismaService';

@Module({
  controllers: [FrameController],
  providers: [FrameService, PrismaService],
})
export class FrameModule {}
