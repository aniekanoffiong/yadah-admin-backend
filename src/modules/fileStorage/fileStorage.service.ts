import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { setCache, getCache } from './fileStorage.cache';

const BUCKET = process.env.S3_BUCKET!;
const URL_EXPIRY = 60 * 60; // 1 hour
const PUBLIC_URL = process.env.S3_PUBLIC_URL
const REGION = process.env.S3_REGION
const ENDPOINT = process.env.S3_ENDPOINT
const ACCESS_KEY = process.env.S3_ACCESS_KEY
const SECRET_KEY = process.env.S3_SECRET_KEY

const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY!,
    secretAccessKey: SECRET_KEY!,
  },
  forcePathStyle: true,
});

export class FileStorageService {
  async generatePresignedUrl(fileName: string, contentType: string): Promise<string> {
    console.log('Generating presigned URL for:', { fileName, contentType, bucket: BUCKET });
    // Validate and normalize the content type
    const normalizedContentType = contentType || 'application/octet-stream';
    
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileName,
      ContentType: normalizedContentType,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: URL_EXPIRY });
    console.log('Generated URL:', url);
    setCache(fileName, url, URL_EXPIRY);
    return url;
  }

  async getDownloadUrl(fileKey: string): Promise<string> {
    const cached = await getCache(fileKey);
    if (cached) return cached;
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: fileKey,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: URL_EXPIRY });
    const publicUrl = url.replace(`${ENDPOINT}/${BUCKET}`, PUBLIC_URL!)
    setCache(fileKey, publicUrl, URL_EXPIRY);
    return publicUrl;
  }
}