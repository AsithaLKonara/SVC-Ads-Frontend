import { Metadata } from "next";
import { siteConfig } from "./config";

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

export function generateSeoMetadata({
  title,
  description,
  url,
  image,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  keywords,
}: GenerateMetadataProps = {}): Metadata {
  const finalTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const finalDescription = description || siteConfig.description;
  const finalImage = image || siteConfig.defaultImage;
  const finalUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const finalKeywords = keywords?.length ? keywords : siteConfig.keywords;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: finalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: finalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
      creator: siteConfig.twitter,
    },
  };
}
