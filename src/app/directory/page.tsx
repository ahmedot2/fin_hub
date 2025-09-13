"use client";

import { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset } from "@/components/ui/sidebar";
import { CategoryNavigation } from "@/components/layout/CategoryNavigation";
import { Header } from "@/components/layout/Header";
import { ResourceDisplay } from "@/components/ResourceDisplay";
import { getCategories, getCategoryWithResources } from "@/lib/data";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Flame } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DirectoryContent() {
  const searchParams = useSearchParams();
  const allCategories = getCategories();
  const currentCategoryId = searchParams.get('category') || allCategories[0]?.id;
  const currentCategory = getCategoryWithResources(currentCategoryId);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Flame className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">FINDIR</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <CategoryNavigation categories={allCategories} activeCategoryId={currentCategoryId} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[80rem]">
            {currentCategory ? (
              <ResourceDisplay category={currentCategory} searchQuery={searchQuery} />
            ) : (
              <div className="flex h-[calc(100vh-10rem)] items-center justify-center rounded-lg border-2 border-dashed bg-muted">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">Category Not Found</h2>
                  <p className="mt-2 text-muted-foreground">Please select a valid category from the sidebar.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DirectoryContent />
    </Suspense>
  )
}
