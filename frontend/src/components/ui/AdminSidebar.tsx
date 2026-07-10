import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import {
  LayoutDashboard,
  FolderGit2,
  Wrench,
  FileText,
  Users,
  Star,
  Mail,
  Briefcase,
  Image,
  Settings,
  Activity,
  Tags
} from 'lucide-react';

import { X } from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects CMS', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Services CMS', path: '/admin/services', icon: Wrench },
    { name: 'Blog Articles', path: '/admin/blog', icon: FileText },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Team Directory', path: '/admin/team', icon: Users },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Contacts', path: '/admin/contacts', icon: Mail },
    { name: 'Careers & Jobs', path: '/admin/careers', icon: Briefcase },
    { name: 'Media Asset Library', path: '/admin/media', icon: Image },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Audit Logs', path: '/admin/activity', icon: Activity },
  ];

  return (
    <aside 
      className={`w-64 bg-[#050B15] border-r border-[#23344F] flex flex-col h-full shrink-0 text-xs fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-5 border-b border-[#23344F] flex justify-between items-center">
        <div>
          <Logo size="sm" />
          <span className="block mt-2 text-[10px] font-mono text-[#00A3FF] uppercase tracking-wider">
            Enterprise CMS v2.0
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-[#A9B4C5] hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                  isActive
                    ? 'bg-[#0F6FFF] text-white shadow-md shadow-[#0F6FFF]/20'
                    : 'text-[#A9B4C5] hover:text-white hover:bg-[#101C2F]'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#23344F] text-[11px] text-[#A9B4C5]">
        <p>NilePixel Control Panel</p>
        <p className="text-[10px] text-gray-500 font-mono mt-0.5">DB connected: nilepixel.db</p>
      </div>
    </aside>
  );
};
