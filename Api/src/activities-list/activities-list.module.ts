import { Module } from '@nestjs/common';
import { ActivitiesListService } from './activities-list.service';
import { ActivitiesListController } from './activities-list.controller';
import { PrismaService } from '../database/prismaService';

@Module({
  controllers: [ActivitiesListController],
  providers: [ActivitiesListService, PrismaService],
})
export class ActivitiesListModule {}
