export type NavItem = {
  name: string;
  href: string;
  type?: never;
};

export type NavHeader = {
  type: "header";
  name: string;
  href?: never;
};

export type SidebarItem = NavItem | NavHeader;

export const NAV_ITEMS: SidebarItem[] = [
  { name: "Dashboards", href: "/dashboard" },
  { type: "header", name: "MENU" },
  { name: "Employees", href: "/employees" },
  { name: "Department", href: "/departments" },
  { name: "JOBS", href: "/jobs" },
  { name: "Shop", href: "/shop" },
  { name: "Settings", href: "/settings" },
];
