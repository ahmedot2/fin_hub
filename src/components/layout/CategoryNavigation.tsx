import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import type { Category } from "@/lib/types";
import Link from "next/link";

interface CategoryNavigationProps {
  categories: Omit<Category, 'resources'>[];
  activeCategoryId: string;
}

export function CategoryNavigation({ categories, activeCategoryId }: CategoryNavigationProps) {
  return (
    <SidebarMenu className="p-2">
      {categories.map((category) => (
        <SidebarMenuItem key={category.id}>
          <Link href={`/?category=${category.id}`} className="w-full">
            <SidebarMenuButton
              isActive={category.id === activeCategoryId}
              tooltip={{ children: category.name, side: 'right' }}
              className="w-full justify-start"
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
