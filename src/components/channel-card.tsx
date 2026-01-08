"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Check, Users, ExternalLink, Share2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ClaimChannelModal } from "@/components/claim-channel-modal";
import { generatePlaceholderImage, formatNumber } from "@/lib/utils";

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

interface ChannelCardProps {
  channel: Channel;
  viewMode: "grid" | "list";
}

export function ChannelCard({ channel, viewMode }: ChannelCardProps) {
  const t = useTranslations();
  const router = useRouter();
  const [showClaimModal, setShowClaimModal] = useState(false);

  const handleJoinChannel = () => {
    // Track click analytics
    console.log("Channel clicked:", channel.id);
    
    // In real implementation, this would open WhatsApp
    const whatsappUrl = `https://wa.me/join/${channel.id}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: channel.name,
        text: channel.description,
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const isBroken = channel.healthStatus === "broken";

  if (viewMode === "list") {
    return (
      <Card className={cn(
        "channel-card cursor-pointer",
        isBroken && "opacity-75 border-red-200 dark:border-red-800"
      )}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarImage src={channel.avatarUrl} alt={channel.name} />
              <AvatarFallback 
                style={{ backgroundColor: channel.category.color }}
                className="text-white font-bold text-lg"
              >
                {channel.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold truncate">{channel.name}</h3>
                {channel.isVerified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Check className="h-3 w-3 mr-1" />
                    {t("channels.verified")}
                  </Badge>
                )}
                {isBroken && (
                  <Badge variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {t("channels.brokenLink")}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {channel.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge 
                  variant="outline" 
                  style={{ 
                    borderColor: channel.category.color,
                    color: channel.category.color 
                  }}
                >
                  {channel.category.nameAr}
                </Badge>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {formatNumber(channel.memberCount)} {t("channels.members")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button 
                size="sm" 
                onClick={handleJoinChannel}
                disabled={isBroken}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t("channels.joinChannel")}
              </Button>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowClaimModal(true)}
                >
                  {t("channels.claim")}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        
        {isBroken && (
          <CardFooter className="bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-sm text-red-700 dark:text-red-300">
              {t("errors.brokenLink")}
            </p>
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <>
      <Card className={cn(
        "channel-card cursor-pointer h-full",
        isBroken && "opacity-75 border-red-200 dark:border-red-800"
      )}>
        <CardHeader className="p-0">
          {/* Channel Avatar */}
          <div className="relative">
            <Avatar className="h-32 w-32 mx-auto mt-6">
              <AvatarImage src={channel.avatarUrl} alt={channel.name} />
              <AvatarFallback 
                style={{ backgroundColor: channel.category.color }}
                className="text-white font-bold text-2xl"
              >
                {channel.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {/* Verification Badge */}
            {channel.isVerified && (
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
            
            {/* Broken Link Badge */}
            {isBroken && (
              <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                <AlertTriangle className="h-4 w-4" />
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="text-center flex-1">
          <h3 className="text-xl font-semibold mb-2">{channel.name}</h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {channel.description}
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge 
              variant="outline" 
              style={{ 
                borderColor: channel.category.color,
                color: channel.category.color 
              }}
            >
              {channel.category.nameAr}
            </Badge>
            
            <span className="text-sm text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {formatNumber(channel.memberCount)}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 p-6">
          <Button 
            className="w-full" 
            onClick={handleJoinChannel}
            disabled={isBroken}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {t("channels.joinChannel")}
          </Button>
          
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              {t("channels.share")}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowClaimModal(true)}
            >
              {t("channels.claim")}
            </Button>
          </div>
        </CardFooter>
        
        {isBroken && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 m-6 mt-0 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              {t("errors.brokenLink")}
            </p>
          </div>
        )}
      </Card>

      {/* Claim Channel Modal */}
      <ClaimChannelModal
        open={showClaimModal}
        onOpenChange={setShowClaimModal}
        channel={channel}
      />
    </>
  );
}