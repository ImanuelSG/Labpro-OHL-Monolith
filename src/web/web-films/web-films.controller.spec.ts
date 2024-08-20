import { Test, TestingModule } from '@nestjs/testing';
import { WebFilmsController } from './web-films.controller';
import { WebFilmsService } from './web-films.service';

describe('WebFilmsController', () => {
  let controller: WebFilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebFilmsController],
      providers: [WebFilmsService],
    }).compile();

    controller = module.get<WebFilmsController>(WebFilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
