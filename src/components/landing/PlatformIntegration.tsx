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
    {
      name: "Google Business",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#4285F4"
            stroke="none"
          />
          <path
            d="M12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.1716 8.5 10.5 9.17157 10.5 10C10.5 10.8284 11.1716 11.5 12 11.5Z"
            fill="white"
            stroke="none"
          />
          <path d="M7.5 14.5H16.5V16.5H7.5V14.5Z" fill="white" stroke="none" />
        </svg>
      ),
      connected: false,
    },
  ],
}: PlatformIntegrationProps) => {
  // Add TikTok and Pinterest to a separate array for bottom row centering
  const bottomRowPlatforms = [
    {
      name: "TikTok",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.589 6.686C19.3033 6.5306 19.0476 6.32908 18.8345 6.08834C18.3661 5.58497 18.0822 4.95833 18.035 4.294C18.0224 4.11571 18.0157 3.93756 18.015 3.759H14.1175V15.8385C14.1175 16.0669 14.0654 16.2921 13.9648 16.4955C13.8641 16.6989 13.7175 16.8751 13.5361 17.0108C13.3547 17.1465 13.1434 17.2383 12.9183 17.2793C12.6932 17.3203 12.4613 17.3094 12.2415 17.2474C12.0217 17.1854 11.8203 17.0739 11.6538 16.9211C11.4873 16.7683 11.3602 16.5783 11.2829 16.3673C11.2055 16.1562 11.1799 15.9298 11.2079 15.7067C11.2359 15.4835 11.3168 15.2695 11.4442 15.0825C11.7255 14.6909 12.1664 14.4385 12.6415 14.3885C12.8025 14.3726 12.9646 14.3726 13.1255 14.3885V10.4995C12.9613 10.4848 12.7963 10.4783 12.6315 10.4802C11.9309 10.4901 11.2413 10.6584 10.6201 10.9721C9.99889 11.2858 9.46179 11.7371 9.04777 12.2909C8.63376 12.8446 8.35319 13.4868 8.22558 14.1683C8.09797 14.8499 8.12673 15.5522 8.30963 16.2209C8.49254 16.8896 8.82451 17.5069 9.27942 18.0275C9.73433 18.5481 10.3007 18.9583 10.9358 19.2275C11.571 19.4967 12.2594 19.6178 12.9496 19.5812C13.6399 19.5447 14.3122 19.3514 14.9149 19.0155C15.5176 18.6796 16.0358 18.2098 16.4321 17.6399C16.8284 17.0699 17.0927 16.4143 17.2057 15.7249C17.3188 15.0355 17.2778 14.3295 17.0855 13.6585V9.3185C17.7443 9.7508 18.4792 10.0463 19.2479 10.1895C20.0166 10.3327 20.8045 10.3211 21.5685 10.1553V6.8295C20.8965 6.9812 20.2123 6.9195 19.589 6.686Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      ),
      connected: false,
    },
    {
      name: "Pinterest",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
            fill="#E60023"
            stroke="none"
          />
          <path
            d="M12.326 7C9.037 7 8 9.111 8 10.812C8 11.825 8.389 12.723 9.254 13.033C9.428 13.097 9.572 13.032 9.626 12.851C9.663 12.724 9.755 12.371 9.793 12.239C9.847 12.059 9.826 11.993 9.693 11.837C9.417 11.512 9.246 11.101 9.246 10.522C9.246 9.147 10.078 7.889 12.155 7.889C13.942 7.889 15.089 8.838 15.089 10.251C15.089 12.146 14.171 13.768 12.821 13.768C12.071 13.768 11.521 13.165 11.688 12.432C11.889 11.564 12.273 10.627 12.273 10.002C12.273 9.441 11.977 8.968 11.353 8.968C10.628 8.968 10.042 9.716 10.042 10.704C10.042 11.342 10.261 11.773 10.261 11.773C10.261 11.773 9.544 14.777 9.419 15.289C9.194 16.2 9.382 17.359 9.404 17.5C9.417 17.582 9.513 17.602 9.564 17.539C9.643 17.444 10.564 16.321 10.814 15.437C10.89 15.136 11.219 13.892 11.219 13.892C11.45 14.319 12.096 14.697 12.786 14.697C14.828 14.697 16.316 12.814 16.316 10.332C16.316 8.367 14.746 7 12.326 7Z"
            fill="white"
            stroke="none"
          />
        </svg>
      ),
      connected: false,
    },
  ];

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

        {/* Bottom row centered */}
        <div className="mt-6 flex justify-center gap-6">
          {bottomRowPlatforms.map((platform, index) => (
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
