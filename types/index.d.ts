import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  icon: keyof typeof Icons
}

export type MainNavItem = NavItem

export type SidebarConfig = {
  mainNav: MainNavItem[]
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}

export interface Filter {
  brands: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: SortByOptions
  sortDirection: sortDirection
}

interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  title: string;
  fullName: string;
  [key: string]: any;
}

interface CartData {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

interface User {
  firstName: string;
  lastName: string;
  id: string;
}


export type SortProductByOptions = "brand" | "category" | "price" | "stock" | "title";
export type SortProductDirection = "asc" | "desc" | undefined

export type SortCartByOptions = "totalProducts" | "total" | "discountedTotal" | "fullName";
export type SortCartDirection = "asc" | "desc" | undefined
