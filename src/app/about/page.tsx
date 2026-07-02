import { AboutHero } from "@/components/about/AboutHero";
import { CompanyIntro } from "@/components/about/CompanyIntro";
import { OurStory } from "@/components/about/OurStory";
import { MissionVision } from "@/components/about/MissionVision";
import { WhatWeOffer } from "@/components/about/WhatWeOffer";
import { AboutWhyUs } from "@/components/about/AboutWhyUs";
import { Achievements } from "@/components/about/Achievements";
import { WorkProcess } from "@/components/about/WorkProcess";
import { Team } from "@/components/about/Team";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { Certifications } from "@/components/about/Certifications";
import { AboutFAQ } from "@/components/about/AboutFAQ";
import { CTASection } from "@/components/home/CTASection";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyIntro />
      <OurStory />
      <MissionVision />
      <WhatWeOffer />
      <AboutWhyUs />
      <Achievements />
      <WorkProcess />
      <Team />
      <AboutTestimonials />
      <Certifications />
      <AboutFAQ />
      <CTASection />
    </>
  );
}
