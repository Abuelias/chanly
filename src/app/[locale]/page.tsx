import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { HeroSection } from "@/components/hero-section";
import { FeaturedChannels } from "@/components/featured-channels";
import { CategoriesSection } from "@/components/categories-section";
import { StatsSection } from "@/components/stats-section";
import { FeaturesSection } from "@/components/features-section";

interface HomePageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function HomePage({ params, searchParams }: HomePageProps) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations();

  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  const category = typeof searchParams.category === "string" ? searchParams.category : "";

  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedChannels 
        initialQuery={query} 
        initialCategory={category} 
      />
      <FeaturesSection />
    </>
  );
}

// Enable static rendering
export const dynamic = "force-static";
export const revalidate = 60; // Revalidate every minute