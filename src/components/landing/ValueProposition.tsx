"use client";

import React from "react";
import { Check, Clock, Shield, Zap, MessageSquare, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface ValuePropositionProps {
  title?: string;
  subtitle?: string;
  features?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  ctaText?: string;
  onCtaClick?: () => void;
}

const ValueProposition = ({
  title = "Why Choose GTM LABS Content Portal",
  subtitle = "Streamline your social content approval process with our powerful yet simple platform",
  features = [
    {
      icon: <Check className="h-10 w-10 text-green-500" />,
      title: "Effortless Approvals",
      description:
        "One-click approval system that saves hours of back-and-forth communication",
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      title: "Time-Saving Workflows",
      description:
        "Reduce approval time by up to 75% with our streamlined content management system",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-500" />,
      title: "Multilingual Support",
      description:
        "Post daily fresh content in multiple languages to reach local non-English speakers",
    },
    {
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: "Stories & Timeline Posts",
      description:
        "Stay top of mind with your audience by posting to timeline feeds across all platforms and Instagram stories (with Facebook stories coming soon)",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-indigo-500" />,
      title: "Streamlined Feedback",
      description:
        "Comment-based feedback system allows your team & you to request specific changes to copy, design, and other elements",
    },
    {
      icon: <Lock className="h-10 w-10 text-red-500" />,
      title: "Secure Platform",
      description:
        "Enterprise-grade security ensuring your content and brand assets remain protected",
    },
  ],
  ctaText = "Let's chat!",
  onCtaClick = () =>
    window.open("https://zcal.co/jovannytovar/content", "_blank"),
}: ValuePropositionProps) => {
  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-full bg-muted">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={onCtaClick}
            className="text-base font-medium px-8 py-6 h-auto"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
