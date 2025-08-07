import { Test, TestingModule } from '@nestjs/testing';
import { DropshipperController } from './dropshipper.controller';

describe('DropshipperController', () => {
  let controller: DropshipperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DropshipperController],
    }).compile();

    controller = module.get<DropshipperController>(DropshipperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
