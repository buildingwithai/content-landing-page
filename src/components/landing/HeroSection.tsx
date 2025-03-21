"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Zap, Clock, DollarSign } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "Tech-Enabled Social Media Marketing Without the Hefty Agency Price",
  subtitle = "We plan, design, and schedule every post. You just log in, approve, and watch your brand grow—no $2,500 retainers required.",
  ctaText = "Let's chat!",
  onCtaClick = () =>
    window.open("https://zcal.co/jovannytovar/content", "_blank"),
}: HeroSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mouse movement for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Button border animation
  useEffect(() => {
    let animationFrame: number;

    if (isAnimating) {
      const animate = () => {
        setAnimationProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            setIsAnimating(false);
            return 0;
          }
          return newProgress;
        });
        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isAnimating]);

  const comparisonData = [
    { provider: "Content Agencies", cost: 2500, savings: 2251 },
    { provider: "Freelancers", cost: 750, savings: 501 },
    { provider: "GTM LABS", cost: 249, savings: 0 },
  ];

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      text: "Faster Approvals",
    },
    { icon: <Clock className="h-8 w-8 text-blue-400" />, text: "Time Savings" },
    {
      icon: <DollarSign className="h-8 w-8 text-blue-400" />,
      text: "Cost Effective",
    },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[800px] overflow-hidden mt-16"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #1a1a2e 0%, #121212 70%)`,
        transition: "background 0.3s ease",
      }}
    >
      <div className="container mx-auto px-4 h-full py-12 md:py-24 pb-16 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 h-full items-center">
          {/* Left Column - Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-lg opacity-90 mb-8 max-w-xl">{subtitle}</p>

            <div className="space-y-6 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 group cursor-pointer transition-all duration-300"
                >
                  <div className="bg-blue-900/30 p-2 rounded-full group-hover:bg-blue-800/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {benefit.icon}
                  </div>
                  <span className="text-lg group-hover:text-blue-300 transition-all duration-300">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="relative inline-block"
              onMouseEnter={() => {
                setIsHovering(true);
                setIsAnimating(true);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
              }}
            >
              <Button
                onClick={onCtaClick}
                size="lg"
                className="relative text-base md:text-lg px-8 py-6 h-auto bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 transition-all duration-300 rounded-md z-10"
                style={{
                  boxShadow: isHovering
                    ? "0 0 10px rgba(59, 130, 246, 0.5)"
                    : "none",
                }}
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Animated border */}
              <div
                className="absolute inset-0 rounded-md border-2 border-blue-500 pointer-events-none"
                style={{
                  clipPath: isAnimating
                    ? `polygon(0 0, ${animationProgress}% 0, ${animationProgress > 50 ? animationProgress : 0}% 100%, 0 100%)`
                    : isHovering
                      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                      : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  opacity: isHovering ? 1 : 0.7,
                  transition: "opacity 0.3s ease",
                }}
              ></div>
            </div>
          </div>

          {/* Right Column - Cost Calculator */}
          <div className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 text-white relative overflow-hidden group transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-8 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/0 to-blue-900/0 group-hover:from-blue-900/10 group-hover:via-blue-900/5 group-hover:to-blue-900/10 transition-all duration-1000"></div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">
              On Average Clients Save With Us
            </h3>

            <div className="space-y-6">
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 md:p-4 rounded-lg ${item.provider === "GTM LABS" ? "bg-blue-900/30 border border-blue-500" : "bg-gray-800/50"}`}
                >
                  <div>
                    <h4 className="font-medium">{item.provider}</h4>
                    <p className="text-sm text-gray-400"></p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">${item.cost}</div>
                    {item.savings > 0 && (
                      <div className="text-green-400 text-sm">
                        Save ${item.savings}/mo
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg">Annual Savings:</span>
                <span className="text-2xl font-bold text-green-400">
                  $28,812
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Compared to content agencies (based on annual subscription)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
