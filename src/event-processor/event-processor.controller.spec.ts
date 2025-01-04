import { Test, TestingModule } from '@nestjs/testing';
import { EventProcessorController } from './event-processor.controller';

describe('EventProcessorController', () => {
  let controller: EventProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventProcessorController],
    }).compile();

    controller = module.get<EventProcessorController>(EventProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
