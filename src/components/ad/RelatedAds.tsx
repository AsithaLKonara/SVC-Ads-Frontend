import React from "react";
import AdCard from "@/components/ui/AdCard";
import Link from "next/link";

export default function RelatedAds() {
  // Mock data to visualize the related ads section
  const mockAds = [
    {
      id: "r1",
      title: "Honda Vezel Z Sensing 2018",
      price: "12,500,000",
      location: "Colombo",
      postedTime: "2 hours ago",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "r2",
      title: "Toyota Prius S Touring 2016",
      price: "9,800,000",
      location: "Kandy",
      postedTime: "5 hours ago",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "r3",
      title: "Nissan Leaf G Grade 2014",
      price: "3,500,000",
      location: "Gampaha",
      postedTime: "1 day ago",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "r4",
      title: "Suzuki Swift RS 2017",
      price: "6,200,000",
      location: "Kurunegala",
      postedTime: "2 days ago",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div className="mt-16 border-t border-border/50 pt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">Similar Listings</h2>
        <Link href="/ads?category=vehicles" className="text-sm font-semibold text-brand-600 hover:underline">
          View more in Vehicles
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockAds.map((ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </div>
  );
}
