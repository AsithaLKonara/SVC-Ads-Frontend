import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/dashboard/*',
          '/api/',
          '/api/*',
          '/login',
          '/login/*',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
