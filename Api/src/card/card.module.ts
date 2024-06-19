import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaService } from '../database/prismaService';

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService],
})
export class CardModule {}
