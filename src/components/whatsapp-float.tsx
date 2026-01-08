"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function WhatsAppFloat() {
  const handleClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT || "967779758040";
    const message = "مرحباً! لدي سؤال عن منصة Chanly";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="whatsapp-float"
          onClick={handleClick}
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>تواصل معنا عبر واتساب</p>
      </TooltipContent>
    </Tooltip>
  );
}