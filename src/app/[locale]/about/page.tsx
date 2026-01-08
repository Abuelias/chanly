import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Shield, Brain, Search, BarChart3, Zap, Users, Heart } from "lucide-react";

interface AboutPageProps {
  params: { locale: string };
}

export default function AboutPage({ params }: AboutPageProps) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("about");

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
  ];

  return (
    <div className="container px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t("title")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">مهمتنا</h2>
            <p className="text-muted-foreground mb-4">
              نسعى لبناء أكبر منصة عربية لاكتشاف قنوات واتساب، حيث نربط بين أصحاب 
              المحتوى والجمهور المستهدف بشكل ذكي وفعال.
            </p>
            <p className="text-muted-foreground">
              من خلال تقنيات الذكاء الاصطناعي والفحص المستمر، نضمن تجربة ممتازة 
              لجميع المستخدمين مع ضمان جودة المحتوى وفعالية الروابط.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full">
              <Heart className="h-32 w-32 text-primary" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">{t("features.title")}</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Values Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">قيمنا</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">المستخدم أولاً</h3>
              <p className="text-muted-foreground">
                نضع احتياجات المستخدمين في صميم كل ما نقوم به
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">الجودة والدقة</h3>
              <p className="text-muted-foreground">
                نلتزم بأعلى معايير الجودة في كل جانب من جوانب المنصة
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">الشفافية</h3>
              <p className="text-muted-foreground">
                نعمل بشفافية تامة مع مستخدمينا وشركائنا
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">انضم إلى مجتمع Chanly</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            سواء كنت تبحث عن قنوات ممتعة أو تريد الترويج لقناتك، Chanly هو المكان المناسب لك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              اكتشف القنوات
            </button>
            <button className="px-8 py-3 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
              أضف قناتك
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-static";