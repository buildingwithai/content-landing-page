"use client";

import React from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import PortalPreview from "@/components/landing/PortalPreview";
import PlatformIntegration from "@/components/landing/PlatformIntegration";
import ValueProposition from "@/components/landing/ValueProposition";
import TestimonialCarousel from "@/components/landing/TestimonialCarousel";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />

      <div className="w-full">
        {/* No padding needed as hero will start right after header */}
        <HeroSection />
        <PortalPreview />
        <PlatformIntegration />
        <ValueProposition />
        <TestimonialCarousel />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
