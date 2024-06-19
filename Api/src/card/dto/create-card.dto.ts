import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CardEntity } from '../entities/card.entity';

export class CreateCardDto extends CardEntity {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  activitiesListId: number;

  @IsOptional()
  @IsNumber()
  order?: number;
}
