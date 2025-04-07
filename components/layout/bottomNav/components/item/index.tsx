import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}
const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={`flex flex-col space-y-1 items-center h-full justify-center ${
        isActive ? "text-green-600" : "text-green-700"
      }`}
    >
      {icon}
      <p className="text-sm font-regular">{label}</p>
    </Link>
  );
};

export default NavItem;
