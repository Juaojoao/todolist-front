import { IsNumber, IsString } from 'class-validator';

export class CreateTaskListDto {
  @IsString()
  name: string;

  @IsNumber()
  cardId: number;
}
