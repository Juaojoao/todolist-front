import { IsString } from 'class-validator';

export class UpdateTaskListDto {
  @IsString()
  name: string;
  order?: number;
}
