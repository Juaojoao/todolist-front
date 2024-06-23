import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskListDto {
  @IsString()
  name: string;

  @IsNumber()
  cardId: number;

  @IsNumber()
  @IsOptional()
  order?: number;
}
