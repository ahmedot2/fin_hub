import { Sidebar, SidebarContent, SidebarHeader, SidebarInset } from "@/components/ui/sidebar";
import { CategoryNavigation } from "@/components/layout/CategoryNavigation";
import { Header } from "@/components/layout/Header";
import { ResourceDisplay } from "@/components/ResourceDisplay";
import { getCategories, getCategoryWithResources } from "@/lib/data";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Flame } from "lucide-react";
import Link from "next/link";

export default function Home({ searchParams }: { searchParams?: { category?: string } }) {
  const allCategories = getCategories();
  const currentCategoryId = searchParams?.category || allCategories[0]?.id;
  const currentCategory = getCategoryWithResources(currentCategoryId);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Flame className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">FINHUB</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <CategoryNavigation categories={allCategories} activeCategoryId={currentCategoryId} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[80rem]">
            {currentCategory ? (
              <ResourceDisplay category={currentCategory} />
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
