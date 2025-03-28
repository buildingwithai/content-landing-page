"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  MessageCircle,
  CheckCircle,
  RefreshCw,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface TeamCollaborationProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

// Animation for workflow steps
const WorkflowAnimation = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (step: number) => void;
}) => {
  useEffect(() => {
    // Cycle through steps every 3 seconds
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [setActiveStep]);

  return (
    <div className="hidden md:flex items-center justify-center mt-8 mb-12">
      <Button
        variant="outline"
        className={cn(
          "mr-2 transition-all duration-300",
          activeStep === 1 && "bg-blue-100 border-blue-500",
        )}
        onClick={() => setActiveStep(1)}
      >
        Step 1
        {activeStep === 1 && (
          <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
        )}
      </Button>
      <Button
        variant="outline"
        className={cn(
          "mr-2 transition-all duration-300",
          activeStep === 2 && "bg-blue-100 border-blue-500",
        )}
        onClick={() => setActiveStep(2)}
      >
        Step 2
        {activeStep === 2 && (
          <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
        )}
      </Button>
      <Button
        variant="outline"
        className={cn(
          "mr-2 transition-all duration-300",
          activeStep === 3 && "bg-blue-100 border-blue-500",
        )}
        onClick={() => setActiveStep(3)}
      >
        Step 3
        {activeStep === 3 && (
          <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
        )}
      </Button>
      <Button
        variant="outline"
        className={cn(
          "transition-all duration-300",
          activeStep === 4 && "bg-blue-100 border-blue-500",
        )}
        onClick={() => setActiveStep(4)}
      >
        Step 4
        {activeStep === 4 && (
          <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
        )}
      </Button>
    </div>
  );
};

const TeamCollaboration = ({
  title = "Streamlined Team Collaboration",
  subtitle = "Simplify your content approval process with our intuitive team workflow",
  ctaText = "Let's chat!",
  onCtaClick = () =>
    window.open("https://zcal.co/jovannytovar/content", "_blank"),
}: TeamCollaborationProps) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <WorkflowAnimation
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />

        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Step 1 */}
            <div
              className="flex flex-col items-center text-center workflow-step"
              data-step="1"
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-md transition-all duration-300 step-icon",
                  activeStep === 1
                    ? "bg-blue-300 scale-110"
                    : "bg-blue-100 hover:scale-110 hover:bg-blue-200",
                )}
              >
                <Users
                  className={cn(
                    "h-8 w-8",
                    activeStep === 1 ? "text-blue-800" : "text-blue-600",
                  )}
                />
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-0 step-number">
                  Step 1
                </div>
                <h3 className="text-lg font-semibold mb-2">Team Access</h3>
              </div>
              <p className="text-sm text-gray-600">
                Add unlimited team members to review and approve content with no
                additional cost
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="flex flex-col items-center text-center workflow-step"
              data-step="2"
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-md transition-all duration-300 step-icon",
                  activeStep === 2
                    ? "bg-blue-300 scale-110"
                    : "bg-blue-100 hover:scale-110 hover:bg-blue-200",
                )}
              >
                <MessageCircle
                  className={cn(
                    "h-8 w-8",
                    activeStep === 2 ? "text-blue-800" : "text-blue-600",
                  )}
                />
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-0 step-number">
                  Step 2
                </div>
                <h3 className="text-lg font-semibold mb-2">Simple Feedback</h3>
              </div>
              <p className="text-sm text-gray-600">
                Comment directly on content to request specific changes to copy,
                design, or other elements
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="flex flex-col items-center text-center workflow-step"
              data-step="3"
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-md transition-all duration-300 step-icon",
                  activeStep === 3
                    ? "bg-blue-300 scale-110"
                    : "bg-blue-100 hover:scale-110 hover:bg-blue-200",
                )}
              >
                <RefreshCw
                  className={cn(
                    "h-8 w-8",
                    activeStep === 3 ? "text-blue-800" : "text-blue-600",
                  )}
                />
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-0 step-number">
                  Step 3
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Unlimited Revisions
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Request as many changes as needed until your content is perfect
                with no additional cost
              </p>
            </div>

            {/* Step 4 */}
            <div
              className="flex flex-col items-center text-center workflow-step"
              data-step="4"
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-md transition-all duration-300 step-icon",
                  activeStep === 4
                    ? "bg-blue-300 scale-110"
                    : "bg-blue-100 hover:scale-110 hover:bg-blue-200",
                )}
              >
                <CheckCircle
                  className={cn(
                    "h-8 w-8",
                    activeStep === 4 ? "text-blue-800" : "text-blue-600",
                  )}
                />
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-0 step-number">
                  Step 4
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Automated Scheduling
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                One-click approval automatically queues content for posting
                based on your preferred schedule
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Why Teams Love Our Process
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Hands-off content management - just approve and we handle
                    the rest
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Unlimited team members can access and approve content
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Unlimited revisions until your content is perfect
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Customizable posting schedule based on your preferred times
                  </span>
                </li>
              </ul>
              <Button
                onClick={onCtaClick}
                className="mt-6 bg-blue-600 hover:bg-blue-700"
              >
                {ctaText}
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                alt="Team collaboration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCollaboration;
