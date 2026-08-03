import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const ServicesCMS: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    short_description: '',
    full_description: '',
    icon: '',
    image: ''
  });

  const fetchServices = async () => {
    const res = await api.get('/services');
    if (res.success) setServices(res.data || []);
  };

  useEffect(() => {
    fetchServices();
    api.get('/categories').then(res => {
      if (res.success && res.data) {
        setCategories(res.data.filter((c: any) => c.type === 'service'));
      }
    });
  }, []);

  const openCreateModal = () => {
    setEditItem(null);
    setFormData({ title: '', slug: '', category_id: categories[0]?.id || '', short_description: '', full_description: '', icon: '', image: '' });
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      category_id: item.category_id || '',
      short_description: item.short_description || '',
      full_description: item.full_description || '',
      icon: item.icon || '',
      image: item.image || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      await api.put(`/services/${editItem.id}`, formData);
    } else {
      await api.post('/services', formData);
    }
    setModalOpen(false);
    fetchServices();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await api.delete(`/services/${id}`);
      fetchServices();
    }
  };

  return (
    <>
      <AdminLayout title="Services Specification Management">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#A9B4C5]">Manage software engineering services, descriptions, and capabilities.</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] text-xs font-medium text-white flex items-center gap-1.5 transition shadow-lg"
            >
              <Plus className="w-4 h-4" /> Add Service Entry
            </button>
          </div>

          <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs text-[#A9B4C5]">
              <thead className="bg-[#08111F] text-white uppercase font-mono border-b border-[#23344F]">
                <tr>
                  <th className="p-3">Service Name</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23344F]">
                {services.map(s => (
                  <tr key={s.id} className="hover:bg-[#162235]">
                    <td className="p-3">
                      <p className="font-bold text-white">{s.title}</p>
                      <p className="text-[10px] text-gray-400 line-clamp-1">{s.short_description}</p>
                    </td>
                    <td className="p-3 font-mono text-[#22C7FF]">/{s.slug}</td>
                    <td className="p-3 text-right space-x-2">
                      <button onClick={() => openEditModal(s)} className="p-1.5 text-[#22C7FF] hover:bg-[#08111F] rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 text-red-400 hover:bg-[#08111F] rounded-lg">
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
            <h3 className="text-lg font-bold">{editItem ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
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
              <div className="grid grid-cols-2 gap-4">
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
                label="Service Banner / Illustration Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                helperText="Upload a service graphic file or enter an image URL."
                placeholder="https://images.unsplash.com/... or /uploads/..."
              />

              <div>
                <label className="block text-[#A9B4C5] mb-1">Short Description *</label>
                <textarea
                  rows={2} required value={formData.short_description}
                  onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A9B4C5] mb-1">Full Description</label>
                <textarea
                  rows={4} value={formData.full_description}
                  onChange={e => setFormData({ ...formData, full_description: e.target.value })}
                  className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2 text-white"
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] font-bold text-white">
                Save Service Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
