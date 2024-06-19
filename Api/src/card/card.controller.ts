import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('/create')
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardService.create(createCardDto);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() data: UpdateCardDto) {
    return await this.cardService.update(id, data);
  }

  @Get('/get/:userId')
  async getAll(@Param('userId') userId: number) {
    return await this.cardService.getAll(userId);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.cardService.delete(id);
  }

  @Post('/updateDesc/:id')
  async updateDescription(
    @Param('id') id: number,
    @Body() { description }: CardEntity,
  ) {
    return await this.cardService.updateDescription({ id, description });
  }
}
