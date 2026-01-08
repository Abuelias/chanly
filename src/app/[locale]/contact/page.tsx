"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ContactPageProps {
  params: { locale: string };
}

export default function ContactPage({ params }: ContactPageProps) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("contact");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "تم الإرسال بنجاح!",
        description: t("success"),
        duration: 5000,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      content: "support@chanly.com",
      href: "mailto:support@chanly.com",
    },
    {
      icon: Phone,
      title: "الواتساب",
      content: "+967 779 758 040",
      href: "https://wa.me/967779758040",
    },
    {
      icon: MapPin,
      title: "الموقع",
      content: "اليمن - صنعاء",
      href: "#",
    },
  ];

  return (
    <div className="container px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t("title")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("info")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="اسمك الكامل"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="بريدك الإلكتروني"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("subject")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="موضوع الرسالة"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="اكتب رسالتك هنا..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent ml-2" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 ml-2" />
                        {t("send")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>
            
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <a
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={info.href.startsWith("http") ? "_blank" : "_self"}
                            rel={info.href.startsWith("http") ? "noopener noreferrer" : ""}
                          >
                            {info.content}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">أسئلة شائعة</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">كيف يمكنني إضافة قناتي؟</h4>
                  <p className="text-sm text-muted-foreground">
                    يمكنك إضافة قناتك من خلال لوحة التحكم بعد التسجيل في المنصة.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">هل المنصة مجانية؟</h4>
                  <p className="text-sm text-muted-foreground">
                    نعم، جميع الميزات الأساسية مجانية تماماً للمستخدمين وأصحاب القنوات.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">كيف يتم التحقق من القنوات؟</h4>
                  <p className="text-sm text-muted-foreground">
                    لدينا نظام فحص ذكي يتحقق من صلاحية الروابط بشكل دوري ويحدث الحالة تلقائياً.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}