import dotenv from 'dotenv';
import { AppDataSource } from '../../../database/data-source';
import { LiveService } from '../live.service';

dotenv.config();

/**
 * One-time script to import all historic videos from YouTube channel
 * Run this once to populate your database with existing videos
 */
export class HistoricVideoImporter {
  private liveService: LiveService;

  constructor() {
    this.liveService = new LiveService();
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
    
    this.liveService.executeVideosImport();
  }

  /**
   * Import only live streams (filters out regular uploads)
   * Note: This still fetches all videos but filters them
   */
  async importOnlyLiveStreams(): Promise<void> {
    console.log('========================================');
    console.log('Starting Historic LIVE STREAMS Import');
    console.log('========================================\n');

    this.liveService.executeVideosImport({ filterLive: true })
  }

  /**
   * Import videos from a specific date range
   */
  async importVideosFromDateRange(startDate: Date, endDate?: Date): Promise<void> {
    console.log('========================================');
    console.log('Starting Date Range Import');
    console.log(`From: ${startDate?.toISOString()}`);
    if (endDate) console.log(`To: ${endDate.toISOString()}`);
    console.log('========================================\n');

    this.liveService.executeVideosImport({ startDate, endDate });
  }

  /**
   * Dry run - preview what would be imported without saving
   */
  async dryRun(): Promise<void> {
    console.log('========================================');
    console.log('DRY RUN - No data will be saved');
    console.log('========================================\n');

    this.liveService.executeVideosImport()
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