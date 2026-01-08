"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Briefcase, Bitcoin, Trophy, GraduationCap, Laptop, Heart } from "lucide-react";

const categories = [
  {
    nameAr: "وظائف",
    nameEn: "Jobs",
    icon: Briefcase,
    color: "#10B981",
    count: 1250,
    description: "وظائف شاغرة وفرص عمل",
  },
  {
    nameAr: "عملات رقمية",
    nameEn: "Cryptocurrency",
    icon: Bitcoin,
    color: "#F59E0B",
    count: 890,
    description: "تداول واستثمار العملات",
  },
  {
    nameAr: "رياضة",
    nameEn: "Sports",
    icon: Trophy,
    color: "#EF4444",
    count: 1100,
    description: "أخبار وتحليلات رياضية",
  },
  {
    nameAr: "تعليم",
    nameEn: "Education",
    icon: GraduationCap,
    color: "#3B82F6",
    count: 950,
    description: "دورات تدريبية وتعليمية",
  },
  {
    nameAr: "تقنية",
    nameEn: "Technology",
    icon: Laptop,
    color: "#8B5CF6",
    count: 780,
    description: "برمجة وتطوير تقني",
  },
  {
    nameAr: "صحة",
    nameEn: "Health",
    icon: Heart,
    color: "#EC4899",
    count: 650,
    description: "نصائح طبية وصحية",
  },
];

export function CategoriesSection() {
  const router = useRouter();
  const t = useTranslations("channels");

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("categories")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            اكتشف القنوات حسب اهتماماتك في مختلف المجالات
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.nameAr)}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg p-6 text-center hover-lift hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all duration-300"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Icon 
                    className="h-6 w-6 transition-all duration-300"
                    style={{ color: category.color }}
                  />
                </div>
                
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {category.nameAr}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {category.description}
                </p>
                
                <span className="text-sm font-medium text-primary">
                  {category.count.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}