"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Check, X, MessageSquare, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

interface ContentItemProps {
  id: string;
  title: string;
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  imageUrl: string;
  date: string;
  status?: "pending" | "approved" | "changes_requested";
}

interface PortalPreviewProps {
  contentItems?: ContentItemProps[];
}

const ContentItem = ({
  item = {
    id: "1",
    title: "Summer Campaign Post",
    platform: "instagram",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    date: "June 15, 2023",
    status: "pending",
  },
}: {
  item?: ContentItemProps;
}) => {
  const [hovered, setHovered] = useState(false);
  const [status, setStatus] = useState(item.status);

  const handleApprove = () => {
    setStatus("approved");
  };

  const handleRequestChanges = () => {
    setStatus("changes_requested");
  };

  const platformColors = {
    instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
    facebook: "bg-blue-600",
    twitter: "bg-sky-500",
    linkedin: "bg-blue-700",
  };

  const statusDisplay = {
    pending: { text: "Pending Approval", color: "bg-amber-500" },
    approved: { text: "Approved", color: "bg-green-500" },
    changes_requested: { text: "Changes Requested", color: "bg-red-500" },
  };

  return (
    <Card
      className="w-full max-w-sm bg-white overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute top-0 right-0 m-2 px-2 py-1 rounded-full text-xs text-white",
            platformColors[item.platform],
          )}
        >
          {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
        </div>
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg h-12 line-clamp-2">
          {item.title}
        </CardTitle>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{item.date}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            statusDisplay[status].color,
            "text-white",
          )}
        >
          {statusDisplay[status].text}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between transition-opacity duration-300 opacity-100">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                onClick={handleApprove}
                disabled={status === "approved"}
              >
                <Check className="h-4 w-4" />
                Approve
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Approve this content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleRequestChanges}
                disabled={status === "changes_requested"}
              >
                <X className="h-4 w-4" />
                Request Changes
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Request changes to this content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

const PortalPreview = ({
  contentItems = [
    {
      id: "1",
      title: "Summer Campaign Post",
      platform: "instagram",
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      date: "June 15, 2023",
      status: "pending",
    },
    {
      id: "2",
      title: "Product Launch Announcement",
      platform: "facebook",
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      date: "June 18, 2023",
      status: "pending",
    },
    {
      id: "3",
      title: "Customer Testimonial",
      platform: "linkedin",
      imageUrl:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
      date: "June 20, 2023",
      status: "approved",
    },
  ],
}: PortalPreviewProps) => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Streamlined Content Approval
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our intuitive interface makes reviewing and approving social content
            effortless. Simply click to approve or request changes.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold">
                Content Approval Dashboard
              </h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                Feedback
              </Button>
              <Button size="sm">View All</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentItems.map((item) => (
              <ContentItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Click approve or request changes to manage content</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalPreview;
