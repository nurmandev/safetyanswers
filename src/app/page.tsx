import { HeroSection } from "@/components/home/HeroSection";

import { Statistics } from "@/components/home/Statistics";

import { AcademicServices, ProfessionalWritingServices, HealthSafetyServices } from "@/components/home/ServiceDetailCards";
import { HowItWorks } from "@/components/home/HowItWorks";


import { FAQ } from "@/components/home/FAQ";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground">
      <HeroSection />
      <Statistics />
      <AcademicServices />
      <ProfessionalWritingServices />
      <HealthSafetyServices />
      <HowItWorks />

      <FAQ />
      <CTASection />
      <NewsletterSection />
    </main>
  );
}
