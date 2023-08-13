"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

interface HeaderProps {
  onToggle: () => void;
}

const MobileSidebarTrigger = ({ onToggle }: HeaderProps) => (
  <button
    type="button"
    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
    onClick={() => onToggle()}
  >
    <span className="sr-only">Open sidebar</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>
);

const navigation = [
  { name: "Products", href: "/products", keyValue: "products" },
  { name: "Carts", href: "/carts", keyValue: "carts" },
];

export default function HeaderSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <Sidebar navigation={navigation} />
      </div>
      <div className="lg:pl-64">
        <Header
          mobileSidebarTrigger={
            <MobileSidebarTrigger onToggle={sidebarToggle} />
          }
        />
        {sidebarOpen && (
          <div className="relative z-50 lg:hidden">
            <Sidebar navigation={navigation} />
          </div>
        )}
      </div>
    </>
  );
}
