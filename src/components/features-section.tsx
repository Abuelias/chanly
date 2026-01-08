import { useTranslations } from "next-intl";
import { Shield, Brain, Search, BarChart3, Zap, Users } from "lucide-react";

export function FeaturesSection() {
  const t = useTranslations("about.features");

  const features = [
    {
      icon: Shield,
      title: "روابط فعالة 100%",
      description: "نظام فحص ذكي يضمن صلاحية جميع الروابط باستمرار",
    },
    {
      icon: Brain,
      title: "توصيات ذكية بالذكاء الاصطناعي",
      description: "احصل على قنوات مقترحة بناءً على اهتماماتك وتفاعلاتك",
    },
    {
      icon: Search,
      title: "بحث فوري سريع",
      description: "ابحث عن القنوات بسرعة وسهولة مع نتائج فورية",
    },
    {
      icon: BarChart3,
      title: "تحليلات تفصيلية",
      description: "معلومات وإحصائيات شاملة عن أداء قناتك",
    },
    {
      icon: Zap,
      title: "نظام توثيق متقدم",
      description: "وثق قناتك بسهولة واحصل على ميزات حصرية",
    },
    {
      icon: Users,
      title: "مجتمع نشط",
      description: "انضم إلى آلاف المستخدمين النشطين واصحاب القنوات",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            لماذا تختار Chanly؟
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            منصة متكاملة لاكتشاف قنوات واتساب مع أحدث التقنيات وأفضل تجربة مستخدم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}