import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ad/ImageGallery";
import AdDetails from "@/components/ad/AdDetails";
import AdSidebar from "@/components/ad/AdSidebar";
import StickyMobileContact from "@/components/ad/StickyMobileContact";
import RelatedAds from "@/components/ad/RelatedAds";
import { adService, Ad } from "@/services/adService";
import { getRelativeTime } from "@/utils/format";

export default async function AdPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let rawAd: Ad | null = null;
  try {
    rawAd = await adService.getAd(slug);
  } catch (error) {
    console.error("Failed to fetch ad:", error);
    notFound();
  }

  if (!rawAd) notFound();

  const postedDate = getRelativeTime(rawAd.createdAt);

  // Map the backend Ad model to the frontend expected data structure
  const ad = {
    id: rawAd.id,
    title: rawAd.title,
    price: rawAd.price.toLocaleString('en-US'),
    location: `${rawAd.city}, ${rawAd.district}`,
    postedDate: `Posted ${postedDate}`,
    views: rawAd.views || 0,
    description: rawAd.description,
    attributes: {
      Condition: rawAd.condition || "Used",
      Category: rawAd.category?.name || "Uncategorized",
      ...(typeof rawAd.attributes === 'object' && rawAd.attributes !== null ? rawAd.attributes : {})
    },
    images: rawAd.images && rawAd.images.length > 0 
      ? rawAd.images 
      : ["https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80"], // Fallback
    seller: {
      name: rawAd.user?.name || "Unknown Seller",
      avatar: "",
      joinedDate: "Unknown", // Would normally come from user profile
      isVerified: true,
      phone: rawAd.contactPhone || "077 000 0000" // Fallback to mock phone
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 pb-24 md:pb-12">
        <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="mb-6 flex text-sm text-foreground/60">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href={`/ads?category=${rawAd.category?.slug}`} className="hover:text-brand-600">{rawAd.category?.name || "Ads"}</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="truncate font-medium text-foreground" aria-current="page">{ad.title}</li>
            </ol>
          </nav>

          {/* Main Layout Grid */}
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            
            {/* Left Column (Content) */}
            <div className="flex-1 flex flex-col gap-8 lg:w-2/3">
              {/* Mobile Title & Price (Hidden on Desktop) */}
              <div className="block lg:hidden">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground/60">{ad.postedDate}</span>
                  <span className="flex items-center gap-1 text-sm text-foreground/60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    {ad.views} views
                  </span>
                </div>
                <h1 className="mb-4 font-heading text-2xl font-bold text-foreground">
                  {ad.title}
                </h1>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-extrabold text-brand-600">Rs {ad.price}</span>
                  <div className="flex items-center gap-1 text-foreground/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {ad.location}
                  </div>
                </div>
              </div>

              <ImageGallery images={ad.images} title={ad.title} />
              
              <AdDetails data={ad} />
            </div>

            {/* Right Column (Sidebar) */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24">
                <AdSidebar data={{...ad, phone: ad.seller.phone, categoryName: rawAd.category?.name || "Ads"}} />
              </div>
            </div>

          </div>

          <RelatedAds 
            currentAdId={ad.id} 
            categorySlug={rawAd.category?.slug} 
            categoryName={rawAd.category?.name} 
          />
        </div>
      </main>

      {/* Sticky Mobile Contact Actions */}
      <StickyMobileContact phone={ad.seller.phone} />

      <Footer />
    </div>
  );
}
