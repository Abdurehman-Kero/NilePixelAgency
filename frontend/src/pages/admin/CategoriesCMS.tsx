import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { api } from '../../services/api';
import { Plus, Tags, Trash2 } from 'lucide-react';

export const CategoriesCMS: React.FC = () => {
 const [categories, setCategories] = useState<any[]>([]);
 const [name, setName] = useState('');
 const [slug, setSlug] = useState('');
 const [type, setType] = useState('project');

 const fetchCategories = async () => {
 const res = await api.get('/categories');
 if (res.success) setCategories(res.data || []);
 };

 useEffect(() => {
 fetchCategories();
 }, []);

 const handleCreate = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!name) return;
 await api.post('/categories', { type, name, slug: slug || name.toLowerCase().replace(/\s+/g, '-') });
 setName('');
 setSlug('');
 setType('project');
 fetchCategories();
 };

 const handleDelete = async (id: number) => {
 if (window.confirm('Are you sure you want to delete this category?')) {
 await api.delete(`/categories/${id}`);
 fetchCategories();
 }
 };

 return (
 <AdminLayout title="Project & Service Categories">
 <form onSubmit={handleCreate} className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 space-y-4 text-xs">
 <h3 className="font-bold text-sm text-white flex items-center gap-2">
 <Tags className="w-4 h-4 text-[#00A3FF]" /> Add New Category
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Category Type *</label>
 <select
 value={type}
 onChange={(e) => setType(e.target.value)}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white outline-none"
 >
 <option value="project">Project Category</option>
 <option value="service">Service Category</option>
 <option value="blog">Blog Category</option>
 </select>
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Category Name *</label>
 <input
 type="text"
 required
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="e.g. Artificial Intelligence"
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
 />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Slug (URL string)</label>
 <input
 type="text"
 value={slug}
 onChange={(e) => setSlug(e.target.value)}
 placeholder="e.g. artificial-intelligence"
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white font-mono"
 />
 </div>
 </div>
 <button type="submit" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0F6FFF] rounded-xl font-bold text-white">
 Save Category
 </button>
 </form>

 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 text-xs space-y-3">
 <h4 className="font-bold text-sm text-white">Existing Categories</h4>
 <div className="divide-y divide-[#23344F]">
 {categories.map((c) => (
 <div key={c.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 <div>
 <span className="font-bold text-white">{c.name}</span>
 <span className="ml-3 font-mono text-[10px] bg-[#23344F] text-white px-2 py-0.5 rounded uppercase tracking-wider">{c.type}</span>
 <span className="ml-3 font-mono text-[10px] text-[#00A3FF]">{c.slug}</span>
 </div>
 <button onClick={() => handleDelete(c.id)} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors">
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 ))}
 </div>
 </div>
 </AdminLayout>
 );
};
