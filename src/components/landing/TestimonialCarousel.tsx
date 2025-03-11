"use client";

import React from "react";
import { User } from "lucide-react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  testimonials?: {
    id: string;
    name: string;
    company: string;
    role: string;
    avatarColor: string;
    quote: string;
    rating: number;
  }[];
}

const TestimonialCarousel = ({
  testimonials = defaultTestimonials,
}: TestimonialProps) => {
  return (
    <section className="bg-white py-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          What Our Clients Say
        </h2>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="bg-gray-50 rounded-lg p-8 shadow-sm h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div
                      className={`h-12 w-12 rounded-full overflow-hidden mr-4 flex items-center justify-center bg-gradient-to-br ${testimonial.avatarColor}`}
                    >
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}{" "}
                        {testimonial.company ? `, ${testimonial.company}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 italic flex-grow">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="static translate-y-0 mx-2" />
            <CarouselNext className="static translate-y-0 mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const defaultTestimonials = [
  {
    id: "1",
    name: "Tiasia O'Brien M.A.",
    company: "",
    role: "Exec in Culturally Competent Engagement & Design. Entrepreneur. Speaker & Facilitator.",
    avatarColor: "from-purple-500 to-pink-600",
    quote:
      "For over a year, my company was privileged to engage Jovanny as a Product Marketing Manager. He made significant contributions during his tenure, including participating in user research interviews, collaborating with our Product Team, and developing targeted marketing strategies for new features. Jovanny's involvement in user research enabled us to refine user segmentation and validate new features.",
    rating: 5,
  },
  {
    id: "2",
    name: "James O'Brien",
    company: "",
    role: "Human-centered community & vibe curator.",
    avatarColor: "from-blue-500 to-indigo-600",
    quote:
      "Jovanny was awesome! As a Product Marketing Manager, Jovanny consistently brought innovative ideas to the table, helping our team stay ahead of the curve with new tools and strategies to optimize our efficiency & increase our output. His forward-thinking approach and strong communication skills played a key role in shaping our product marketing strategy.",
    rating: 5,
  },
];

export default TestimonialCarousel;
