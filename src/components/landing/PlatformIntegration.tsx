import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Lock,
  Twitter,
  Youtube,
} from "lucide-react";

interface PlatformButtonProps {
  icon: React.ReactNode;
  name: string;
  connected?: boolean;
}

const PlatformButton = ({
  icon,
  name,
  connected = false,
}: PlatformButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "relative flex items-center gap-3 rounded-xl border-2 p-6 transition-all hover:scale-105",
              connected ? "border-green-500 bg-green-50/10" : "border-gray-200",
            )}
          >
            <div className="text-2xl">{icon}</div>
            <span className="text-base font-medium">{name}</span>
            {connected && (
              <div className="absolute -right-2 -top-2 rounded-full bg-green-500 p-1 text-white">
                <Check size={14} />
              </div>
            )}
            <div className="absolute bottom-2 right-2 text-gray-400">
              <Lock size={14} />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {connected ? `${name} connected and secure` : `Connect to ${name}`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface PlatformIntegrationProps {
  title?: string;
  subtitle?: string;
  platforms?: Array<{
    name: string;
    icon: React.ReactNode;
    connected: boolean;
  }>;
}

const PlatformIntegration = ({
  title = "Seamless Platform Integration",
  subtitle = "Connect your social accounts securely for streamlined content approval",
  platforms = [
    { name: "Instagram", icon: <Instagram />, connected: true },
    { name: "Facebook", icon: <Facebook />, connected: true },
    { name: "Twitter", icon: <Twitter />, connected: false },
    { name: "LinkedIn", icon: <Linkedin />, connected: true },
    { name: "YouTube", icon: <Youtube />, connected: false },
  ],
}: PlatformIntegrationProps) => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {platforms.map((platform, index) => (
            <PlatformButton
              key={index}
              icon={platform.icon}
              name={platform.name}
              connected={platform.connected}
            />
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            All connections are secured with end-to-end encryption and comply
            with platform API policies. Your data remains private and secure.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformIntegration;
