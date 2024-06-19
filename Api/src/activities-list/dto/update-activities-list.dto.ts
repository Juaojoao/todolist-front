import { PartialType } from '@nestjs/mapped-types';
import { CreateActivitiesListDto } from './create-activities-list.dto';

export class UpdateActivitiesListDto extends PartialType(
  CreateActivitiesListDto,
) {}
