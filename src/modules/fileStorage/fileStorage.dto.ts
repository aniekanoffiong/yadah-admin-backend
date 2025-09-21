export class GeneratePresignedUrlDto {
  fileName!: string;
  fileType!: string;
}

export class GetDownloadUrlDto {
  fileKey!: string;
}