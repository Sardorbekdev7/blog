import { BlogsType } from "@/interface/blogs.interface";
import { CategoryType } from "@/interface/categories.interface";

export interface SidebarProps {
    latestBlogs: BlogsType[],
    categories: CategoryType[],
}