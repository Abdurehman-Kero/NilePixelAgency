import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { api } from '../../services/api';
import { Trash2, Copy, Check, Plus, ImageIcon } from 'lucide-react';

export const MediaCMS: React.FC = () => {
 const [media, setMedia] = useState<any[]>([]);
 const [copiedId, setCopiedId] = useState<number | null>(null);
 const [newAssetUrl, setNewAssetUrl] = useState('');

 const fetchMedia = async () => {
 const res = await api.get('/media');
 if (res.success) setMedia(res.data || []);
 };

 useEffect(() => {
 fetchMedia();
 }, []);

 const copyToClipboard = (url: string, id: number) => {
 navigator.clipboard.writeText(url);
 setCopiedId(id);
 setTimeout(() => setCopiedId(null), 2000);
 };

 const handleDelete = async (id: number) => {
 if (confirm('Delete media asset?')) {
 await api.delete(`/media/${id}`);
 fetchMedia();
 }
 };

 const handleAddUrlAsset = () => {
 if (!newAssetUrl) return;
 fetchMedia();
 setNewAssetUrl('');
 };

 return (
 <>
 <AdminLayout title="Media Asset Library">
 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 text-xs space-y-4">
 <h3 className="font-bold text-sm text-white">Upload or Add Media Asset</h3>
 <ImageUploader
 label="Asset File / Remote URL"
 value={newAssetUrl}
 onChange={(url) => {
 setNewAssetUrl(url);
 fetchMedia();
 }}
 helperText="Upload an image file directly or paste a URL. Assets appear instantly below."
 />
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {media.map((m) => {
 const src = m.file_path || m.url || m.filename;
 return (
 <div key={m.id} className="bg-[#101C2F] border border-[#23344F] rounded-xl p-3 space-y-2 text-xs flex flex-col justify-between">
 <div className="h-36 bg-[#08111F] rounded-lg overflow-hidden flex items-center justify-center relative border border-[#23344F]">
 {src ? (
 <img src={src} alt={m.original_name || 'Media Asset'} className="w-full h-full object-cover" />
 ) : (
 <ImageIcon className="w-8 h-8 text-gray-500" />
 )}
 </div>
 <div>
 <p className="font-mono text-[10px] text-gray-300 truncate font-semibold">{m.original_name || m.filename || 'Asset'}</p>
 <p className="font-mono text-[9px] text-gray-500 truncate">{src}</p>
 </div>
 <div className="flex justify-between items-center pt-2 border-t border-[#23344F]">
 <button
 onClick={() => copyToClipboard(src, m.id)}
 className="text-[#22C7FF] hover:text-white flex items-center gap-1 text-[11px] font-medium transition"
 >
 {copiedId === m.id ? (
 <span className="text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied!</span>
 ) : (
 <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy Link</span>
 )}
 </button>
 <button onClick={() => handleDelete(m.id)} className="text-red-400 hover:text-red-300 p-1">
 <Trash2 className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>
 );
 })}
 </div>
 </AdminLayout>
 </>
 );
};
