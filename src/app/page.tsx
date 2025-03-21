"use client";

import React, { useEffect, useRef } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import PortalPreview from "@/components/landing/PortalPreview";
import PlatformIntegration from "@/components/landing/PlatformIntegration";
import ValueProposition from "@/components/landing/ValueProposition";
import PortfolioGallery from "@/components/landing/PortfolioGallery";
import TestimonialCarousel from "@/components/landing/TestimonialCarousel";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const valuePropositionRef = useRef<HTMLDivElement>(null);
  const portfolioGalleryRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer to detect when ValueProposition section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && portfolioGalleryRef.current) {
          // Dispatch a custom event that PortfolioGallery can listen for
          const event = new CustomEvent("startAutoScroll");
          window.dispatchEvent(event);
        }
      },
      { threshold: 0.3 }, // Trigger when 30% of the element is visible
    );

    if (valuePropositionRef.current) {
      observer.observe(valuePropositionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Header />

      <div className="w-full">
        {/* No padding needed as hero will start right after header */}
        <HeroSection />
        <PortalPreview />
        <PlatformIntegration />
        <div ref={valuePropositionRef}>
          <ValueProposition />
        </div>
        <div ref={portfolioGalleryRef}>
          <PortfolioGallery />
        </div>
        <TestimonialCarousel />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
