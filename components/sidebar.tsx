import React from 'react';
import SidebarItem from './sidebar-item';

interface NavigationItem {
  name: string;
  href: string;
  keyValue: string
}

interface SidebarProps {
  navigation: NavigationItem[];
}

function Sidebar({ navigation }: SidebarProps) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
      <div className="text-lg font-bold flex h-16 shrink-0 items-center text-white">
        DASHBOARD
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <SidebarItem  {...item}/>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
