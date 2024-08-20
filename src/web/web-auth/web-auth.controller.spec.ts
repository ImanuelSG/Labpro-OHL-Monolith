import { Test, TestingModule } from '@nestjs/testing';
import { WebAuthController } from './web-auth.controller';
import { WebAuthService } from './web-auth.service';

describe('WebAuthController', () => {
  let controller: WebAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebAuthController],
      providers: [WebAuthService],
    }).compile();

    controller = module.get<WebAuthController>(WebAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
