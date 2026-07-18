import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { api } from '../../services/api';
import { FolderGit2, Wrench, FileText, Users, Mail, Image, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({
    projects: 0,
    services: 0,
    blog: 0,
    team: 0,
    contacts: 0
  });

  useEffect(() => {
    Promise.all([
      api.get('/projects'),
      api.get('/services'),
      api.get('/blog'),
      api.get('/team'),
      api.get('/contact')
    ]).then(([p, s, b, t, c]) => {
      setStats({
        projects: p.data?.length || 0,
        services: s.data?.length || 0,
        blog: b.data?.length || 0,
        team: t.data?.length || 0,
        contacts: c.data?.length || 0
      });
    });
  }, []);

  const statCards = [
    { name: 'Featured Projects', count: stats.projects, icon: FolderGit2, color: 'text-[#00A3FF]', path: '/admin/projects' },
    { name: 'Services Offered', count: stats.services, icon: Wrench, color: 'text-purple-400', path: '/admin/services' },
    { name: 'Blog Articles', count: stats.blog, icon: FileText, color: 'text-amber-400', path: '/admin/blog' },
    { name: 'Team Members', count: stats.team, icon: Users, color: 'text-green-400', path: '/admin/team' },
    { name: 'Contact Inquiries', count: stats.contacts, icon: Mail, color: 'text-red-400', path: '/admin/contacts' },
  ];

  return (
    <AdminLayout title="Platform CMS Overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.name}
                  to={card.path}
                  className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 flex items-center justify-between hover:border-[#0F6FFF] transition group"
                >
                  <div className="space-y-1">
                    <p className="text-xs text-[#A9B4C5]">{card.name}</p>
                    <p className="text-2xl font-extrabold text-white">{card.count}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-[#08111F] border border-[#23344F] ${card.color} group-hover:scale-110 transition`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Quick Management Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <Link to="/admin/projects" className="p-4 rounded-xl bg-[#08111F] border border-[#23344F] hover:border-[#00A3FF] transition flex items-center justify-between">
                <span>Add / Manage Projects</span>
                <ArrowUpRight className="w-4 h-4 text-[#00A3FF]" />
              </Link>
              <Link to="/admin/team" className="p-4 rounded-xl bg-[#08111F] border border-[#23344F] hover:border-[#00A3FF] transition flex items-center justify-between">
                <span>Update Executive Team</span>
                <ArrowUpRight className="w-4 h-4 text-[#00A3FF]" />
              </Link>
              <Link to="/admin/media" className="p-4 rounded-xl bg-[#08111F] border border-[#23344F] hover:border-[#00A3FF] transition flex items-center justify-between">
                <span>Upload Media Assets</span>
                <ArrowUpRight className="w-4 h-4 text-[#00A3FF]" />
              </Link>
            </div>
          </div>
        </AdminLayout>
  );
};
