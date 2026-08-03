import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
 children: React.ReactNode;
 title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
 const [sidebarOpen, setSidebarOpen] = useState(false);

 const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
 const handleCloseSidebar = () => setSidebarOpen(false);

 return (
 <div className="flex min-h-screen bg-[#08111F]">
 <AdminSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
 
 {/* Mobile overlay */}
 {sidebarOpen && (
 <div 
 className="fixed inset-0 bg-black/60 z-40 lg:hidden"
 onClick={handleCloseSidebar}
 />
 )}

 <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto text-white relative">
 <AdminHeader title={title} onMenuClick={handleToggleSidebar} />
 
 <main className="p-4 sm:p-6 space-y-6 flex-1">
 {children}
 </main>
 </div>
 </div>
 );
};
