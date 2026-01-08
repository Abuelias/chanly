import { Suspense } from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { FeaturedChannels } from "@/components/featured-channels";

interface ChannelsPageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ChannelsPage({ params, searchParams }: ChannelsPageProps) {
  unstable_setRequestLocale(params.locale);

  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  const category = typeof searchParams.category === "string" ? searchParams.category : "";

  return (
    <div className="container px-4 py-8">
      <FeaturedChannels 
        initialQuery={query} 
        initialCategory={category} 
      />
    </div>
  );
}

export const dynamic = "force-static";
export const revalidate = 60;