import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/config';
import { API_URL } from '@/services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/ads`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  try {
    // Fetch categories sitemap data
    const catRes = await fetch(`${API_URL}/categories/sitemap`, { next: { revalidate: 3600 } });
    if (catRes.ok) {
      const categories = await catRes.json();
      categories.forEach((cat: any) => {
        // Construct the URL path (handling subcategories if needed)
        const path = cat.parent ? `/${cat.parent.slug}/${cat.slug}` : `/${cat.slug}`;
        routes.push({
          url: `${siteConfig.url}${path}`,
          lastModified: new Date(cat.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }

    // Fetch ads sitemap data
    const adsRes = await fetch(`${API_URL}/ads/sitemap`, { next: { revalidate: 3600 } });
    if (adsRes.ok) {
      const ads = await adsRes.json();
      ads.forEach((ad: any) => {
        routes.push({
          url: `${siteConfig.url}/ad/${ad.slug}`,
          lastModified: new Date(ad.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
  }

  return routes;
}
