import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ShieldCheck, User, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminHeader: React.FC<{ title: string; onMenuClick?: () => void }> = ({ title, onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0A1628]/95 backdrop-blur border-b border-[#23344F] px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 rounded-lg text-[#A9B4C5] hover:text-white hover:bg-[#101C2F]">
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="hidden sm:flex w-8 h-8 rounded-lg bg-[#0F6FFF]/20 border border-[#0F6FFF]/40 items-center justify-center text-[#00A3FF]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">{title}</h1>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <Link to="/" target="_blank" className="text-[#A9B4C5] hover:text-white transition hidden sm:block">
          View Live Website →
        </Link>
        <div className="flex items-center gap-2.5 bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-1.5">
          <div className="w-6 h-6 rounded-full bg-[#0F6FFF] flex items-center justify-center text-white font-bold text-[10px]">
            {user?.name?.[0] || 'A'}
          </div>
          <span className="font-medium text-white">{user?.name || user?.email || 'Admin User'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition border border-red-500/20"
          title="Sign out of CMS"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
