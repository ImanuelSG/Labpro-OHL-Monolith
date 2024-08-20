import { Test, TestingModule } from '@nestjs/testing';
import { WebAuthService } from './web-auth.service';

describe('WebAuthService', () => {
  let service: WebAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebAuthService],
    }).compile();

    service = module.get<WebAuthService>(WebAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
