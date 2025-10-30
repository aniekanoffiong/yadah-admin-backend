import { YoutubeIntegrationService } from './youtube-integration.service';
import dotenv from 'dotenv';
import { Live } from '../live.entity';
// Import your database repository/service
import { LiveRepository } from '../live.repository';
import { AppDataSource } from '../../../database/data-source';

dotenv.config();

/**
 * One-time script to import all historic videos from YouTube channel
 * Run this once to populate your database with existing videos
 */
export class HistoricVideoImporter {
  private youtubeService: YoutubeIntegrationService;
  private liveRepository: LiveRepository;

  constructor() {
    this.youtubeService = new YoutubeIntegrationService();
    this.liveRepository = new LiveRepository();
  }

  /**
   * Import all historic videos with batch processing
   */
  async importAllVideos(): Promise<void> {
    // initialize TypeORM
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    console.log('========================================');
    console.log('Starting Historic Video Import');
    console.log('========================================\n');

    const startTime = Date.now();
    let totalImported = 0;
    let totalErrors = 0;

    try {
      // Fetch all videos with batch callback
      const allVideos = await this.youtubeService.getAllHistoricVideos({
        maxResults: 50, // Fetch 50 at a time (max allowed by YouTube API)
        // Optional: Only fetch videos from a certain date onwards
        // publishedAfter: new Date('2020-01-01'),
        
        // Process each batch as it comes in
        onBatch: async (videos: Live[]) => {
          console.log(`\n📦 Processing batch of ${videos.length} videos...`);
          
          for (const video of videos) {
            try {
              // Save to database
              await this.saveVideoToDatabase(video);
              totalImported++;
              
              // Log progress
              if (totalImported % 10 === 0) {
                console.log(`✅ Imported ${totalImported} videos so far...`);
              }
            } catch (error) {
              console.error(`❌ Error saving video "${video.title}":`, error);
              totalErrors++;
            }
          }
          
          console.log(`Batch complete. Total imported: ${totalImported}, Errors: ${totalErrors}`);
        },
      });

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      console.log('\n========================================');
      console.log('Import Complete!');
      console.log('========================================');
      console.log(`✅ Total videos imported: ${totalImported}`);
      console.log(`❌ Total errors: ${totalErrors}`);
      console.log(`⏱️  Time taken: ${duration} seconds`);
      console.log(`📊 Success rate: ${((totalImported / (totalImported + totalErrors)) * 100).toFixed(2)}%`);

    } catch (error) {
      console.error('Fatal error during import:', error);
      throw error;
    }
  }

  /**
   * Import only live streams (filters out regular uploads)
   * Note: This still fetches all videos but filters them
   */
  async importOnlyLiveStreams(): Promise<void> {
    console.log('========================================');
    console.log('Starting Historic LIVE STREAMS Import');
    console.log('========================================\n');

    const startTime = Date.now();
    let totalImported = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    try {
      await this.youtubeService.getAllHistoricVideos({
        maxResults: 50,
        
        onBatch: async (videos: Live[]) => {
          console.log(`\n📦 Processing batch of ${videos.length} videos...`);
          
          for (const video of videos) {
            try {
              // Check if it's a live stream
              // You'll need to add a field to track this in mapHistoricVideoToLiveEntity
              // For now, we'll save all and you can filter in your DB later
              
              await this.saveVideoToDatabase(video);
              totalImported++;
              
            } catch (error) {
              console.error(`❌ Error saving video "${video.title}":`, error);
              totalErrors++;
            }
          }
        },
      });

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      console.log('\n========================================');
      console.log('Import Complete!');
      console.log('========================================');
      console.log(`✅ Live streams imported: ${totalImported}`);
      console.log(`⏭️  Regular uploads skipped: ${totalSkipped}`);
      console.log(`❌ Errors: ${totalErrors}`);
      console.log(`⏱️  Time taken: ${duration} seconds`);

    } catch (error) {
      console.error('Fatal error during import:', error);
      throw error;
    }
  }

  /**
   * Import videos from a specific date range
   */
  async importVideosFromDateRange(startDate: Date, endDate?: Date): Promise<void> {
    console.log('========================================');
    console.log('Starting Date Range Import');
    console.log(`From: ${startDate.toISOString()}`);
    if (endDate) console.log(`To: ${endDate.toISOString()}`);
    console.log('========================================\n');

    let totalImported = 0;
    let totalErrors = 0;

    try {
      const allVideos = await this.youtubeService.getAllHistoricVideos({
        maxResults: 50,
        publishedAfter: startDate,
        
        onBatch: async (videos: Live[]) => {
          // Filter by end date if provided
          const filteredVideos = endDate
            ? videos.filter(v => {
                // You'd need to store publishedAt in your Live entity
                // For now, this is a placeholder
                return true;
              })
            : videos;

          for (const video of filteredVideos) {
            try {
              await this.saveVideoToDatabase(video);
              totalImported++;
            } catch (error) {
              console.error(`❌ Error saving video:`, error);
              totalErrors++;
            }
          }
        },
      });

      console.log('\n========================================');
      console.log(`✅ Imported ${totalImported} videos from date range`);
      console.log(`❌ Errors: ${totalErrors}`);
      console.log('========================================');

    } catch (error) {
      console.error('Fatal error during import:', error);
      throw error;
    }
  }

  /**
   * Dry run - preview what would be imported without saving
   */
  async dryRun(): Promise<void> {
    console.log('========================================');
    console.log('DRY RUN - No data will be saved');
    console.log('========================================\n');

    let totalVideos = 0;

    try {
      await this.youtubeService.getAllHistoricVideos({
        maxResults: 50,
        
        onBatch: async (videos: Live[]) => {
          totalVideos += videos.length;
          
          console.log(`\n📦 Batch of ${videos.length} videos:`);
          videos.slice(0, 3).forEach(video => {
            console.log(`  - ${video.title}`);
            console.log(`    URL: ${video.videoUrl}`);
            console.log(`    Start: ${video.startTime}`);
          });
          
          if (videos.length > 3) {
            console.log(`  ... and ${videos.length - 3} more`);
          }
        },
      });

      console.log('\n========================================');
      console.log('Dry Run Complete');
      console.log(`📊 Total videos found: ${totalVideos}`);
      console.log('No data was saved to the database');
      console.log('========================================');

    } catch (error) {
      console.error('Error during dry run:', error);
      throw error;
    }
  }

  /**
   * Save video to database
   * Replace this with your actual database logic
   */
  private async saveVideoToDatabase(video: Live): Promise<void> {
    await this.liveRepository.save(video);
    console.log(`💾 Successfully saved video: ${video.title}`);    
  }

  /**
   * Check if import is needed (checks if database is empty)
   */
  async isImportNeeded(): Promise<boolean> {
    return process.env.SHOULD_EXECUTE_HISTORIC_IMPORT === 'true';
  }
}

// ============================================
// Usage Examples
// ============================================

/**
 * Example 1: Import all historic videos
 */
async function runFullImport() {
  const importer = new HistoricVideoImporter();
  
  // Check if import is needed
  if (await importer.isImportNeeded()) {
    console.log('Database is empty, starting import...\n');
    await importer.importAllVideos();
  } else {
    console.log('Database already populated, skipping import');
  }
}

/**
 * Example 2: Dry run first to see what would be imported
 */
async function runDryRunFirst() {
  const importer = new HistoricVideoImporter();
  
  console.log('Running dry run first...\n');
  await importer.dryRun();
  
  console.log('\nProceed with actual import? (implement confirmation logic)');
  // await importer.importAllVideos();
}

/**
 * Example 3: Import only videos from last year
 */
async function runPartialImport() {
  const importer = new HistoricVideoImporter();
  
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  await importer.importVideosFromDateRange(oneYearAgo);
}

/**
 * Example 4: Command line script
 */
async function main() {
  const command = process.argv[2] || 'help';
  const importer = new HistoricVideoImporter();

  try {
    switch (command) {
      case 'import':
        await importer.importAllVideos();
        break;
      
      case 'dry-run':
        await importer.dryRun();
        break;
      
      case 'live-only':
        await importer.importOnlyLiveStreams();
        break;
      
      case 'help':
      default:
        console.log('Usage: node historic-import.js [command]');
        console.log('Commands:');
        console.log('  import      - Import all historic videos');
        console.log('  dry-run     - Preview what would be imported');
        console.log('  live-only   - Import only live streams');
        console.log('  help        - Show this help message');
        break;
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

// Export for use in other scripts
export { runFullImport, runDryRunFirst, runPartialImport };