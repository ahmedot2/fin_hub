"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface SubcategoryTabsProps {
  subcategories: string[];
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

export function SubcategoryTabs({ subcategories, sectionRefs }: SubcategoryTabsProps) {
  const [activeTab, setActiveTab] = React.useState(subcategories[0]);

  const handleTabClick = (subcategory: string) => {
    setActiveTab(subcategory);
    sectionRefs.current[subcategory]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if(id) {
               setActiveTab(id);
            }
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );
  
    const currentRefs = sectionRefs.current;
  
    Object.values(currentRefs).forEach((ref) => {
      if (ref) {
        // Assign ID for observer to read
        const subcategory = Object.keys(currentRefs).find(key => currentRefs[key] === ref);
        if (subcategory) {
          ref.id = subcategory;
          observer.observe(ref);
        }
      }
    });
  
    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [sectionRefs]);


  return (
    <div className="sticky top-16 bg-background/95 backdrop-blur z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b">
      <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
        {subcategories.map((subcategory) => (
          <Button
            key={subcategory}
            variant="pill"
            size="sm"
            onClick={() => handleTabClick(subcategory)}
            data-active={activeTab === subcategory}
            className="shrink-0"
          >
            {subcategory}
          </Button>
        ))}
      </div>
    </div>
  );
}
