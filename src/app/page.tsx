import { HeroSection } from "@/components/home/HeroSection";

import { Statistics } from "@/components/home/Statistics";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AcademicServices, ProfessionalWritingServices, HealthSafetyServices } from "@/components/home/ServiceDetailCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedArticles, PremiumArticles } from "@/components/home/ContentSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingSection } from "@/components/home/PricingSection";
import { FAQ } from "@/components/home/FAQ";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground">
      <HeroSection />
      <Statistics />
      <ServicesOverview />
      <AcademicServices />
      <ProfessionalWritingServices />
      <HealthSafetyServices />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedArticles />
      <PremiumArticles />
      <Testimonials />
      <PricingSection />
      <FAQ />
      <CTASection />
      <NewsletterSection />
    </main>
  );
}
