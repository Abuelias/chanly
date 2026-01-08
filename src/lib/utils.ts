import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { arSA, enUS } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: string = "ar") {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const dateLocale = locale === "ar" ? arSA : enUS;
  
  return format(dateObj, "dd MMMM yyyy", { locale: dateLocale });
}

export function formatRelativeTime(date: Date | string, locale: string = "ar") {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const dateLocale = locale === "ar" ? arSA : enUS;
  
  return formatDistanceToNow(dateObj, { 
    addSuffix: true, 
    locale: dateLocale 
  });
}

export function generatePlaceholderImage(name: string, color: string = "#10B981") {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="${color}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            fill="white" font-size="72" font-family="Arial, sans-serif" font-weight="bold">
        ${initials}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function generateVerificationCode(length: number = 6): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function isValidWhatsAppLink(link: string): boolean {
  const pattern = /^https?:\/\/(chat\.whatsapp\.com|wa\.me|whatsapp\.com)/i;
  return pattern.test(link);
}

export function extractWhatsAppInviteCode(link: string): string | null {
  const patterns = [
    /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/,
    /wa\.me\/[+]?([0-9]+)/,
    /whatsapp\.com\/(?:invite|join)\/([a-zA-Z0-9]+)/,
  ];

  for (const pattern of patterns) {
    const match = link.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateMetadataFromChannel(channel: {
  name: string;
  description?: string;
  avatarUrl?: string;
}) {
  return {
    title: `${channel.name} - Chanly`,
    description: channel.description || `Join ${channel.name} on WhatsApp via Chanly`,
    openGraph: {
      title: channel.name,
      description: channel.description,
      images: [channel.avatarUrl || "/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: channel.name,
      description: channel.description,
      images: [channel.avatarUrl || "/og-image.png"],
    },
  };
}