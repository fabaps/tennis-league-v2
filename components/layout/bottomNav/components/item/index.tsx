import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  className?: string;
}
const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  label,
  isActive,
  className,
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "flex flex-col space-y-1 items-center h-full justify-center",
        isActive ? "text-green-500" : "text-green-600",
        className
      )}
    >
      {icon}
      <p className="text-sm font-regular">{label}</p>
    </Link>
  );
};

export default NavItem;
