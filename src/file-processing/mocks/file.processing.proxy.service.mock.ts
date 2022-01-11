import { Injectable } from '@nestjs/common';
import { IFileProcessingProxyService } from '../file.processing.proxy.service';
import { FileProcessingStatus, GetAllFilesRes, GetFileDetailsRes, GetFileSegmentsRes } from '../file.processing.types';

@Injectable()
export class FileProcessingProxyServiceMock implements IFileProcessingProxyService {
  async getAllFilesPaginated(offset?: number, limit?: number): Promise<GetAllFilesRes> {
    if (offset === 0) {
      return [
        {
          fileId: '08448513-b980-4267-abeb-2445b4069a0c',
          processingStatus: FileProcessingStatus.finished,
        },
        {
          fileId: '11753d4c-f1cd-4696-a6f9-ac1d41929322',
          processingStatus: FileProcessingStatus.finished,
        },
        {
          fileId: '33e6c735-21bc-422b-a0dc-12a1a4e479bd',
          processingStatus: FileProcessingStatus.finished,
        },
        {
          fileId: '3cd97393-b441-4d7c-a58f-ec40fa2fee50',
          processingStatus: FileProcessingStatus.finished,
        },
        {
          fileId: '4a551eec-7dac-46d2-8f17-b6972b864b34',
          processingStatus: FileProcessingStatus.finished,
        },
      ];
    }

    if (offset === 5) {
      return [
        {
          fileId: '84621e3b-3f3a-4625-9ab9-865f605f63c7',
          processingStatus: FileProcessingStatus.finished,
        },
        {
          fileId: '9c169322-9eb6-407b-aa3b-7cfa410e4353',
          processingStatus: FileProcessingStatus.finished,
        },
        {
          fileId: 'a82db6a1-b8db-40f9-aefb-5c580c2f1df7',
          processingStatus: FileProcessingStatus.processing,
        },
        {
          fileId: 'cfb8321c-f47f-4003-bfd2-d26d6f6ea2a6',
          processingStatus: FileProcessingStatus.finished,
        },
        {
          fileId: 'd477241d-c7d8-44e6-adaf-e5654246e2e7',
          processingStatus: FileProcessingStatus.finished,
        },
      ];
    }

    return [];
  }

  async getFileDetails(fileId: string): Promise<GetFileDetailsRes> {
    return {
      fileId,
      fileName: 'HSW9506188592',
      mp3Path: 'https://s3.amazonaws.com/test/mp3Audio/test.mp3',
      originalFilePath: 'https://s3.amazonaws.com/test/test.mp3',
      fileLength: 2240077,
      seriesTitle: null,
    };
  }

  async getFileSegments(fileId: string): Promise<GetFileSegmentsRes> {
    return [
      {
        fileSegmentId: 2685,
        fileId,
        segmentText:
          "All I've been thinking about for the first 10 minutes and all I'll think about for the rest of this talk is Can I bring one person value that helps Karen who's listening to this right now on her treadmill. Like actually do something. This. Is Gary V audio experience? Hello everyone welcome back to you on purpose.",
        startTime: 60,
        endTime: 24430,
      },
      {
        fileSegmentId: 2686,
        fileId,
        segmentText:
          "I'm so grateful that you're a part of this community I'm so grateful that you keep committing to your growth your development and your learning and today's gas doesn't really need an introduction.",
        startTime: 24430,
        endTime: 35070,
      },
      {
        fileSegmentId: 2687,
        fileId,
        segmentText:
          "I know that you're all aware watching his content everywhere from Facebook to Instagram to YouTube and many other platforms in included. But today I love the fact that we're not watching a keynote. We're not watching a Q and A we're not watching on one minute or three minute IPTV clip we're getting a moment to dive in on purpose with the one and only Gary the serial entrepreneur investor five times New York Times best selling author and the founder of venture media and venture x.",
        startTime: 35080,
        endTime: 63610,
      },
      {
        fileSegmentId: 2688,
        fileId,
        segmentText:
          "Gary thank you for being here. Thank you. Well actually I'm in your office. It's all family. I appreciate that. Thank you so much for doing this. No. Thank you so much. Isn't everything on this. Thank you man. Really well thank you I've really been looking forward to this because I've been in this office a few times. Yes. And those meetings with you have always been memorable. Thank you. And I say this to everyone when I'm thinking about being an entrepreneur when I'm thinking about working hard. The person continues which on onto is yours and I appreciate. So for me your content has been really powerful for me.",
        startTime: 63620,
        endTime: 91690,
      },
      {
        fileSegmentId: 2689,
        fileId,
        segmentText:
          "Thank you. And I don't think many people knew this when I first came in and interview before crushing it which was so much fun. But that for me I when I hear you speak I feel very aligned with a lot of it. And actually it's helped me gain conscious competence on what I already do. So I think a lot of us have unconscious competence we're doing stuff right but we don't even know we're doing it. Yes. And so when I listen to you I'm like Oh I do that. Okay I'm doing it right. And that's been a really nice reaffirming belief that you know it's funny to hear you say that I do that for myself. Yes. I'm such an intuitive execute her.",
        startTime: 91690,
        endTime: 123580,
      },
      {
        fileSegmentId: 2690,
        fileId,
        segmentText:
          "Yes. That I lived through life where I go. Wait a minute I'm doing this and then I'm almost doing it for myself.",
        startTime: 123610,
        endTime: 130730,
      },
    ];
  }
}
