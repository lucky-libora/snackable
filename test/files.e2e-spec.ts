import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FileProcessingProxyService } from '../src/file-processing/file.processing.proxy.service';
import { FileProcessingProxyServiceMock } from '../src/file-processing/mocks/file.processing.proxy.service.mock';
import { FileProcessingStatus } from '../src/file-processing/file.processing.types';
import { getValidAuthorizationToken } from './helpers/auth.helpers';

describe('FilesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FileProcessingProxyService)
      .useClass(FileProcessingProxyServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/files (GET)', () => {
    it('should return processed files', async () => {
      const server = app.getHttpServer();
      const authorizationToken = await getValidAuthorizationToken(server);
      const res = await request(server).get('/files').set('authorization', authorizationToken);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(9);
      expect(res.body).toEqual(
        expect.objectContaining([
          expect.objectContaining({
            processingStatus: FileProcessingStatus.finished,
          }),
        ]),
      );
    });
  });

  describe('/files/:id GET', () => {
    it('should receive file with metadata', async () => {
      const server = app.getHttpServer();
      const authorizationToken = await getValidAuthorizationToken(server);
      const res = await request(server)
        .get('/files/08448513-b980-4267-abeb-2445b4069a0c')
        .set('authorization', authorizationToken);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({
        fileId: '08448513-b980-4267-abeb-2445b4069a0c',
        fileLength: 2240077,
        fileName: 'HSW9506188592',
        mp3Path: 'https://s3.amazonaws.com/test/mp3Audio/test.mp3',
        originalFilePath: 'https://s3.amazonaws.com/test/test.mp3',
        segmentsMeta: [
          {
            endTime: 24430,
            fileId: '08448513-b980-4267-abeb-2445b4069a0c',
            fileSegmentId: 2685,
            segmentText:
              "All I've been thinking about for the first 10 minutes and all I'll think about for the rest of this talk is Can I bring one person value that helps Karen who's listening to this right now on her treadmill. Like actually do something. This. Is Gary V audio experience? Hello everyone welcome back to you on purpose.",
            startTime: 60,
          },
          {
            endTime: 35070,
            fileId: '08448513-b980-4267-abeb-2445b4069a0c',
            fileSegmentId: 2686,
            segmentText:
              "I'm so grateful that you're a part of this community I'm so grateful that you keep committing to your growth your development and your learning and today's gas doesn't really need an introduction.",
            startTime: 24430,
          },
          {
            endTime: 63610,
            fileId: '08448513-b980-4267-abeb-2445b4069a0c',
            fileSegmentId: 2687,
            segmentText:
              "I know that you're all aware watching his content everywhere from Facebook to Instagram to YouTube and many other platforms in included. But today I love the fact that we're not watching a keynote. We're not watching a Q and A we're not watching on one minute or three minute IPTV clip we're getting a moment to dive in on purpose with the one and only Gary the serial entrepreneur investor five times New York Times best selling author and the founder of venture media and venture x.",
            startTime: 35080,
          },
          {
            endTime: 91690,
            fileId: '08448513-b980-4267-abeb-2445b4069a0c',
            fileSegmentId: 2688,
            segmentText:
              "Gary thank you for being here. Thank you. Well actually I'm in your office. It's all family. I appreciate that. Thank you so much for doing this. No. Thank you so much. Isn't everything on this. Thank you man. Really well thank you I've really been looking forward to this because I've been in this office a few times. Yes. And those meetings with you have always been memorable. Thank you. And I say this to everyone when I'm thinking about being an entrepreneur when I'm thinking about working hard. The person continues which on onto is yours and I appreciate. So for me your content has been really powerful for me.",
            startTime: 63620,
          },
          {
            endTime: 123580,
            fileId: '08448513-b980-4267-abeb-2445b4069a0c',
            fileSegmentId: 2689,
            segmentText:
              "Thank you. And I don't think many people knew this when I first came in and interview before crushing it which was so much fun. But that for me I when I hear you speak I feel very aligned with a lot of it. And actually it's helped me gain conscious competence on what I already do. So I think a lot of us have unconscious competence we're doing stuff right but we don't even know we're doing it. Yes. And so when I listen to you I'm like Oh I do that. Okay I'm doing it right. And that's been a really nice reaffirming belief that you know it's funny to hear you say that I do that for myself. Yes. I'm such an intuitive execute her.",
            startTime: 91690,
          },
          {
            endTime: 130730,
            fileId: '08448513-b980-4267-abeb-2445b4069a0c',
            fileSegmentId: 2690,
            segmentText:
              "Yes. That I lived through life where I go. Wait a minute I'm doing this and then I'm almost doing it for myself.",
            startTime: 123610,
          },
        ],
        seriesTitle: null,
      });
    });

    it('should return 404 if file is not exist', async () => {
      const server = app.getHttpServer();
      const authorizationToken = await getValidAuthorizationToken(server);
      const res = await request(server).get('/files/non-existing-id').set('authorization', authorizationToken);
      expect(res.status).toBe(404);
    });

    it('should return 400 if file is not processed', async () => {
      const server = app.getHttpServer();
      const authorizationToken = await getValidAuthorizationToken(server);
      const res = await request(server)
        .get('/files/a82db6a1-b8db-40f9-aefb-5c580c2f1df7')
        .set('authorization', authorizationToken);
      expect(res.status).toBe(400);
    });
  });
});
