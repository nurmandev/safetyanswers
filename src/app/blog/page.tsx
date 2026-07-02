import { BlogHero } from "@/components/blog/BlogHero";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogWhyRead } from "@/components/blog/BlogWhyRead";
import { BlogFAQ } from "@/components/blog/BlogFAQ";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTASection } from "@/components/home/CTASection";

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogContent />
      <BlogWhyRead />
      <NewsletterSection />
      <BlogFAQ />
      <CTASection />
    </>
  );
}
