import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesListController } from '../activities-list.controller';
import { ActivitiesListService } from '../activities-list.service';

describe('ActivitiesListController', () => {
  let controller: ActivitiesListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesListController],
      providers: [ActivitiesListService],
    }).compile();

    controller = module.get<ActivitiesListController>(ActivitiesListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
