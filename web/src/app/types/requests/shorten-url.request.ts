export interface ShortenUrlRequest {
  longUrl: string;
  shortUrl?: string;
  expiryDate?: Date;
}
