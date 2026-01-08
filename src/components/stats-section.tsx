import { useTranslations } from "next-intl";
import { Users, CheckCircle, TrendingUp, Zap } from "lucide-react";

export function StatsSection() {
  const t = useTranslations("dashboard.stats");

  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "مستخدم نشط",
      description: "مستخدمين يثقون بنا يومياً",
    },
    {
      icon: CheckCircle,
      value: "10K+",
      label: "قناة موثوقة",
      description: "قنوات تم التحقق منها",
    },
    {
      icon: TrendingUp,
      value: "100%",
      label: "روابط فعالة",
      description: "ضمان صلاحية الروابط",
    },
    {
      icon: Zap,
      value: "24/7",
      label: "مراقبة مستمرة",
      description: "فحص تلقائي للروابط",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}