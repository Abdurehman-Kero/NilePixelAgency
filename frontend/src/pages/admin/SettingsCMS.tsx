import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { Settings, Save } from 'lucide-react';
import { api } from '../../services/api';

export const SettingsCMS: React.FC = () => {
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [companyName, setCompanyName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');

 useEffect(() => {
 fetchSettings();
 }, []);

 const fetchSettings = async () => {
 try {
 const res = await api.get('/settings');
 if (res.success) {
 setCompanyName(res.data.settings?.company_name || '');
 setEmail(res.data.company?.email || '');
 setPhone(res.data.company?.phone || '');
 }
 } catch (err) {
 console.error(err);
 } finally {
 setLoading(false);
 }
 };

 const handleSave = async () => {
 setSaving(true);
 try {
 const res = await api.put('/settings', {
 company: {
 company_name: companyName,
 email: email,
 phone: phone
 }
 });
 if (res.success !== false) {
 alert('Settings saved successfully!');
 } else {
 alert('Failed to save settings: ' + res.message);
 }
 } catch (err: any) {
 console.error(err);
 alert('Failed to save settings: ' + err.message);
 } finally {
 setSaving(false);
 }
 };

 if (loading) {
 return (
 <AdminLayout title="Platform Configuration">
 <div className="text-white">Loading settings...</div>
 </AdminLayout>
 );
 }

 return (
 <AdminLayout title="Platform Configuration">
 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 text-xs space-y-4 max-w-2xl">
 <h3 className="font-bold text-sm text-white flex items-center gap-2">
 <Settings className="w-4 h-4 text-[#00E599]" />
 Global Platform Settings
 </h3>

 <div>
 <label htmlFor="companyName" className="block text-[#A9B4C5] mb-1">Company Title</label>
 <input 
 id="companyName"
 name="companyName"
 type="text" 
 value={companyName}
 onChange={(e) => setCompanyName(e.target.value)}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F6FFF]" 
 />
 </div>

 <div>
 <label htmlFor="email" className="block text-[#A9B4C5] mb-1">Contact Email Address</label>
 <input 
 id="email"
 name="email"
 type="email" 
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F6FFF]" 
 />
 </div>

 <div>
 <label htmlFor="phone" className="block text-[#A9B4C5] mb-1">Phone Number</label>
 <input 
 id="phone"
 name="phone"
 type="text" 
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#0F6FFF]" 
 />
 </div>

 <button 
 onClick={handleSave}
 disabled={saving}
 className="px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-[#0F6FFF] hover:bg-[#0F6FFF]/90 font-bold text-white flex items-center gap-2 disabled:opacity-50"
 >
 <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
 </button>
 </div>
 </AdminLayout>
 );
};

