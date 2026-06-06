import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Starline Travel - Premium Curated Travel & Booking Platform",
  description:
    "Curated tour packages, taxi/car rentals, and luxury wedding car rentals across India & Nepal.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Starline Travel - Premium Curated Travel & Booking Platform",
    description:
      "Curated tour packages, taxi/car rentals, and luxury wedding car rentals across India & Nepal.",
    type: "website",
    locale: "en_US",
    siteName: "Starline Travel",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-bg-cream text-text-dark antialiased min-h-screen flex flex-col justify-between">
        <Providers>
          <Header />
          <main className="flex-grow pt-[80px]">{children}</main>
          <Footer />
          <FloatingActions />
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
