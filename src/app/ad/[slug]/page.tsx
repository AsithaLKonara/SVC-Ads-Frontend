import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import ImageGallery from "@/components/ad/ImageGallery";
import AdDetails from "@/components/ad/AdDetails";
import SellerCard from "@/components/ad/SellerCard";
import StickyMobileContact from "@/components/ad/StickyMobileContact";
import RelatedAds from "@/components/ad/RelatedAds";

// We'll mock the data for now. In reality, you'd fetch this based on the slug.
const MOCK_AD = {
  id: "1",
  title: "Toyota Aqua G Grade 2014",
  price: "7,250,000",
  location: "Colombo 6, Colombo",
  postedDate: "Posted on 24 Aug 2026",
  views: 1245,
  description: `Mint condition Toyota Aqua G Grade 2014 for sale.

- 1st Owner
- Push Start
- Dual Multi-function Steering
- Scoop Lights
- Auto Retract Mirrors
- Original Setup with Reverse Camera
- EV/Eco Modes perfectly working
- Hybrid battery replaced 6 months ago (with warranty)
- ABS replaced 1 year ago

All maintenance records available. Used strictly as a personal vehicle. Selling due to upgrade. Price is slightly negotiable after inspection. No brokers please.`,
  attributes: {
    Condition: "Used",
    Brand: "Toyota",
    Model: "Aqua",
    "Year of Manufacture": "2014",
    Mileage: "112,000 km",
    Transmission: "Automatic",
    Fuel: "Hybrid",
    "Engine capacity": "1,500 cc",
  },
  images: [
    "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
  ],
  seller: {
    name: "Kamal Perera",
    avatar: "",
    joinedDate: "Feb 2023",
    isVerified: true,
    phone: "077 123 4567"
  }
};

export default async function AdPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Here we would typically fetch the ad using the slug
  const ad = MOCK_AD;

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
              <li><Link href="/ads?category=vehicles" className="hover:text-brand-600">Vehicles</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/ads?category=vehicles&subcategory=cars" className="hover:text-brand-600">Cars</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="truncate font-medium text-foreground" aria-current="page">Toyota Aqua G Grade 2014</li>
            </ol>
          </nav>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            
            {/* Left Column (Content) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <ImageGallery images={ad.images} title={ad.title} />
              <AdDetails data={ad} />
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <SellerCard seller={ad.seller} />
              </div>
            </div>

          </div>

          <RelatedAds />
        </div>
      </main>

      {/* Sticky Mobile Contact Actions */}
      <StickyMobileContact phone={ad.seller.phone} />

      <Footer />
    </div>
  );
}
