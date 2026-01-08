"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, Users, TrendingUp, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    router.push(`/?q=${encodeURIComponent(searchQuery)}`);
  };

  const popularSearches = [
    { term: "وظائف", query: "jobs" },
    { term: "عملات رقمية", query: "cryptocurrency" },
    { term: "رياضة", query: "sports" },
    { term: "تعليم", query: "education" },
    { term: "تقنية", query: "technology" },
  ];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center hero-bg">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container px-4 py-20 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">{t("hero.headline")}</span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            {t("hero.subheadline")}
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="search-input mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-6 pr-32 py-4 text-lg rounded-full border-2 border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 shadow-lg focus:border-primary focus:ring-0 
                         focus:outline-none transition-all duration-300"
                disabled={isSearching}
              />
              <Button
                type="submit"
                size="lg"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 rounded-full"
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Search className="h-4 w-4 ml-2" />
                    {t("hero.searchButton")}
                  </>
                )}
              </Button>
            </div>
          </form>
          
          {/* Popular Searches */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <span className="text-sm text-muted-foreground mr-2">
              {t("hero.popularSearches")}
            </span>
            {popularSearches.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(`/?q=${encodeURIComponent(item.query)}`)}
                className="px-3 py-1 text-sm bg-white/50 dark:bg-gray-800/50 rounded-full 
                         hover:bg-primary hover:text-white transition-all duration-200"
              >
                {item.term}
              </button>
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold gradient-text">10K+</span>
              </div>
              <p className="text-sm text-muted-foreground">قناة موثوقة</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold gradient-text">100%</span>
              </div>
              <p className="text-sm text-muted-foreground">روابط فعالة</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold gradient-text">50K+</span>
              </div>
              <p className="text-sm text-muted-foreground">مستخدم نشط</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}