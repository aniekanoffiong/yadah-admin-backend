/**
 * Site configuration response type
 */
export interface SiteConfigResponse {
  isComingSoonMode: boolean;
  comingSoonConfig?: {
    title: string;
    subtitle: string;
    message: string;
    launchDate?: string;
    contactEmail?: string;
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
    };
  };
}

export type ConfigData = Record<string, Object>
