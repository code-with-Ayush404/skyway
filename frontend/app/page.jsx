import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import TourPreview from "@/components/home/TourPreview";
import TaxiTeaser from "@/components/home/TaxiTeaser";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import Partners from "@/components/home/Partners";
import { getPackages, getTestimonials } from "@/lib/dataService";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const packages = await getPackages();
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Stats />
      <TourPreview packages={packages} />
      <TaxiTeaser />
      <WhyChoose />
      <Testimonials testimonials={testimonials} />
      <Partners />
    </div>
  );
}
