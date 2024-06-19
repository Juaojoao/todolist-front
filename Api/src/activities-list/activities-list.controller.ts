import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { ActivitiesListService } from './activities-list.service';
import { CreateActivitiesListDto } from './dto/create-activities-list.dto';

@Controller('activitieslist')
export class ActivitiesListController {
  constructor(private readonly activitiesListService: ActivitiesListService) {}

  @Post('/create')
  async create(@Body() { name, frameId }: CreateActivitiesListDto) {
    return await this.activitiesListService.create({ name, frameId });
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() { name }: CreateActivitiesListDto,
  ) {
    return await this.activitiesListService.update(id, { name });
  }

  @Get('/get/:userId')
  async getAll(@Param('userId') userId: number) {
    return await this.activitiesListService.getAll(userId);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.activitiesListService.delete(id);
  }

  @Put('/order/:id')
  async order(@Param('id') id: number, @Body() order: number) {
    return await this.activitiesListService.order(id, order);
  }
}
