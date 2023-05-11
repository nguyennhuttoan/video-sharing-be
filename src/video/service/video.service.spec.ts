import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { getModelToken } from '@nestjs/mongoose';
import { Video } from '../schema/video.schema';
import { User } from 'src/auth/schema/user.schema';

describe('VideoService', () => {
  const req = {
    user: {
      email: 'test@gmail.com',
      password: 'test1234',
    },
  };

  const mockVideo = {
    id: (Math.random() + 1).toString(36).substring(2),
    title: 'test',
    description: 'test',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    user: req.user as User,
  };

  const mockVideos = [mockVideo];

  let videoService: VideoService;
  const mockVideoModel = {
    find: jest.fn(() => {
      return mockVideos;
    }),
    create: jest.fn(() => {
      return {
        ...mockVideo,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getModelToken(Video.name),
          useValue: mockVideoModel,
        },
      ],
    }).compile();

    videoService = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(videoService).toBeDefined();
  });

  it('should get all videos', async () => {
    const res = await videoService.findAll();

    expect(res).toEqual(mockVideos);
  });

  it('should get all videos', async () => {
    const res = await videoService.create(mockVideo, req.user as User);

    expect(res).toEqual(mockVideo);
  });
});
