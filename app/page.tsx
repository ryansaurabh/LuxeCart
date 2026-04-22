import Hero from "@/components/Hero";
import BestsellersRow from "@/components/BestsellersRow";
import CategoryGrid from "@/components/CategoryGrid";
import ValueStrip from "@/components/ValueStrip";
import NewsletterSection from "@/components/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestsellersRow />
      <CategoryGrid />
      <ValueStrip />
      <section
        id="about"
        className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8"
      >
        <h2 className="section-title">Crafted with intention</h2>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          LuxeCart began with a simple idea: luxury skincare shouldn&apos;t
          require compromise. Every formula is clean, clinically backed, and
          made to feel as beautiful as it works.
        </p>
      </section>
      <NewsletterSection />
    </>
  );
}
