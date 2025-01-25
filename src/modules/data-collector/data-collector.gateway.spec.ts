import { Test, TestingModule } from '@nestjs/testing';
import { DataCollectorGateway } from './data-collector.gateway';

describe('DataCollectorGateway', () => {
  let gateway: DataCollectorGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCollectorGateway],
    }).compile();

    gateway = module.get<DataCollectorGateway>(DataCollectorGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
