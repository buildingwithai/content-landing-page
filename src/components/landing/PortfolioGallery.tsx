"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  clientName?: string;
  description?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

interface PortfolioGalleryProps {
  title?: string;
  subtitle?: string;
  items?: PortfolioItem[];
  ctaText?: string;
  onCtaClick?: () => void;
}

const PortfolioGallery = ({
  title = "",
  subtitle = "",
  items = defaultPortfolioItems,
  ctaText = "Let's chat!",
  onCtaClick = () =>
    window.open("https://zcal.co/jovannytovar/content", "_blank"),
}: PortfolioGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const autoScrollTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [animationCount, setAnimationCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Get unique categories from items
  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Scroll back to start when changing category
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    // Pause auto-scrolling briefly when changing category
    pauseAutoScroll();
    // Resume auto-scrolling after a delay
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  };

  const handleItemClick = (item: PortfolioItem) => {
    if (!isDragging) {
      setSelectedItem(item);
      document.body.style.overflow = "hidden";
      pauseAutoScroll();
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "";
    // Resume auto-scrolling after modal is closed
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 1000);
  };

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
      pauseAutoScroll();
    }
  };

  const scrollRightBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      pauseAutoScroll();
    }
  };

  // Auto-scrolling functionality
  useEffect(() => {
    const autoScroll = () => {
      if (scrollContainerRef.current && isAutoScrolling && !isDragging) {
        // Scroll very slowly to the left (0.5px per frame)
        scrollContainerRef.current.scrollLeft += 0.5;

        // If we've reached the end, loop back to the beginning
        if (
          scrollContainerRef.current.scrollLeft >=
          scrollContainerRef.current.scrollWidth -
            scrollContainerRef.current.clientWidth -
            20 // Add a buffer
        ) {
          // Smoothly reset to beginning with a small jump to avoid visual stutter
          scrollContainerRef.current.scrollLeft = 10;
        }

        animationFrameRef.current = requestAnimationFrame(autoScroll);
      }
    };

    if (isAutoScrolling && !isDragging) {
      animationFrameRef.current = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoScrolling, isDragging]);

  // Initialize auto-scrolling on mount and with intersection observer
  useEffect(() => {
    // Force start auto-scrolling immediately
    setIsAutoScrolling(true);

    // Create an intersection observer to detect when the gallery is visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsAutoScrolling(true);
        }
      },
      { threshold: 0.1 }, // Trigger when at least 10% of the element is visible
    );

    // Observe the gallery container
    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Pause auto-scrolling
  const pauseAutoScroll = () => {
    setIsAutoScrolling(false);
    // Clear any existing timer
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
    // Set a timer to resume auto-scrolling after 3 seconds of inactivity
    autoScrollTimerRef.current = window.setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);
  };

  // Prevent default behavior for images to avoid dragging images
  const preventDragHandler = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  // Drag to scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      // Prevent default browser behavior (text selection, image dragging)
      e.preventDefault();

      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
      pauseAutoScroll();

      // Add a class to the body to prevent text selection during dragging
      document.body.classList.add("no-select");

      // Cancel any existing animation frame to prevent conflicts
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    // Prevent default browser behavior
    e.preventDefault();

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjusted for smoother scrolling
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);
    document.body.classList.remove("no-select");
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
      document.body.classList.remove("no-select");
    }
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
      pauseAutoScroll();

      // Add a class to the body to prevent text selection during dragging
      document.body.classList.add("no-select");
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjusted for smoother scrolling
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.body.classList.remove("no-select");
  };

  // Listen for custom event from the main page
  useEffect(() => {
    const handleStartAutoScroll = () => {
      setIsAutoScrolling(true);
    };

    window.addEventListener("startAutoScroll", handleStartAutoScroll);

    return () => {
      window.removeEventListener("startAutoScroll", handleStartAutoScroll);
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Handle arrow animation
  useEffect(() => {
    let animationTimer: NodeJS.Timeout;

    if (isHovering) {
      // Reset animation count when hovering starts
      setAnimationCount(0);

      // Set up a timer to increment the animation count
      animationTimer = setInterval(() => {
        setAnimationCount((prev) => {
          // If we've completed 3 animations, stop
          if (prev >= 2) {
            clearInterval(animationTimer);
            return prev;
          }
          return prev + 1;
        });
      }, 2000); // Each animation takes 2 seconds
    }

    return () => {
      if (animationTimer) clearInterval(animationTimer);
    };
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 bg-white relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 relative">
          {/* Left curved arrow */}
          <svg
            className="absolute left-0 top-1/2 transform -translate-y-1/2 md:block hidden"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 20 C 60 20, 20 40, 20 80 L 20 100"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={
                isHovering ? (animationCount <= 2 ? "200" : "0") : "200"
              }
              className={isHovering ? "animate-draw-left" : ""}
              style={{
                animationPlayState: isHovering ? "running" : "paused",
                animationIterationCount: animationCount <= 2 ? "1" : "0",
                animationDelay: `${animationCount * 2}s`,
              }}
            />
            <path
              d="M10 90 L 20 100 L 30 90"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="40"
              strokeDashoffset={
                isHovering ? (animationCount <= 2 ? "40" : "0") : "40"
              }
              className={isHovering ? "animate-draw-left-arrow" : ""}
              style={{
                animationPlayState: isHovering ? "running" : "paused",
                animationIterationCount: animationCount <= 2 ? "1" : "0",
                animationDelay: `${0.8 + animationCount * 2}s`,
              }}
            />
          </svg>

          {/* Right curved arrow */}
          <svg
            className="absolute right-0 top-1/2 transform -translate-y-1/2 md:block hidden"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 20 C 60 20, 100 40, 100 80 L 100 100"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={
                isHovering ? (animationCount <= 2 ? "200" : "0") : "200"
              }
              className={isHovering ? "animate-draw-right" : ""}
              style={{
                animationPlayState: isHovering ? "running" : "paused",
                animationIterationCount: animationCount <= 2 ? "1" : "0",
                animationDelay: `${animationCount * 2}s`,
              }}
            />
            <path
              d="M90 90 L 100 100 L 110 90"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="40"
              strokeDashoffset={
                isHovering ? (animationCount <= 2 ? "40" : "0") : "40"
              }
              className={isHovering ? "animate-draw-right-arrow" : ""}
              style={{
                animationPlayState: isHovering ? "running" : "paused",
                animationIterationCount: animationCount <= 2 ? "1" : "0",
                animationDelay: `${0.8 + animationCount * 2}s`,
              }}
            />
          </svg>

          <h2 className="text-3xl font-bold mb-4">
            {title || "On-Brand, Social-Ready Posts"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle ||
              "Check out our creative approach and imagine the difference for your business."}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio gallery with horizontal scroll */}
        <div className="relative mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md hidden md:flex"
            onClick={scrollLeftBtn}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div
            ref={scrollContainerRef}
            className={cn(
              "flex overflow-x-auto gap-4 pb-4 hide-scrollbar no-select",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            )}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: isDragging ? "auto" : "smooth",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDragStart={preventDragHandler}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="min-w-[250px] md:min-w-[300px] h-[350px] flex-shrink-0 snap-start cursor-pointer group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 no-drag"
                  draggable="false"
                  onDragStart={preventDragHandler}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  {item.clientName && (
                    <p className="text-white/90 text-sm">{item.clientName}</p>
                  )}
                  <p className="text-white/80 text-xs mt-1">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md hidden md:flex"
            onClick={scrollRightBtn}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* CTA button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={onCtaClick}
            className="glitch-button bg-black hover:bg-gray-900 text-white px-8 py-6 h-auto rounded-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Modal for selected item */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div>
                    {selectedItem.clientName && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">
                          Company
                        </h4>
                        <p className="text-lg font-medium">
                          {selectedItem.clientName}
                        </p>
                      </div>
                    )}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">
                        Category
                      </h4>
                      <p className="text-lg font-medium">
                        {selectedItem.category}
                      </p>
                    </div>
                    {selectedItem.description && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">
                          Description
                        </h4>
                        <p className="text-gray-700">
                          {selectedItem.description}
                        </p>
                      </div>
                    )}
                    {selectedItem.stats && selectedItem.stats.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Our Capabilities
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedItem.stats.map((stat, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-3 rounded-lg"
                            >
                              <p className="text-gray-500 text-xs">
                                {stat.label}
                              </p>
                              <p className="text-lg font-bold">{stat.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t text-center">
                <Button
                  onClick={onCtaClick}
                  className="glitch-button bg-black hover:bg-gray-900 text-white relative overflow-hidden"
                >
                  Work With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Default portfolio items
const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Data Governance, Data quality and relevance",
    category: "Saas/Tech",
    imageUrl: "/image.png",
    clientName: "Deasie",
    description:
      "Deasie is a data governance platform that ensures enterprises feed relevant high-quality and safe data into their language models. Founded in 2023 by ex-McKinsey and Amazon executives, Deasie filters thousands of documents based on key data quality dimensions—including relevance timeliness consistency and bias—and identifies sensitive information to maintain data compliance. The company recently raised $2.9 million in seed funding to enhance its platform and expand its product team.",
    stats: [
      { label: "Content Formats", value: "Multiple" },
      { label: "Turnaround Time", value: "48 hours" },
      { label: "Approval Process", value: "1-click" },
      { label: "Brand Consistency", value: "100%" },
    ],
  },
  {
    id: "2",
    title: "AI-Powered Data Analyst",
    category: "Saas/Tech",
    imageUrl: "/image (1).png",
    clientName: "CamelAI",
    description:
      "CamelAI is an AI-powered data analysis platform that enables users to ask questions in plain English and receive instant charts and insights from their data—no SQL required. It seamlessly integrates with various data sources like PostgreSQL, CSVs, and more, prioritizing privacy and security by not training on user data. Designed for simplicity, CamelAI connects apps effortlessly to enhance personalized productivity.",
    stats: [
      { label: "Brand Voice", value: "Consistent" },
      { label: "Visual Identity", value: "On-brand" },
      { label: "Platform Support", value: "All major" },
      { label: "Content Library", value: "Extensive" },
    ],
  },
  {
    id: "3",
    title: "Global Leader in Responsible AI Advocacy",
    category: "Saas/Tech",
    imageUrl: "/image (2).png",
    clientName: "AI2030",
    description:
      "AI 2030 is a global initiative dedicated to harnessing the transformative power of artificial intelligence to benefit humanity while minimizing its potential negative impacts. The organization focuses on Responsible AI, AI for All, and AI for Good, empowering individuals and organizations with the knowledge, tools, and networks needed to lead in responsible AI practices. AI 2030 offers various programs, including the Certified Responsible AI Leader Program, AI 2030 Global Fellow Program, and hosts events like the AI 2030 Summit Series across major cities worldwide.",
    stats: [
      { label: "Feedback Loop", value: "Continuous" },
      { label: "Content Calendar", value: "Flexible" },
      { label: "Approval System", value: "Seamless" },
      { label: "Content Updates", value: "Regular" },
    ],
  },
  {
    id: "4",
    title: "Global Leader in Responsible AI Advocacy",
    category: "Saas/Tech",
    imageUrl: "/image (3).png",
    clientName: "AI2030",
    description:
      "AI 2030 is a global initiative dedicated to harnessing the transformative power of artificial intelligence to benefit humanity while minimizing its potential negative impacts. The organization focuses on Responsible AI, AI for All, and AI for Good, empowering individuals and organizations with the knowledge, tools, and networks needed to lead in responsible AI practices. AI 2030 offers various programs, including the Certified Responsible AI Leader Program, AI 2030 Global Fellow Program, and hosts events like the AI 2030 Summit Series across major cities worldwide.",
    stats: [
      { label: "Platform Integration", value: "Smooth" },
      { label: "Content Variety", value: "Diverse" },
      { label: "Creative Process", value: "Collaborative" },
      { label: "Brand Guidelines", value: "Respected" },
    ],
  },
  {
    id: "5",
    title: "At-Home Male Fertility Testing and Preservation Service",
    category: "Male Fertility Services",
    imageUrl: "/image (4).png",
    clientName: "Legacy",
    description:
      "Legacy offers at-home sperm testing and cryopreservation services, empowering individuals to understand and preserve their fertility without visiting a clinic. Founded in 2018, Legacy provides clients with kits for sperm analysis, DNA fragmentation testing, and secure storage. The company has raised significant funding, including a $25 million Series B round in 2022, to expand its services and make male fertility care more accessible.",
    stats: [
      { label: "Content Library", value: "Growing" },
      { label: "Content Planning", value: "Proactive" },
      { label: "Design Process", value: "Iterative" },
      { label: "Content Creation", value: "Consistent" },
    ],
  },
  {
    id: "6",
    title: "AI-Driven Platform for Automated Software Testing",
    category: "AI-Powered Software Testing",
    imageUrl: "/image (5).png",
    clientName: "CyberShield Defense",
    description:
      "Momentic offers an AI-powered platform that automates end-to-end testing for web applications. Developers can describe user flows in plain English, eliminating the need for coding. The platform's AI handles tasks like locating elements, reasoning about assertions, and generating test cases, streamlining the testing process and enhancing software quality. Founded in 2023 and based in San Francisco, Momentic has secured $4.2 million in funding over two rounds, with investors including Y Combinator, General Catalyst, and FundersClub.",
    stats: [
      { label: "Creative Direction", value: "Innovative" },
      { label: "Brand Guidelines", value: "Followed" },
      { label: "Content Formats", value: "Multiple" },
      { label: "Turnaround Time", value: "48 hours" },
    ],
  },
  {
    id: "7",
    title: "AI-Driven Platform for Automated Phone Call Management",
    category: "AI-Powered Call Center Solutions",
    imageUrl: "/image (6).png",
    clientName: "OpenCall.ai",
    description:
      "OpenCall.ai offers AI-powered call center solutions that automate phone answering, handle inquiries, book appointments, and integrate with existing software. Their platform ensures 24/7 availability, providing real-time, natural conversations that mimic in-person interactions. Founded in 2022 and based in San Francisco, OpenCall.ai has secured $6 million in funding to revolutionize customer service and cut costs with AI solutions.",
    stats: [
      { label: "Approval Process", value: "1-click" },
      { label: "Brand Consistency", value: "100%" },
      { label: "Brand Voice", value: "Consistent" },
      { label: "Visual Identity", value: "On-brand" },
    ],
  },
  {
    id: "8",
    title: "Simplifying Fine-Tuning of Large Language Models for Developers",
    category: "AI Model Fine-Tuning Platform",
    imageUrl: "/image (7).png",
    clientName: "OpenPipe",
    description:
      "OpenPipe is an AI-based platform that simplifies the fine-tuning of Large Language Models (LLMs) for developers. By allowing developers to convert prompts into efficient, fine-tuned models, OpenPipe enhances performance and reduces costs. Founded in 2023 and based in Seattle, the company has secured $6.7 million in seed funding to expand its services and make LLM fine-tuning more accessible. ",
    stats: [
      { label: "Platform Support", value: "All major" },
      { label: "Content Library", value: "Extensive" },
      { label: "Feedback Loop", value: "Continuous" },
      { label: "Content Calendar", value: "Flexible" },
    ],
  },
  {
    id: "9",
    title: "AI Voice Agent Platform for Call Operations",
    category: "AI-Powered Call Center Solutions",
    imageUrl: "/image (8).png",
    clientName: "Retell AI",
    description:
      "Retell AI offers a comprehensive platform for building, testing, deploying, and monitoring AI voice agents, aiming to revolutionize call operations across industries such as healthcare, insurance, financial services, and logistics. Their technology enables businesses to automate calls without losing the human touch, providing features like warm call transfers, appointment scheduling, and integration with existing knowledge bases. Founded in 2023 and based in Palo Alto, California, Retell AI has secured $4.6 million in seed funding to further develop its platform and expand its reach.",
    stats: [
      { label: "Approval System", value: "Seamless" },
      { label: "Content Updates", value: "Regular" },
      { label: "Platform Integration", value: "Smooth" },
      { label: "Content Variety", value: "Diverse" },
    ],
  },
  {
    id: "10",
    title: "AI-Powered Web Data Extraction Platform​",
    category: "Web Data Extraction and Automation​",
    imageUrl: "/image (9).png",
    clientName: "Reworkd AI",
    description:
      "Reworkd AI offers an AI-driven platform that automates the entire web data extraction process, from scanning websites and generating code to running extractors and validating results. By leveraging Large Language Models (LLMs), Reworkd enables users to parse, understand, and interact with web pages, facilitating scalable data scraping without the need for manual coding or maintenance. Founded in 2023 and based in San Francisco, Reworkd has secured $1.25 million in pre-seed funding to enhance its infrastructure and expand its services. The platform also features AgentGPT, allowing users to deploy autonomous AI agents for various tasks.",
    stats: [
      { label: "Creative Process", value: "Collaborative" },
      { label: "Brand Guidelines", value: "Respected" },
      { label: "Content Library", value: "Growing" },
      { label: "Content Planning", value: "Proactive" },
    ],
  },
  {
    id: "11",
    title: "AI-Powered Web Data Extraction Platform",
    category: "Web Data Extraction and Automation​",
    imageUrl: "/image (10).png",
    clientName: "Reworkd AI",
    description:
      "Reworkd AI offers an AI-driven platform that automates the entire web data extraction process, from scanning websites and generating code to running extractors and validating results. By leveraging Large Language Models (LLMs), Reworkd enables users to parse, understand, and interact with web pages, facilitating scalable data scraping without the need for manual coding or maintenance. Founded in 2023 and based in San Francisco, Reworkd has secured $1.25 million in pre-seed funding to enhance its infrastructure and expand its services. The platform also features AgentGPT, allowing users to deploy autonomous AI agents for various tasks. ",
    stats: [
      { label: "Design Process", value: "Iterative" },
      { label: "Content Creation", value: "Consistent" },
      { label: "Creative Direction", value: "Innovative" },
      { label: "Brand Guidelines", value: "Followed" },
    ],
  },
  {
    id: "12",
    title: "Conversational AI for Mental Health Support",
    category: "Mental Health Technology",
    imageUrl: "/image (11).png",
    clientName: "Sonia",
    description:
      "Sonia is a conversational AI platform offering voice-based emotional support sessions to users. Through 20-minute voice interactions, Sonia aims to provide accessible mental health support, allowing users to engage in therapeutic conversations via their smartphones. This approach seeks to overcome barriers such as cost, stigma, and limited availability of mental health professionals. ",
    stats: [
      { label: "Content Formats", value: "Multiple" },
      { label: "Turnaround Time", value: "48 hours" },
      { label: "Approval Process", value: "1-click" },
      { label: "Brand Consistency", value: "100%" },
    ],
  },
  {
    id: "13",
    title: "Comprehensive Web3 Development Platform",
    category: "Blockchain Development Tools",
    imageUrl: "/image (12).png",
    clientName: "thirdweb",
    description:
      "thirdweb provides a complete suite of tools for developers to build, launch, and manage Web3 projects. Their platform simplifies the integration of blockchain technologies, enabling the creation of decentralized applications, NFTs, and other blockchain-based solutions. By offering pre-built smart contracts and SDKs, thirdweb accelerates development and reduces the complexity associated with blockchain projects.",
    stats: [
      { label: "Brand Voice", value: "Consistent" },
      { label: "Visual Identity", value: "On-brand" },
      { label: "Platform Support", value: "All major" },
      { label: "Content Library", value: "Extensive" },
    ],
  },
  {
    id: "14",
    title: "AI-Driven Unit Testing Automation",
    category: "Software Testing Tools",
    imageUrl: "/image (13).png",
    clientName: "Tusk",
    description:
      "Tusk leverages artificial intelligence to generate unit and integration tests, aiming to prevent bugs caused by edge cases. By analyzing codebases and understanding business context, Tusk's AI agent suggests verified test cases, enhancing code coverage and allowing development teams to ship faster with increased confidence. The platform integrates seamlessly into existing CI/CD pipelines, promoting a strong testing culture without disrupting developer workflows.",
    stats: [
      { label: "Feedback Loop", value: "Continuous" },
      { label: "Content Calendar", value: "Flexible" },
      { label: "Approval System", value: "Seamless" },
      { label: "Content Updates", value: "Regular" },
    ],
  },
  {
    id: "15",
    title: "AI-Driven Unit Testing Automation",
    category: "Software Testing Tools",
    imageUrl: "/image (14).png",
    clientName: "Tusk",
    description:
      "Tusk leverages artificial intelligence to generate unit and integration tests, aiming to prevent bugs caused by edge cases. By analyzing codebases and understanding business context, Tusk's AI agent suggests verified test cases, enhancing code coverage and allowing development teams to ship faster with increased confidence. The platform integrates seamlessly into existing CI/CD pipelines, promoting a strong testing culture without disrupting developer workflows.",
    stats: [
      { label: "Platform Integration", value: "Smooth" },
      { label: "Content Variety", value: "Diverse" },
      { label: "Creative Process", value: "Collaborative" },
      { label: "Brand Guidelines", value: "Respected" },
    ],
  },
  {
    id: "16",
    title: "Automated Home Coffee Brewing System",
    category: "Consumer Appliances",
    imageUrl: "/image (15).png",
    clientName: "xBloom",
    description:
      "xBloom offers a home coffee brewing system that combines precision engineering with user-friendly design to deliver professionally made coffee at home. The machine integrates with specialty coffee roasters, allowing users to enjoy a variety of coffee experiences. xBloom aims to bring the quality of a coffee shop into the home kitchen, providing convenience without compromising on taste.",
    stats: [
      { label: "Content Library", value: "Growing" },
      { label: "Content Planning", value: "Proactive" },
      { label: "Design Process", value: "Iterative" },
      { label: "Content Creation", value: "Consistent" },
    ],
  },
];

export default PortfolioGallery;
