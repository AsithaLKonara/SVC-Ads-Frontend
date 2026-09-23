import { siteConfig } from "./config";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organization.name,
    legalName: siteConfig.organization.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.organization.logo}`,
    sameAs: siteConfig.social,
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateRealEstateListingSchema(ad: {
  title: string;
  description: string;
  price: number;
  url: string;
  images: string[];
  district: string;
  city: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product", // Google commonly indexes Product schema effectively for classifieds/real estate
    name: ad.title,
    description: ad.description,
    image: ad.images.map(img => (img.startsWith('http') ? img : `${siteConfig.url}${img}`)),
    url: `${siteConfig.url}${ad.url}`,
    offers: {
      "@type": "Offer",
      price: ad.price,
      priceCurrency: "LKR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}${ad.url}`,
      areaServed: {
        "@type": "City",
        name: ad.city,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: ad.district,
        },
      },
    },
    // We can also attach additional context using LocalBusiness if it was a service
  };
}
