import { unstable_setRequestLocale } from "next-intl/server";
import { CategoriesSection } from "@/components/categories-section";

interface CategoriesPageProps {
  params: { locale: string };
}

export default function CategoriesPage({ params }: CategoriesPageProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <div className="container px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">جميع التصنيفات</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          اكتشف قنوات واتساب في مختلف المجالات والتصنيفات
        </p>
      </div>
      
      <CategoriesSection />
    </div>
  );
}

export const dynamic = "force-static";