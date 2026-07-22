import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Star, User } from 'lucide-react';

export const TestimonialsCMS: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    client_name: '',
    position: '',
    company: '',
    photo: '',
    message: '',
    rating: 5,
    featured: true
  });

  const fetchList = async () => {
    setLoading(true);
    const res = await api.get('/testimonials');
    if (res.success) setList(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const openCreateModal = () => {
    setEditItem(null);
    setFormData({ client_name: '', position: '', company: '', photo: '', message: '', rating: 5, featured: true });
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditItem(item);
    setFormData({
      client_name: item.client_name || '',
      position: item.position || '',
      company: item.company || '',
      photo: item.photo || '',
      message: item.message || '',
      rating: item.rating || 5,
      featured: Boolean(item.featured)
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      await api.put(`/testimonials/${editItem.id}`, formData);
    } else {
      await api.post('/testimonials', formData);
    }
    setModalOpen(false);
    fetchList();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this testimonial?')) {
      await api.delete(`/testimonials/${id}`);
      fetchList();
    }
  };

  return (
    <>
      <AdminLayout title="Client Endorsements & Testimonials">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#A9B4C5]">Manage client reviews and enterprise recommendations.</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] text-xs font-medium text-white flex items-center gap-1.5 transition shadow-lg"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-gray-400">Loading testimonials...</div>
          ) : list.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400 bg-[#101C2F] border border-[#23344F] rounded-2xl">
              No testimonials created yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {list.map((t) => (
                <div key={t.id} className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-5 space-y-3 relative group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#08111F] border border-[#23344F] shrink-0 flex items-center justify-center text-[#00A3FF]">
                        {t.photo ? (
                          <img src={t.photo} alt={t.client_name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{t.client_name}</p>
                        <p className="text-xs text-[#22C7FF]">{t.position}{t.company ? ` • ${t.company}` : ''}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(t)} className="p-1.5 text-[#22C7FF] hover:bg-[#08111F] rounded-lg transition">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-1.5 text-red-400 hover:bg-[#08111F] rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#A9B4C5] italic leading-relaxed">"{t.message}"</p>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminLayout>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-white relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold">{editItem ? 'Edit Testimonial' : 'Add Client Endorsement'}</h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#A9B4C5] mb-1">Position / Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. CTO at Nexus Corp"
                    className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <ImageUploader
                label="Client Avatar / Photo"
                value={formData.photo}
                onChange={(url) => setFormData({ ...formData, photo: url })}
                helperText="Upload a client photo file or paste an image URL."
                placeholder="https://images.unsplash.com/... or /uploads/..."
              />

              <div>
                <label className="block text-[#A9B4C5] mb-1">Endorsement Message *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] font-bold text-white transition shadow-lg"
              >
                {editItem ? 'Update Testimonial' : 'Save Testimonial'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
