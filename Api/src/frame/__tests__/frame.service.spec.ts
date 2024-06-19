import { Test, TestingModule } from '@nestjs/testing';
import { FrameService } from '../frame.service';
import { PrismaService } from '../../database/prismaService';
import { frameMock } from '../__mocks__/frame.mock';

describe('FrameService', () => {
  let service: FrameService;
  let prismaServiceMock: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    prismaServiceMock = {
      frame: {
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn().mockResolvedValue([frameMock]),
        findFirst: jest.fn().mockResolvedValue(frameMock.id),
        delete: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FrameService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<FrameService>(FrameService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return all frames', async () => {
      const result = await service.findAll();

      expect(result).toEqual([frameMock]);
      expect(prismaServiceMock.frame.findMany).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.frame.findMany).toHaveBeenCalledWith();
    });

    it('should thorw an exception', async () => {
      jest
        .spyOn(prismaServiceMock.frame, 'findMany')
        .mockRejectedValue(new Error());

      expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('Create', () => {
    it('should a message successfuly if frame is created', async () => {
      const result = await service.create(frameMock);

      expect(result).toEqual('Frame created successfully');
    });

    it('should thorw an exception', async () => {
      jest
        .spyOn(prismaServiceMock.frame, 'create')
        .mockRejectedValue(new Error());

      expect(service.create(frameMock)).rejects.toThrow();
    });
  });

  describe('Update', () => {
    it('should a message successfuly if frame is updated', async () => {
      const result = await service.update(frameMock.id, frameMock);

      expect(result).toEqual('Frame updated successfully');
      expect(prismaServiceMock.frame.update).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.frame.update).toHaveBeenCalledWith({
        where: { id: frameMock.id },
        data: {
          name: frameMock.name,
          userId: frameMock.userId,
        },
      });
    });

    it('should a message if Frame or User does not exist', async () => {
      const frameErro = {
        id: 10,
        name: 'Teste',
        userId: 10,
      };

      try {
        await service.update(frameErro.id, frameErro);
      } catch (error) {
        expect(error).toEqual({ message: 'User or Frame does not exist' });
      }

      expect(prismaServiceMock.frame.update).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.frame.update).toHaveBeenCalledWith({
        where: { id: frameErro.id },
        data: {
          name: frameErro.name,
          userId: frameErro.userId,
        },
      });
    });

    it('should thorw an exception', async () => {
      jest
        .spyOn(prismaServiceMock.frame, 'update')
        .mockRejectedValue(new Error());

      expect(service.update(frameMock.id, frameMock)).rejects.toThrow();
    });
  });

  describe('Delete', () => {
    it('should a message successfuly if frame is deleted', async () => {
      const result = await service.delete(frameMock.id, frameMock.userId);

      expect(result).toEqual('Frame deleted successfully');
      expect(prismaServiceMock.frame.delete).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.frame.delete).toHaveBeenCalledWith({
        where: { id: frameMock.id },
      });
    });

    it('should a message if Frame or User does not exist', async () => {
      const frameErro = {
        id: 10,
        userId: 10,
      };

      try {
        await service.delete(frameErro.id, frameErro.userId);
      } catch (error) {
        expect(error).toEqual({ message: 'User or Frame does not exist' });
      }

      expect(prismaServiceMock.frame.delete).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.frame.delete).toHaveBeenCalledWith({
        where: { id: frameErro.id },
      });
    });

    it('should thorw an exception', async () => {
      jest
        .spyOn(prismaServiceMock.frame, 'delete')
        .mockRejectedValue(new Error());

      expect(service.delete(frameMock.id, frameMock.userId)).rejects.toThrow();
    });
  });
});
