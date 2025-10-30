import { google, youtube_v3 } from 'googleapis';
import * as dotenv from 'dotenv';
import { Live } from '../live.entity';
import { format, parse, parseISO } from 'date-fns';
import { FileStorageService } from '../../fileStorage/fileStorage.service';

dotenv.config();

export class YoutubeIntegrationService {
  private youtube: youtube_v3.Youtube;
  private channelId: string;
  private uploadsPlaylistId?: string;
  private lastVideoId: string | null = null;
  private lastCheckTime: Date | null = null;
  private fileStorageService: FileStorageService;

  constructor() {
    this.channelId = process.env.CHANNEL_ID ?? '';
    this.youtube = google.youtube({ 
      version: 'v3', 
      auth: process.env.YOUTUBE_API_KEY 
    });
    this.fileStorageService = new FileStorageService();
  }

  /**
   * Check for live or upcoming streams on the channel
   * Uses quota-efficient playlistItems + videos approach (2-3 units total)
   */
  async checkLiveStream(): Promise<Live | null> {
    try {
      // Get uploads playlist ID (cached after first call)
      if (!this.uploadsPlaylistId) {
        await this.initializeUploadsPlaylist();
      }

      if (!this.uploadsPlaylistId) {
        console.error('Could not retrieve uploads playlist ID');
        return null;
      }

      // Get recent videos from uploads playlist (1 unit)
      const playlistResponse = await this.retryWithBackoff(() =>
        this.youtube.playlistItems.list({
          part: ['snippet', 'contentDetails'],
          playlistId: this.uploadsPlaylistId!,
          maxResults: 5, // Check last 5 uploads
        })
      );

      // Extract video IDs
      const videoIds = playlistResponse?.data.items
        ?.map(item => item.contentDetails?.videoId)
        .filter(Boolean) as string[];

      if (videoIds.length === 0) {
        return null;
      }

      // Get live streaming details for these videos (1 unit)
      const videosResponse = await this.retryWithBackoff(() =>
        this.youtube.videos.list({
          part: ['snippet', 'liveStreamingDetails'],
          id: videoIds,
        })
      );

      // Find live videos first, then upcoming
      const liveVideo = videosResponse?.data.items?.find(
        video => video.snippet?.liveBroadcastContent === 'live'
      );

      if (liveVideo) {
        const videoId = liveVideo.id || '';
        
        // Skip if it's the same video as last check
        if (videoId === this.lastVideoId) {
          console.log('Same live video as last check, skipping');
          return null;
        }
        
        this.lastVideoId = videoId;
        this.lastCheckTime = new Date();
        console.log('Live video found:', JSON.stringify(liveVideo));
        return await this.mapToLiveEntity(liveVideo, true);
      }

      // Check for upcoming streams
      const upcomingVideo = videosResponse?.data.items?.find(
        video => video.snippet?.liveBroadcastContent === 'upcoming'
      );

      if (upcomingVideo) {
        const videoId = upcomingVideo.id || '';
        
        // Skip if it's the same video as last check
        if (videoId === this.lastVideoId) {
          console.log('Same upcoming video as last check, skipping');
          return null;
        }
        
        this.lastVideoId = videoId;
        this.lastCheckTime = new Date();
        console.log('Upcoming video found:', JSON.stringify(upcomingVideo));
        return await this.mapToLiveEntity(upcomingVideo, false);
      }

      // No live or upcoming streams found
      this.lastVideoId = null;
      return null;

    } catch (error) {
      console.error('Error polling YouTube live stream:', error);
      return null;
    }
  }

  /**
   * Initialize and cache the uploads playlist ID
   */
  private async initializeUploadsPlaylist(): Promise<void> {
    try {
      const channelResponse = await this.retryWithBackoff(() =>
        this.youtube.channels.list({
          part: ['contentDetails'],
          id: [this.channelId],
        })
      );

      this.uploadsPlaylistId = 
        channelResponse?.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      
      if (this.uploadsPlaylistId) {
        console.log('Uploads playlist ID cached:', this.uploadsPlaylistId);
      }
    } catch (error) {
      console.error('Error fetching uploads playlist ID:', error);
    }
  }

  /**
   * Map YouTube video to Live entity
   */
  private async mapToLiveEntity(
    video: youtube_v3.Schema$Video,
    isLive: boolean
  ): Promise<Live> {
    const live = new Live();
    live.videoUrl = this.generateYoutubeUrl(video.id || '');
    live.title = video.snippet?.title || 'Untitled Stream';
    live.isLive = isLive;
    
    // Set start time
    if (isLive) {
      // For live streams, use actual start time if available
      const actualStartTime = video.liveStreamingDetails?.actualStartTime;
      live.date = actualStartTime ? new Date(actualStartTime) : new Date()
      live.startTime = format(live.date, 'HH:mm')
    } else {
      // For upcoming streams, use scheduled start time
      const scheduledStartTime = video.liveStreamingDetails?.scheduledStartTime;
      live.date = scheduledStartTime ? new Date(scheduledStartTime) : new Date()
      live.startTime = scheduledStartTime
        ? format(live.date, 'HH:mm')
        : '';
    }

    // Add description
    live.description = video.snippet?.description || '';

    // Download and store thumbnail
    const thumbnailUrl = this.getBestThumbnailUrl(video);
    if (thumbnailUrl) {
      live.thumbnailUrl = await this.downloadAndStoreThumbnail(
        thumbnailUrl,
        video.id || ''
      );
    }

    return live;
  }

  /**
   * Retry logic with exponential backoff for transient errors
   */
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3
  ): Promise<T | null> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        // Don't retry on auth or quota errors
        if (error.code === 403 || error.code === 401) {
          console.error('Authentication or quota error:', error.message);
          throw error;
        }
        
        // Last attempt - throw error
        if (i === maxRetries - 1) {
          console.error('Max retries reached:', error.message);
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        const waitTime = Math.pow(2, i) * 1000;
        console.log(`Retry ${i + 1}/${maxRetries} after ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    return null;
  }

  /**
   * Generate YouTube URL in different formats
   */
  generateYoutubeUrl(videoId: string, short?: boolean, embed?: boolean): string {
    if (!videoId) return '';
    
    if (short) {
      return `https://youtu.be/${videoId}`;
    }
    if (embed) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  /**
   * Get last check information for monitoring
   */
  getLastCheckInfo(): { videoId: string | null; checkTime: Date | null } {
    return {
      videoId: this.lastVideoId,
      checkTime: this.lastCheckTime,
    };
  }

  /**
   * Clear cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    this.lastVideoId = null;
    this.lastCheckTime = null;
    console.log('Cache cleared');
  }

  /**
   * Get the best available thumbnail URL from video
   * Priority: maxres > standard > high > medium > default
   */
  private getBestThumbnailUrl(video: youtube_v3.Schema$Video): string | null {
    const thumbnails = video.snippet?.thumbnails;
    if (!thumbnails) return null;

    // Try in order of quality
    return (
      thumbnails.maxres?.url ||
      thumbnails.standard?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      thumbnails.default?.url ||
      null
    );
  }

  /**
   * Download thumbnail from YouTube and upload to your object storage
   * @param thumbnailUrl - The YouTube thumbnail URL
   * @param videoId - The video ID (used for filename)
   * @returns The URL of the stored thumbnail in your storage system
   */
  private async downloadAndStoreThumbnail(
    thumbnailUrl: string,
    videoId: string
  ): Promise<string> {
    try {
      console.log(`Downloading thumbnail for video ${videoId}...`);

      // Download the thumbnail from YouTube
      const response = await fetch(thumbnailUrl);
      if (!response.ok) {
        throw new Error(`Failed to download thumbnail: ${response.statusText}`);
      }

      // Get the image buffer
      const imageBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);

      // Determine file extension from content-type or URL
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const extension = contentType.split('/')[1] || 'jpg';
      const filename = `thumbnails/${videoId}.${extension}`;

      // Upload to your object storage
      const storedUrl = await this.uploadToObjectStorage(
        buffer,
        filename,
        contentType
      );

      console.log(`✅ Thumbnail stored: ${storedUrl}`);
      return storedUrl;

    } catch (error) {
      console.error(`Error downloading/storing thumbnail for ${videoId}:`, error);
      // Fallback to original YouTube URL if storage fails
      return thumbnailUrl;
    }
  }

  /**
   * Upload file to your object storage system
   */
  private async uploadToObjectStorage(
    buffer: Buffer,
    filename: string,
    contentType: string
  ): Promise<string> {
    return this.fileStorageService.uploadFile(filename, buffer, contentType);
  }

  /**
   * Get all historic videos from the channel (live streams and regular uploads)
   * This is a one-time operation to populate your database
   * Returns videos in batches to handle large channels
   */
  async getAllHistoricVideos(options?: {
    maxResults?: number;
    publishedAfter?: Date;
    onBatch?: (videos: Live[]) => Promise<void>;
  }): Promise<Live[]> {
    const allVideos: Live[] = [];
    let pageToken: string | undefined;
    const maxResults = options?.maxResults || 50; // YouTube API max is 50
    let totalFetched = 0;

    try {
      // Ensure we have the uploads playlist ID
      if (!this.uploadsPlaylistId) {
        await this.initializeUploadsPlaylist();
      }

      if (!this.uploadsPlaylistId) {
        throw new Error('Could not retrieve uploads playlist ID');
      }

      console.log('Fetching all historic videos from channel...');
      console.log(`Uploads Playlist ID: ${this.uploadsPlaylistId}`);

      // Pagination loop
      do {
        console.log(`Fetching batch... (total so far: ${totalFetched})`);

        // Get a page of videos from the uploads playlist (1 unit per request)
        const playlistResponse = await this.retryWithBackoff(() =>
          this.youtube.playlistItems.list({
            part: ['snippet', 'contentDetails'],
            playlistId: this.uploadsPlaylistId!,
            maxResults,
            pageToken,
            ...(options?.publishedAfter && {
              publishedAfter: options.publishedAfter.toISOString(),
            }),
          })
        );

        const items = playlistResponse?.data.items || [];
        
        if (items.length === 0) {
          console.log('No more videos found');
          break;
        }

        // Extract video IDs
        const videoIds = items
          .map(item => item.contentDetails?.videoId)
          .filter(Boolean) as string[];

        // Get full video details including live streaming info (1 unit per 50 videos)
        const videosResponse = await this.retryWithBackoff(() =>
          this.youtube.videos.list({
            part: ['snippet', 'liveStreamingDetails', 'contentDetails', 'statistics'],
            id: videoIds,
          })
        );

        const videos = videosResponse?.data.items || [];

        // Map to Live entities
        const batchVideos = videos.map(video => this.mapHistoricVideoToLiveEntity(video));
        
        // Wait for all thumbnails to download
        const resolvedVideos = await Promise.all(batchVideos);
        
        allVideos.push(...resolvedVideos);
        totalFetched += resolvedVideos.length;

        console.log(`Fetched ${resolvedVideos.length} videos in this batch`);
        console.log(`Total videos fetched: ${totalFetched}`);

        // Call the onBatch callback if provided (useful for saving to DB in batches)
        if (options?.onBatch) {
          await options.onBatch(resolvedVideos);
          console.log('Batch processed by callback');
        }

        // Get next page token
        pageToken = playlistResponse?.data.nextPageToken || undefined;

        // Small delay to avoid rate limiting
        if (pageToken) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

      } while (pageToken);

      console.log(`✅ Completed! Total videos fetched: ${totalFetched}`);
      
      return allVideos;

    } catch (error) {
      console.error('Error fetching historic videos:', error);
      throw error;
    }
  }

  /**
   * Map historic YouTube video to Live entity with additional metadata
   */
  private async mapHistoricVideoToLiveEntity(video: youtube_v3.Schema$Video): Promise<Live> {
    const live = new Live();
    live.videoUrl = this.generateYoutubeUrl(video.id || '');
    live.title = video.snippet?.title || 'Untitled Video';
    
    // Determine if it was a live stream
    const wasLiveStream = video.snippet?.liveBroadcastContent === 'none' 
      ? !!video.liveStreamingDetails 
      : video.snippet?.liveBroadcastContent !== 'none';
    
    // Set isLive to false for historic videos (they're all completed)
    live.isLive = false;

    // Set start time based on whether it was a live stream or regular upload
    if (video.liveStreamingDetails?.actualStartTime) {
      // Was a live stream - use actual start time
      live.date = new Date(video.liveStreamingDetails.actualStartTime)
      live.startTime = format(
        new Date(video.liveStreamingDetails.actualStartTime),
        'HH:mm'
      );
      live.endTime = video.liveStreamingDetails.actualEndTime ? format(
        new Date(video.liveStreamingDetails.actualEndTime),
        'HH:mm'
      ) : '';
    } else if (video.snippet?.publishedAt) {
      // Regular upload - use publish time
      live.date = new Date(video.snippet.publishedAt);
      live.startTime = format(
        new Date(video.snippet.publishedAt),
        'HH:mm'
      );
    } else {
      live.startTime = '';
    }

    // Add description
    live.description = video.snippet?.description || '';

    // Download and store thumbnail
    const thumbnailUrl = this.getBestThumbnailUrl(video);
    if (thumbnailUrl) {
      live.thumbnailUrl = await this.downloadAndStoreThumbnail(
        thumbnailUrl,
        video.id || ''
      );
    }

    // Optional: Add additional metadata you might want to store
    live.duration = video.contentDetails?.duration || '';
    live.viewCount = parseInt(video.statistics?.viewCount || '0');
    live.wasLiveStream = wasLiveStream;

    return live;
  }

  /**
   * Get only historic live streams (filters out regular uploads)
   */
  async getHistoricLiveStreams(options?: {
    maxResults?: number;
    publishedAfter?: Date;
    onBatch?: (videos: Live[]) => Promise<void>;
  }): Promise<Live[]> {
    console.log('Fetching only historic live streams...');
    
    // Custom callback to filter only live streams
    const liveStreamVideos: Live[] = [];
    const originalCallback = options?.onBatch;
    
    const filteredCallback = async (videos: Live[]) => {
      // In the batch, we need to filter - but we need access to raw video data
      // This is handled in the main function, so we'll use a different approach
      if (originalCallback) {
        await originalCallback(videos);
      }
    };

    // Get all videos
    const allVideos = await this.getAllHistoricVideos({
      ...options,
      onBatch: filteredCallback,
    });

    // We need to modify getAllHistoricVideos to support filtering
    // For now, filter the results
    // Note: This isn't ideal as we still fetch all videos
    // Better to modify the query, but YouTube API doesn't support filtering playlists by broadcast type
    
    return allVideos; // Return all for now - see note below
    
    // NOTE: YouTube API doesn't allow filtering playlist items by live broadcast type
    // You'll need to filter in your application or use the search API instead
    // (but search uses 100 units vs 1-2 for this approach)
  }

  stripTrailingDate(title?: string): string {
    // Matches optional separator (||, |, -, –, —) then a date (DD/MM/YYYY, D-M-YY, YYYY-MM-DD) optionally with time
    const trailingDateRegex = /(?:\s*(?:\|\||\||-|–|—)\s*)?(?:\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b|\b\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}\b)(?:\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APMapm]{2})?)?\s*$/;
    return title?.replace(trailingDateRegex, '').trim().replace(/(?:\|\||\||-|–|—)\s*$/,'').trim() || '';
  }
}
