import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsNumber()
  @IsOptional()
  taskListId: number;
}
