import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { FrameService } from './frame.service';
import { CreateFrameDto } from './dto/create-frame.dto';

@Controller('frame')
export class FrameController {
  constructor(private readonly frameService: FrameService) {}

  @Post('/create')
  async createFrame(@Body() { userId, name }: CreateFrameDto) {
    return await this.frameService.create({ userId, name });
  }

  @Get('/:userId')
  async findByOwnerId(@Param('userId') userId: number) {
    return await this.frameService.findByOwnerId(userId);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() { name }: CreateFrameDto) {
    return await this.frameService.update(id, { name });
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.frameService.delete(id);
  }

  @Put('/order/:id')
  async order(@Param('id') id: number, @Body() order: number) {
    return await this.frameService.order(id, order);
  }
}
