import { BlogContent } from "@/components/blog/BlogContent";
import { BlogWhyRead } from "@/components/blog/BlogWhyRead";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTASection } from "@/components/home/CTASection";

export default function BlogPage() {
  return (
    <>
      <BlogContent />
      <BlogWhyRead />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
