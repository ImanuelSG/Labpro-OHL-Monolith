import { Test, TestingModule } from '@nestjs/testing';
import { WebFilmsService } from './web-films.service';

describe('WebFilmsService', () => {
  let service: WebFilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebFilmsService],
    }).compile();

    service = module.get<WebFilmsService>(WebFilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
