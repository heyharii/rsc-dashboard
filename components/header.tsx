import React from 'react';

interface HeaderProps {
  mobileSidebarTrigger: React.ReactNode
}

function Header({ mobileSidebarTrigger }: HeaderProps) {
  return (
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        {mobileSidebarTrigger}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
      </div>
  );
}

export default Header;
