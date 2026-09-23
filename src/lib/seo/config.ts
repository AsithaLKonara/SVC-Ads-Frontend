export const siteConfig = {
  name: "LAKLAND REALITY",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  description: "Commercially Valuable Lands and Properties in Sri Lanka. Invest Today. Build Tomorrow.",
  locale: "en_LK",

  twitter: "@laklandreality",

  organization: {
    name: "LAKLAND REALITY",
    legalName: "LAKLAND REALITY (Pvt) Ltd",
    logo: "/logo.JPG" // Relative to public folder
  },

  social: [
    "https://facebook.com/laklandreality",
    "https://instagram.com/laklandreality"
  ],
  
  defaultImage: "/logo.JPG",
  
  keywords: [
    "Sri Lanka Lands",
    "Sri Lanka Properties",
    "Commercial Lands Sri Lanka",
    "Real Estate Sri Lanka",
    "Buy Land Sri Lanka"
  ]
};
