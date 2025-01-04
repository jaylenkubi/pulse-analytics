import { Test, TestingModule } from '@nestjs/testing';
import { DataCollectorController } from './data-collector.controller';

describe('DataCollectorController', () => {
  let controller: DataCollectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataCollectorController],
    }).compile();

    controller = module.get<DataCollectorController>(DataCollectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
