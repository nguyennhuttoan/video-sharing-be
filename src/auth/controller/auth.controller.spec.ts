import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';

describe('AuthController', () => {
  const mockUser = {
    email: 'test@gmail.com',
    password: 'test1234',
  };

  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWM4MGVlM2E0NmVlMTI4NzczNGYxNiIsImlhdCI6MTY4Mzc4NzQ5MiwiZXhwIjoxNjgzODczODkyfQ.n8FTPHNwjpkxZjxae3xvIzQfLDbpecV2sBC6461dx0Y';

  let authController: AuthController;
  const mockAuthService = {
    signIn: jest.fn(() => {
      return {
        token: mockToken,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return token', async () => {
    const res = await authController.login(mockUser);

    expect(res.token).toEqual(mockToken);
    expect(mockAuthService.signIn).toHaveBeenCalled();
  });
});
