"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, AlertCircle, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { generateVerificationCode } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  description: string;
}

interface ClaimChannelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channel: Channel;
}

export function ClaimChannelModal({
  open,
  onOpenChange,
  channel,
}: ClaimChannelModalProps) {
  const t = useTranslations();
  const [step, setStep] = useState<"initial" | "verification" | "success" | "error">("initial");
  const [verificationCode, setVerificationCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClaim = () => {
    setStep("verification");
    setVerificationCode(generateVerificationCode(8));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Simulate success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setStep("success");
      } else {
        setStep("error");
      }
    } catch (error) {
      setStep("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation
    setTimeout(() => {
      setStep("initial");
      setVerificationCode("");
      setCopied(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "initial" && (
          <>
            <DialogHeader>
              <DialogTitle>{t("claim.modalTitle")}</DialogTitle>
              <DialogDescription>{t("claim.modalBody")}</DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">{channel.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {channel.description}
                </p>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  ستحتاج إلى وصول إلى إعدادات قناتك لوضع كود التحقق
                </AlertDescription>
              </Alert>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                إلغاء
              </Button>
              <Button onClick={handleClaim}>
                {t("claim.claimButton")}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "verification" && (
          <>
            <DialogHeader>
              <DialogTitle>{t("claim.verificationTitle")}</DialogTitle>
              <DialogDescription>
                {t("claim.verificationInstructions")}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {t("claim.verificationCode")}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyCode}
                    className="h-8"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="text-lg font-mono px-4 py-2 bg-white dark:bg-gray-800"
                  >
                    {verificationCode}
                  </Badge>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p>📋 انسخ الكود أعلاه</p>
                <p>📱 اذهب إلى وصف قناتك على واتساب</p>
                <p>📝 أضف الكود إلى الوصف</p>
                <p>⏳ انتظر 5 دقائق ثم اضغط تحقق</p>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  يمكنك إزالة الكود من الوصف بعد اكتمال التحقق
                </AlertDescription>
              </Alert>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                إلغاء
              </Button>
              <Button onClick={handleVerify} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    جاري التحقق...
                  </>
                ) : (
                  t("claim.verifyButton")
                )}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-green-600">
                {t("claim.successTitle")}
              </DialogTitle>
              <DialogDescription>
                {t("claim.successMessage")}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="space-y-2 text-sm">
                <p className="font-medium">ماذا يحدث الآن؟</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>✅ أصبحت المالك الرسمي للقناة</li>
                  <li>📊 يمكنك الآن مشاهدة تحليلات القناة</li>
                  <li>🎛️ يمكنك تعديل معلومات القناة</li>
                  <li>📈 ستحصل على ميزات نمو حصرية</li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                الذهاب إلى لوحة التحكم
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "error" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-red-600">
                {t("claim.errorTitle")}
              </DialogTitle>
              <DialogDescription>
                {t("claim.errorMessage")}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  تأكد من أنك أضفت الكود بالضبط كما هو موضح أعلاه في وصف القناة، 
                  وانتظرت 5 دقائق قبل محاولة التحقق.
                </AlertDescription>
              </Alert>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">نصائح للحصول على أفضل نتيجة:</p>
                <ul className="space-y-1">
                  <li>• تأكد من كتابة الكود بالضبط بدون تعديل</li>
                  <li>• أضف الكود في وصف القناة وليس في منشور</li>
                  <li>• انتظر 5 دقائق كاملة قبل التحقق</li>
                  <li>• تأكد من أن القناة عامة وليست خاصة</li>
                </ul>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleClose}>
                إلغاء
              </Button>
              <Button onClick={handleClaim}>
                إعادة المحاولة
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}