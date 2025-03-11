import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ExternalLink, Github, Linkedin, Twitter } from "lucide-react";

interface FooterProps {
  companyName?: string;
  year?: number;
  links?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  socialLinks?: Array<{
    platform: "twitter" | "linkedin" | "github";
    href: string;
  }>;
}

const Footer = ({
  companyName = "GTM LABS",
  year = new Date().getFullYear(),
  links = [
    {
      label: "Privacy Policy",
      href: "https://www.gtmlabs.io/privacy-policy",
      external: true,
    },
    {
      label: "Terms of Service",
      href: "https://www.gtmlabs.io/terms-of-service",
      external: true,
    },
  ],
  socialLinks = [
    { platform: "twitter", href: "https://x.com/GTMjo_" },
    { platform: "linkedin", href: "https://www.linkedin.com/company/gtm-labs" },
  ],
}: FooterProps) => {
  const socialIcons = {
    twitter: <Twitter className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    github: <Github className="h-4 w-4" />,
  };

  return (
    <footer className="w-full bg-background border-t border-border py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Link href="/" className="font-semibold text-foreground">
              {companyName}
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {links.map((link, index) => (
              <div key={index} className="text-sm text-muted-foreground">
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                asChild
                className="h-8 w-8 rounded-full"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.platform} link`}
                >
                  {socialIcons[social.platform]}
                </a>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="text-xs text-center text-muted-foreground">
          &copy; {year} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
