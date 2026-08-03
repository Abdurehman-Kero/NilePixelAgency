import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Linkedin, Github, Mail, User } from 'lucide-react';

export const TeamCMS: React.FC = () => {
 const [team, setTeam] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
 const [modalOpen, setModalOpen] = useState(false);
 const [editItem, setEditItem] = useState<any>(null);

 const [formData, setFormData] = useState({
 name: '',
 position: '',
 bio: '',
 photo: '',
 email: '',
 linkedin: '',
 github: '',
 telegram: '',
 twitter: '',
 display_order: 0,
 status: 'active'
 });

 const fetchTeam = async () => {
 setLoading(true);
 const res = await api.get('/team');
 if (res.success) setTeam(res.data || []);
 setLoading(false);
 };

 useEffect(() => {
 fetchTeam();
 }, []);

 const openCreateModal = () => {
 setEditItem(null);
 setFormData({
 name: '',
 position: '',
 bio: '',
 photo: '',
 email: '',
 linkedin: '',
 github: '',
 telegram: '',
 twitter: '',
 display_order: team.length + 1,
 status: 'active'
 });
 setModalOpen(true);
 };

 const openEditModal = (item: any) => {
 setEditItem(item);
 setFormData({
 name: item.name || '',
 position: item.position || '',
 bio: item.bio || '',
 photo: item.photo || '',
 email: item.email || '',
 linkedin: item.linkedin || '',
 github: item.github || '',
 telegram: item.telegram || '',
 twitter: item.twitter || '',
 display_order: item.display_order || 0,
 status: item.status || 'active'
 });
 setModalOpen(true);
 };

 const handleSave = async (e: React.FormEvent) => {
 e.preventDefault();
 if (editItem) {
 await api.put(`/team/${editItem.id}`, formData);
 } else {
 await api.post('/team', formData);
 }
 setModalOpen(false);
 fetchTeam();
 };

 const handleDelete = async (id: number) => {
 if (confirm('Are you sure you want to remove this team member?')) {
 await api.delete(`/team/${id}`);
 fetchTeam();
 }
 };

 return (
 <>
 <AdminLayout title="Team & Executive Directory">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <p className="text-xs text-[#A9B4C5]">Manage executive leaders, engineers, and staff visible across the website.</p>
 <button
 onClick={openCreateModal}
 className="px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] text-xs font-medium text-white flex items-center gap-1.5 transition shadow-lg"
 >
 <Plus className="w-4 h-4" /> Add Team Member
 </button>
 </div>

 {loading ? (
 <div className="p-12 text-center text-xs text-gray-400">Loading team directory...</div>
 ) : team.length === 0 ? (
 <div className="p-12 text-center text-xs text-gray-400 bg-[#101C2F] border border-[#23344F] rounded-2xl">
 No team members created yet. Click "Add Team Member" to create one.
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {team.map((m) => (
 <div key={m.id} className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-5 flex flex-col justify-between space-y-4 relative group">
 <div className="space-y-3">
 <div className="flex items-center gap-3">
 <div className="w-14 h-14 rounded-full overflow-hidden bg-[#08111F] border border-[#23344F] shrink-0 flex items-center justify-center text-[#00A3FF]">
 {m.photo ? (
 <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
 ) : (
 <User className="w-7 h-7" />
 )}
 </div>
 <div className="min-w-0 flex-1">
 <h4 className="font-bold text-sm text-white truncate">{m.name}</h4>
 <p className="text-[#22C7FF] text-xs font-mono truncate">{m.position}</p>
 {m.email && <p className="text-[11px] text-[#A9B4C5] truncate">{m.email}</p>}
 </div>
 </div>

 <p className="text-xs text-[#A9B4C5] line-clamp-3 leading-relaxed">
 {m.bio || 'No bio provided.'}
 </p>
 </div>

 <div className="pt-3 border-t border-[#23344F] flex items-center justify-between">
 <div className="flex items-center gap-2 text-gray-400">
 {m.linkedin && <Linkedin className="w-3.5 h-3.5" />}
 {m.github && <Github className="w-3.5 h-3.5" />}
 {m.email && <Mail className="w-3.5 h-3.5" />}
 </div>
 <div className="flex items-center gap-2">
 <button onClick={() => openEditModal(m)} className="p-1.5 text-[#22C7FF] hover:bg-[#08111F] rounded-lg transition">
 <Edit2 className="w-4 h-4" />
 </button>
 <button onClick={() => handleDelete(m.id)} className="p-1.5 text-red-400 hover:bg-[#08111F] rounded-lg transition">
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </AdminLayout>

 {modalOpen && (
 <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-white relative">
 <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
 <X className="w-5 h-5" />
 </button>

 <h3 className="text-lg font-bold">{editItem ? 'Edit Team Member' : 'Add Executive Team Member'}</h3>

 <form onSubmit={handleSave} className="space-y-4 text-xs">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Full Name *</label>
 <input
 type="text"
 required
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 placeholder="e.g. Yonas Tadesse"
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
 />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Role / Position *</label>
 <input
 type="text"
 required
 value={formData.position}
 onChange={(e) => setFormData({ ...formData, position: e.target.value })}
 placeholder="e.g. Chief Executive Officer"
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white font-mono"
 />
 </div>
 </div>

 {/* Photo Upload or URL with Live Preview */}
 <ImageUploader
 label="Executive Headshot Photo"
 value={formData.photo}
 onChange={(url) => setFormData({ ...formData, photo: url })}
 helperText="Upload a profile photo file or paste an image URL."
 placeholder="https://images.unsplash.com/... or /uploads/..."
 />

 <div>
 <label className="block text-[#A9B4C5] mb-1">Bio / Description</label>
 <textarea
 rows={3}
 value={formData.bio}
 onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
 placeholder="Executive background, technical expertise, and role..."
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2.5 text-white"
 />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Email Address</label>
 <input
 type="email"
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 placeholder="yonas@nilepixel.com"
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
 />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">LinkedIn Profile</label>
 <input
 type="url"
 value={formData.linkedin}
 onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
 placeholder="https://linkedin.com/in/..."
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">GitHub Profile</label>
 <input
 type="url"
 value={formData.github}
 onChange={(e) => setFormData({ ...formData, github: e.target.value })}
 placeholder="https://github.com/..."
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
 />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Display Order</label>
 <input
 type="number"
 value={formData.display_order}
 onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white font-mono"
 />
 </div>
 </div>

 <button
 type="submit"
 className="w-full py-3 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] font-bold text-white transition shadow-lg"
 >
 {editItem ? 'Update Team Member' : 'Save Team Member'}
 </button>
 </form>
 </div>
 </div>
 )}
 </>
 );
};
