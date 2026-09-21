import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import PopularCategories from "@/components/home/PopularCategories";
import FeaturedAds from "@/components/home/FeaturedAds";
import LatestAds from "@/components/home/LatestAds";
import LocationBrowser from "@/components/home/LocationBrowser";
import HowItWorks from "@/components/home/HowItWorks";
import SellCTA from "@/components/home/SellCTA";
import TrustSafety from "@/components/home/TrustSafety";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PopularCategories />
        <FeaturedAds />
        <LatestAds />
        <LocationBrowser />
        <HowItWorks />
        <SellCTA />
        <TrustSafety />
      </main>
      <Footer />
    </>
  );
}
