import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  const mockUser = {
    email: 'test@gmail.com',
    password: 'test1234',
  };

  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWM4MGVlM2E0NmVlMTI4NzczNGYxNiIsImlhdCI6MTY4Mzc4NzQ5MiwiZXhwIjoxNjgzODczODkyfQ.n8FTPHNwjpkxZjxae3xvIzQfLDbpecV2sBC6461dx0Y';

  let authService: AuthService;

  const mockUserModel = {
    findOne: jest.fn(() => {
      return {
        mockToken,
      };
    }),

    create: jest.fn(() => {
      return {
        mockToken,
      };
    }),
  };

  const mockJwtService = {
    sign: jest.fn(() => {
      return {
        token: mockToken,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => mockUser.password);

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should signin', async () => {
    const res = await authService.signIn(mockUser);

    expect(res.token).toEqual({ token: mockToken });
  });

  it('should signup', async () => {
    const res = await authService.signUp(mockUser);

    expect(res.token).toEqual({ token: mockToken });
  });
});
