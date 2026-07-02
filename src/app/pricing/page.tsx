import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingTables } from "@/components/pricing/PricingTables";
import { PricingExtras } from "@/components/pricing/PricingExtras";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { CTASection } from "@/components/home/CTASection";

export default function PricingPage() {
  return (
    <>
      <PricingPlans />
      <PricingTables />
      <PricingExtras />
      <PricingFAQ />
      <CTASection />
    </>
  );
}
