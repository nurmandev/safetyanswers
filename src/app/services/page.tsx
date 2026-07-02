import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { ServiceCategories } from "@/components/services/ServiceCategories";
import { AcademicServicesGrid, ProfessionalWritingGrid, HealthSafetyGrid } from "@/components/services/ServiceCardGrid";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { WhyOurServices } from "@/components/services/WhyOurServices";
import { ServiceComparison } from "@/components/services/ServiceComparison";
import { ServicesTestimonials } from "@/components/services/ServicesTestimonials";
import { ServicesFAQ } from "@/components/services/ServicesFAQ";
import { CTASection } from "@/components/home/CTASection";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesIntro />
      <ServiceCategories />
      <AcademicServicesGrid />
      <ProfessionalWritingGrid />
      <HealthSafetyGrid />
      <ServicesProcess />
      <WhyOurServices />
      <ServiceComparison />
      <ServicesTestimonials />
      <ServicesFAQ />
      <CTASection />
    </>
  );
}
