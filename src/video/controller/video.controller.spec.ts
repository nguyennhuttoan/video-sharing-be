import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from '../controller/video.controller';
import { VideoService } from '../service/video.service';
import { User } from '../../auth/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { CanActivate } from '@nestjs/common';

describe('VideoController', () => {
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
    email: 'test@test.com',
    user: req.user as User,
  };

  const mockVideos = [mockVideo];

  const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

  let videoController: VideoController;
  const mockVideoService = {
    create: jest.fn(() => {
      return {
        ...mockVideo,
      };
    }),
    findAll: jest.fn(() => {
      return mockVideos;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [VideoService],
    })
      .overrideGuard(AuthGuard())
      .useValue(mockGuard)
      .overrideProvider(VideoService)
      .useValue(mockVideoService)
      .compile();

    videoController = module.get<VideoController>(VideoController);
  });

  it('should be defined', () => {
    expect(videoController).toBeDefined();
  });

  it('should create video', async () => {
    const res = await videoController.createVideo(mockVideo, req);

    expect(res).toEqual(mockVideo);
    expect(mockVideoService.create).toHaveBeenCalled();
  });

  it('should get all videos', async () => {
    const res = await videoController.getAllVideos();

    expect(res).toEqual(mockVideos);
    expect(mockVideoService.findAll).toHaveBeenCalled();
  });
});
