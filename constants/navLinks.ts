export const APP_NAV_LINKS: {
  text: string;
  href: string;
  icon: TProductType | "recipes" | "blog" | "about";
}[] = [
  {
    text: "Vegetables",
    href: "/products/vegetable",
    icon: "vegetable",
  },
  {
    text: "Fruits",
    href: "/products/fruit",
    icon: "fruit",
  },
  {
    text: "Grocery",
    href: "/products/grocery",
    icon: "grocery",
  },
  {
    text: "Dairy",
    href: "/products/dairy",
    icon: "dairy",
  },
  {
    text: "Recipes",
    href: "/recipes",
    icon: "recipes",
  },
  {
    text: "About Us",
    href: "/about",
    icon: "about",
  },
];

export const ADMIN_NAV_LINKS: {
  text: string;
  href: string;
}[] = [
  {
    text: "Products",
    href: "/admin/products",
  },
  {
    text: "Users",
    href: "/admin/users",
  },
  {
    text: "Orders",
    href: "/admin/orders",
  },
  {
    text: "Analytics",
    href: "/admin/analytics",
  },
];
