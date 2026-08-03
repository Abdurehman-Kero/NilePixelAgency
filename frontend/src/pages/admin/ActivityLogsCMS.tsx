import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { api } from '../../services/api';

export const ActivityLogsCMS: React.FC = () => {
 const [logs, setLogs] = useState<any[]>([]);

 useEffect(() => {
 api.get('/dashboard/activity').then((res) => {
 if (res.success) setLogs(res.data || []);
 });
 }, []);

 return (
 <AdminLayout title="System Audit Logs">
 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 text-xs space-y-3">
 <h4 className="font-bold text-sm text-white">Recent CMS Admin Activity</h4>
 <div className="divide-y divide-[#23344F]">
 {logs.length === 0 ? (
 <p className="py-4 text-gray-400">No activity recorded yet.</p>
 ) : (
 logs.map((l) => (
 <div key={l.id} className="py-2.5 flex items-center justify-between">
 <div>
 <span className="font-bold text-white">{l.action}</span>
 <span className="ml-2 text-gray-400">by {l.user_email || 'Admin'}</span>
 <p className="text-[11px] text-[#A9B4C5]">{l.details}</p>
 </div>
 <span className="text-[10px] text-gray-500 font-mono">
 {l.created_at ? new Date(l.created_at).toLocaleString() : ''}
 </span>
 </div>
 ))
 )}
 </div>
 </div>
 </AdminLayout>
 );
};
