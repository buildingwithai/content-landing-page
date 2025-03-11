import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

interface HeaderProps {
  logoUrl?: string;
  mainSiteUrl?: string;
}

const Header = ({
  logoUrl = "/logo.svg",
  mainSiteUrl = "https://www.gtmlabs.com",
}: HeaderProps) => {
  return (
    <header className="fixed w-full bg-black/90 backdrop-blur-sm z-50 border-b border-zinc-800 h-16">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href={mainSiteUrl} className="flex items-center">
          <div className="flex items-center space-x-2">
            {/* Text Logo */}
            <span className="font-['Futura'] text-white text-xl font-bold tracking-wider">
              GTM LABS
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-white hover:text-blue-300 hover:bg-transparent hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          >
            <Link href="#contact">Contact</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          >
            <Link href="https://zcal.co/jovannytovar/content">Let's chat!</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
