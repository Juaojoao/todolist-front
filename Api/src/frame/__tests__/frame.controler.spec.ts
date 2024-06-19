import { Test, TestingModule } from '@nestjs/testing';
import { FrameController } from '../frame.controller';
import { FrameService } from '../frame.service';

describe('FrameController', () => {
  let frameController: FrameController;
  const prismaServiceMock = {
    frame: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrameController],
      providers: [
        {
          provide: FrameService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    frameController = module.get<FrameController>(FrameController);
  });

  it('should be defined', () => {
    expect(frameController).toBeDefined();
  });

  describe('createFrame', () => {
    it('should create a frame', async () => {});
  });

  describe('findAll', () => {
    it('should return all frames', async () => {});
  });

  describe('update', () => {
    it('should update a frame', async () => {});
  });

  describe('delete', () => {
    it('should delete a frame', async () => {});
  });
});
