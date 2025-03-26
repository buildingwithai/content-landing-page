"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const FinalCTA = ({
  title = "Ready to streamline your content approval process?",
  description = "Join the companies and brands who have simplified their social media workflow with our Content Portal.",
  buttonText = "Let's chat!",
  onButtonClick = () =>
    window.open("https://zcal.co/jovannytovar/content", "_blank"),
}: FinalCTAProps) => {
  return (
    <section className="w-full bg-slate-900 py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-lg text-slate-300 mb-10 max-w-3xl mx-auto">
          {description}
        </p>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-8 py-6 h-auto rounded-lg transition-all duration-300 transform hover:scale-105"
          onClick={onButtonClick}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>72 hour turn around time</span>
          </div>
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Unlimited revisions</span>
          </div>
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Pause or cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
