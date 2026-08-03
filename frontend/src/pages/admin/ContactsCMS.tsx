import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { api } from '../../services/api';
import { Mail, Phone, Calendar, Building, CheckCircle2 } from 'lucide-react';

export const ContactsCMS: React.FC = () => {
 const [contacts, setContacts] = useState<any[]>([]);

 useEffect(() => {
 api.get('/contact').then((res) => {
 if (res.success) setContacts(res.data || []);
 });
 }, []);

 return (
 <AdminLayout title="Client Contact Inquiries">
 <div className="space-y-4">
 {contacts.length === 0 ? (
 <div className="p-12 text-center text-xs text-gray-400 bg-[#101C2F] border border-[#23344F] rounded-2xl">
 No client inquiries submitted yet.
 </div>
 ) : (
 contacts.map((c) => (
 <div key={c.id} className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 text-xs space-y-3">
 <div className="flex items-center justify-between border-b border-[#23344F] pb-3">
 <div>
 <h4 className="font-bold text-sm text-white">{c.name}</h4>
 <p className="text-[#00A3FF]">{c.email} {c.phone ? `• ${c.phone}` : ''}</p>
 </div>
 <span className="px-2.5 py-1 rounded bg-[#08111F] text-[#A9B4C5] font-mono text-[10px] border border-[#23344F]">
 {c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Recent'}
 </span>
 </div>
 <p className="text-gray-300 leading-relaxed">{c.message}</p>
 </div>
 ))
 )}
 </div>
 </AdminLayout>
 );
};
