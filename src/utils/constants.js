import { Search, Heart, ShoppingBag, User } from "lucide-react";

import menCategoryImage from "../assets/images/categories/men.png";
import womenCategoryImage from "../assets/images/categories/women.png";
import kidsCategoryImage from "../assets/images/categories/kids.png";

export const NAV_LINKS = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Men",
    path: "/products?category=men",
  },
  {
    label: "Women",
    path: "/products?category=women",
  },
  {
    label: "Kids",
    path: "/products?category=kids",
  },
  {
    label: "Collections",
    path: "/products",
  },
];

export const NAV_ACTIONS = [
  {
    icon: Heart,
    label: "Wishlist",
    path: "/wishlist",
  },
  {
    icon: ShoppingBag,
    label: "Cart",
    path: "/cart",
  },
  {
    icon: User,
    label: "Profile",
    path: "/profile",
  },
];

export const FEATURED_CATEGORIES = [
  {
    id: 1,
    name: "Men",
    slug: "men",
    image: menCategoryImage,
  },
  {
    id: 2,
    name: "Women",
    slug: "women",
    image: womenCategoryImage,
  },
  {
    id: 3,
    name: "Kids",
    slug: "kids",
    image: kidsCategoryImage,
  },
];

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  DRAFT: "draft",
  ARCHIVED: "archived",
};

export const SORT_OPTIONS = {
  PRICE_LOW_HIGH: "price-asc",
  PRICE_HIGH_LOW: "price-desc",
  RATING: "rating",
};
