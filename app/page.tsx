import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { MethodCarousel } from "@/components/method-carousel";
import { WhyItWorks } from "@/components/why-it-works";
import { Espaco } from "@/components/espaco";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCta } from "@/components/floating-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Intro />
        <MethodCarousel />
        <WhyItWorks />
        <Espaco />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingCta />
    </>
  );
}
