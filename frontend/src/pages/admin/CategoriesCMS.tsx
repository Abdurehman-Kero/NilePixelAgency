import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { api } from '../../services/api';
import { Plus, Tags, Trash2 } from 'lucide-react';

export const CategoriesCMS: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

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
    await api.post('/categories', { name, slug: slug || name.toLowerCase().replace(/\s+/g, '-') });
    setName('');
    setSlug('');
    fetchCategories();
  };

  return (
    <AdminLayout title="Project & Service Categories">
          <form onSubmit={handleCreate} className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Tags className="w-4 h-4 text-[#00A3FF]" /> Add New Category
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <button type="submit" className="px-4 py-2 bg-[#0F6FFF] rounded-xl font-bold text-white">
              Save Category
            </button>
          </form>

          <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 text-xs space-y-3">
            <h4 className="font-bold text-sm text-white">Existing Categories</h4>
            <div className="divide-y divide-[#23344F]">
              {categories.map((c) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">{c.name}</span>
                    <span className="ml-3 font-mono text-[10px] text-[#00A3FF]">{c.slug}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminLayout>
  );
};
