import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

interface SidebarItemProps {
  href: string;
  name: string;
  keyValue: string;
}

function SidebarItem({ href, name, keyValue }: SidebarItemProps) {
  const segments = useSelectedLayoutSegments();
  const current = segments.includes(keyValue);

  return (
    <Link
      href={href}
      className={`${
        current
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
    >
      {name}
    </Link>
  );
}

export default SidebarItem;
