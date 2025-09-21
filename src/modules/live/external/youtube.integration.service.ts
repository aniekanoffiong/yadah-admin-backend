import { google, youtube_v3 } from 'googleapis';
import * as dotenv from 'dotenv';
import { Live } from '../live.entity';
import { format } from 'date-fns';

dotenv.config();

export class YoutubeIntegrationService {
  private youtube: youtube_v3.Youtube;
  private channelId: string;
  private oauth2Client;

  constructor() {
    this.channelId = process.env.CHANNEL_ID ?? '';
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    // Set tokens loaded from env or a secure store
    this.oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      expiry_date: Number(process.env.GOOGLE_TOKEN_EXPIRY),
    });
    this.youtube = google.youtube({ version: 'v3', auth: this.oauth2Client });
  }

  async checkLiveStream(): Promise<Live | null> {
    try {
      const response = await this.youtube.search.list({
        part: ['snippet'],
        channelId: this.channelId,
        eventType: 'live',
        type: ['video'],
        maxResults: 1,
      });

      const liveVideos = response.data.items;
      if (liveVideos && liveVideos.length > 0) {
        const vid = liveVideos[0];
        const live = new Live();
        live.videoUrl = this.generateYoutubeUrl(vid.id?.videoId || '');
        live.title = vid.snippet?.title || '';
        live.isLive = true;
        live.startTime = format(new Date(), "HH:mm");
        return live;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error polling YouTube live stream:', error);
      return null;
    }
  }

  generateYoutubeUrl(videoId: string, short?: boolean, embed?: boolean): string {
    if (short) {
      return `https://youtu.be/${videoId}`;
    }
    if (embed) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
}
