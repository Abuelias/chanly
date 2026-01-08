"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, Filter, Grid, List } from "lucide-react";

import { ChannelCard } from "@/components/channel-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  memberCount: number;
  isVerified: boolean;
  healthStatus: string;
  category: {
    nameAr: string;
    nameEn: string;
    color: string;
  };
}

interface FeaturedChannelsProps {
  initialQuery?: string;
  initialCategory?: string;
}

export function FeaturedChannels({ initialQuery = "", initialCategory = "" }: FeaturedChannelsProps) {
  const t = useTranslations();
  const router = useRouter();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchChannels();
  }, [searchQuery, selectedCategory]);

  const fetchChannels = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with real API
      const mockChannels: Channel[] = [
        {
          id: "1",
          name: "وظائف اليمن",
          description: "أحدث الوظائف الشاغرة في اليمن لجميع التخصصات",
          avatarUrl: "",
          memberCount: 15200,
          isVerified: true,
          healthStatus: "healthy",
          category: {
            nameAr: "وظائف",
            nameEn: "Jobs",
            color: "#10B981",
          },
        },
        {
          id: "2",
          name: "Crypto Yemen",
          description: "تعلم كل شيء عن العملات الرقمية والتداول",
          avatarUrl: "",
          memberCount: 8900,
          isVerified: true,
          healthStatus: "healthy",
          category: {
            nameAr: "عملات رقمية",
            nameEn: "Cryptocurrency",
            color: "#F59E0B",
          },
        },
        {
          id: "3",
          name: "رياضة اليمن",
          description: "أخبار الرياضة اليمنية والعالمية",
          avatarUrl: "",
          memberCount: 12300,
          isVerified: false,
          healthStatus: "healthy",
          category: {
            nameAr: "رياضة",
            nameEn: "Sports",
            color: "#EF4444",
          },
        },
        {
          id: "4",
          name: "تعلم البرمجة",
          description: "دورات مجانية في البرمجة والتطوير",
          avatarUrl: "",
          memberCount: 5600,
          isVerified: true,
          healthStatus: "healthy",
          category: {
            nameAr: "تعليم",
            nameEn: "Education",
            color: "#3B82F6",
          },
        },
        {
          id: "5",
          name: "تقنية المعلومات",
          description: "أحدث أخبار التقنية والبرمجة",
          avatarUrl: "",
          memberCount: 7800,
          isVerified: false,
          healthStatus: "healthy",
          category: {
            nameAr: "تقنية",
            nameEn: "Technology",
            color: "#8B5CF6",
          },
        },
        {
          id: "6",
          name: "صحتك أولاً",
          description: "نصائح طبية وصحية يومية",
          avatarUrl: "",
          memberCount: 9200,
          isVerified: true,
          healthStatus: "healthy",
          category: {
            nameAr: "صحة",
            nameEn: "Health",
            color: "#EC4899",
          },
        },
      ];

      // Filter channels based on search and category
      let filteredChannels = mockChannels;
      
      if (searchQuery) {
        filteredChannels = filteredChannels.filter(
          (channel) =>
            channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            channel.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filteredChannels = filteredChannels.filter(
          (channel) =>
            channel.category.nameAr === selectedCategory ||
            channel.category.nameEn === selectedCategory
        );
      }

      setChannels(filteredChannels);
    } catch (error) {
      console.error("Failed to fetch channels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    router.push(`/?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("channels.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            اكتشف أفضل القنوات في مختلف المجالات مع ضمان روابط فعالة 100%
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                t("hero.searchButton")
              )}
            </Button>
          </form>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-muted-foreground">
                {t("channels.categories")}:
              </span>
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("")}
              >
                {t("channels.allCategories")}
              </Button>
              {["وظائف", "عملات رقمية", "رياضة", "تعليم"].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Channels Grid/List */}
        {loading ? (
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
          )}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className={cn(
                viewMode === "grid" ? "h-80" : "h-32",
                "rounded-lg"
              )} />
            ))}
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("channels.noChannels")}</h3>
            <p className="text-muted-foreground">
              لم نجد قنوات مطابقة لبحثك. جرب استخدام كلمات مفتاحية مختلفة.
            </p>
          </div>
        ) : (
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
          )}>
            {channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}