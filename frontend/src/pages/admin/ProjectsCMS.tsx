import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, CheckCircle, ExternalLink } from 'lucide-react';

export const ProjectsCMS: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client_name: '',
    industry: '',
    category_id: '',
    cover_image: '',
    short_description: '',
    full_description: '',
    challenge: '',
    solution: '',
    result: '',
    live_url: '',
    github_url: '',
    featured: false
  });

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    if (res.success) setProjects(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
    api.get('/categories').then(res => {
      if (res.success && res.data) {
        const list = res.data as any[];
        setCategories(list.filter((c: any) => c.type === 'project'));
      }
    });
  }, []);

  const openCreateModal = () => {
    setEditItem(null);
    setFormData({
      title: '', slug: '', client_name: '', industry: '', category_id: categories[0]?.id || '',
      cover_image: '', short_description: '', full_description: '', challenge: '', solution: '',
      result: '', live_url: '', github_url: '', featured: false
    });
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      client_name: item.client_name || '',
      industry: item.industry || '',
      category_id: item.category_id || '',
      cover_image: item.cover_image || '',
      short_description: item.short_description || '',
      full_description: item.full_description || '',
      challenge: item.challenge || '',
      solution: item.solution || '',
      result: item.result || '',
      live_url: item.live_url || '',
      github_url: item.github_url || '',
      featured: Boolean(item.featured)
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      await api.put(`/projects/${editItem.id}`, formData);
    } else {
      await api.post('/projects', formData);
    }
    setModalOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  return (
    <>
      <AdminLayout title="Projects & Case Studies Management">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#A9B4C5]">Manage, edit, and publish enterprise case study portfolio entries.</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] text-xs font-medium text-white flex items-center gap-1.5 transition shadow-lg"
            >
              <Plus className="w-4 h-4" /> Add Case Study
            </button>
          </div>

          <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs text-[#A9B4C5]">
              <thead className="bg-[#08111F] text-white uppercase font-mono border-b border-[#23344F]">
                <tr>
                  <th className="p-3">Title & Client</th>
                  <th className="p-3">Industry</th>
                  <th className="p-3">Featured</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23344F]">
                {projects.map(p => (
                  <tr key={p.id} className="hover:bg-[#162235]">
                    <td className="p-3">
                      <p className="font-bold text-white">{p.title}</p>
                      <p className="text-[10px] text-gray-400">/{p.slug} • {p.client_name || 'N/A'}</p>
                    </td>
                    <td className="p-3 font-mono text-[#22C7FF]">{p.industry || 'Tech'}</td>
                    <td className="p-3">{p.featured ? <span className="text-green-400 font-bold">Yes</span> : 'No'}</td>
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-white relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold">{editItem ? 'Edit Project Entry' : 'Create New Case Study'}</h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Title *</label>
                  <input
                    type="text" required value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#A9B4C5] mb-1">URL Slug *</label>
                  <input
                    type="text" required value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Client Name</label>
                  <input
                    type="text" value={formData.client_name}
                    onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Industry</label>
                  <input
                    type="text" value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
                  />
                </div>
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
                label="Cover / Thumbnail Image"
                value={formData.cover_image}
                onChange={(url) => setFormData({ ...formData, cover_image: url })}
                helperText="Upload a high-resolution project screenshot or enter an image URL."
                placeholder="https://images.unsplash.com/... or /uploads/..."
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Live Demo URL</label>
                  <input
                    type="url" value={formData.live_url}
                    onChange={e => setFormData({ ...formData, live_url: e.target.value })}
                    className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-[#A9B4C5] mb-1">GitHub URL (Optional)</label>
                  <input
                    type="url" value={formData.github_url}
                    onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                    className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A9B4C5] mb-1">Short Summary *</label>
                <textarea
                  rows={2} required value={formData.short_description}
                  onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Challenge</label>
                  <textarea rows={2} value={formData.challenge} onChange={e => setFormData({ ...formData, challenge: e.target.value })} className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Solution</label>
                  <textarea rows={2} value={formData.solution} onChange={e => setFormData({ ...formData, solution: e.target.value })} className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2 text-white" />
                </div>
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Outcome</label>
                  <textarea rows={2} value={formData.result} onChange={e => setFormData({ ...formData, result: e.target.value })} className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2 text-white" />
                </div>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] font-bold text-white">
                Save Case Study
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
