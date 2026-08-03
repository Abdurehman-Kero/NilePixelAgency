import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const BlogCMS: React.FC = () => {
 const [posts, setPosts] = useState<any[]>([]);
 const [categories, setCategories] = useState<any[]>([]);
 const [modalOpen, setModalOpen] = useState(false);
 const [editItem, setEditItem] = useState<any>(null);

 const [formData, setFormData] = useState({
 title: '',
 slug: '',
 category_id: '',
 excerpt: '',
 content: '',
 cover_image: '',
 author_name: 'Yonas Tadesse',
 reading_time: '5 min read',
 published: true
 });

 const fetchPosts = async () => {
 const res = await api.get('/blog');
 if (res.success) setPosts(res.data || []);
 };

 useEffect(() => {
 fetchPosts();
 api.get('/categories').then(res => {
 if (res.success && res.data) {
 setCategories(res.data.filter((c: any) => c.type === 'blog'));
 }
 });
 }, []);

 const openCreateModal = () => {
 setEditItem(null);
 setFormData({ title: '', slug: '', category_id: categories[0]?.id || '', excerpt: '', content: '', cover_image: '', author_name: 'Yonas Tadesse', reading_time: '5 min read', published: true });
 setModalOpen(true);
 };

 const openEditModal = (item: any) => {
 setEditItem(item);
 setFormData({
 title: item.title,
 slug: item.slug,
 category_id: item.category_id || '',
 excerpt: item.excerpt || '',
 content: item.content || '',
 cover_image: item.cover_image || '',
 author_name: item.author_name || 'Yonas Tadesse',
 reading_time: item.reading_time || '5 min read',
 published: Boolean(item.published)
 });
 setModalOpen(true);
 };

 const handleSave = async (e: React.FormEvent) => {
 e.preventDefault();
 if (editItem) {
 await api.put(`/blog/${editItem.id}`, formData);
 } else {
 await api.post('/blog', formData);
 }
 setModalOpen(false);
 fetchPosts();
 };

 const handleDelete = async (id: number) => {
 if (confirm('Delete this article?')) {
 await api.delete(`/blog/${id}`);
 fetchPosts();
 }
 };

 return (
 <>
 <AdminLayout title="Blog & Insights CMS">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <p className="text-xs text-[#A9B4C5]">Publish engineering whitepapers, research, and technical articles.</p>
 <button
 onClick={openCreateModal}
 className="px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] text-xs font-medium text-white flex items-center gap-1.5 transition shadow-lg"
 >
 <Plus className="w-4 h-4" /> Create Article
 </button>
 </div>

 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-xs text-[#A9B4C5]">
 <thead className="bg-[#08111F] text-white uppercase font-mono border-b border-[#23344F]">
 <tr>
 <th className="p-3">Article Title</th>
 <th className="p-3">Author</th>
 <th className="p-3">Status</th>
 <th className="p-3 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-[#23344F]">
 {posts.map(p => (
 <tr key={p.id} className="hover:bg-[#162235]">
 <td className="p-3">
 <p className="font-bold text-white">{p.title}</p>
 <p className="text-[10px] text-gray-400">/{p.slug}</p>
 </td>
 <td className="p-3 text-white font-medium">{p.author_name}</td>
 <td className="p-3 font-mono">{p.published ? <span className="text-green-400">Published</span> : 'Draft'}</td>
 <td className="p-3 text-right space-x-2">
 <button onClick={() => openEditModal(p)} className="p-1.5 text-[#22C7FF] hover:bg-[#08111F] rounded-lg">
 <Edit2 className="w-4 h-4" />
 </button>
 <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-400 hover:bg-[#08111F] rounded-lg">
 <Trash2 className="w-4 h-4" />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </AdminLayout>

 {modalOpen && (
 <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-white relative">
 <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
 <X className="w-5 h-5" />
 </button>
 <h3 className="text-lg font-bold">{editItem ? 'Edit Article' : 'Write New Article'}</h3>
 <form onSubmit={handleSave} className="space-y-4 text-xs">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Title *</label>
 <input
 type="text" required value={formData.title}
 onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
 />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Slug *</label>
 <input
 type="text" required value={formData.slug}
 onChange={e => setFormData({ ...formData, slug: e.target.value })}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white font-mono"
 />
 </div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Category</label>
 <select
 value={formData.category_id}
 onChange={e => setFormData({ ...formData, category_id: e.target.value })}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white outline-none"
 >
 <option value="">Select Category</option>
 {categories.map((c: any) => (
 <option key={c.id} value={c.id}>{c.name}</option>
 ))}
 </select>
 </div>
 </div>
 <ImageUploader
 label="Article Cover Image"
 value={formData.cover_image}
 onChange={(url) => setFormData({ ...formData, cover_image: url })}
 helperText="Upload an article cover image or paste an image URL."
 placeholder="https://images.unsplash.com/... or /uploads/..."
 />

 <div>
 <label className="block text-[#A9B4C5] mb-1">Excerpt *</label>
 <textarea rows={2} required value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Content Markdown/Text *</label>
 <textarea rows={6} required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2 text-white font-mono" />
 </div>
 <button type="submit" className="w-full py-3 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] font-bold text-white">
 Publish Article
 </button>
 </form>
 </div>
 </div>
 )}
 </>
 );
};
