import React from 'react';
import Link from 'next/link';
import { Home, Search, Star, FileText, Settings, Menu } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: 'ダッシュボード', href: '/dashboard', icon: Home },
    { name: '補助金検索', href: '/search', icon: Search },
    { name: 'お気に入り', href: '/favorites', icon: Star },
    { name: '申請管理', href: '/applications', icon: FileText },
    { name: '設定', href: '/settings', icon: Settings },
  ];

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 flex justify-start">
        <button onClick={toggleSidebar} className="text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-5">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href} className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
                <item.icon className="h-6 w-6 mr-3" />
                <span className={`${isOpen ? 'inline' : 'hidden'}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;