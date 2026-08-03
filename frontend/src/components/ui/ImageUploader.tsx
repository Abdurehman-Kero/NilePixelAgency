import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Loader2, Check } from 'lucide-react';
import { api } from '../../services/api';

interface ImageUploaderProps {
 label?: string;
 value: string;
 onChange: (url: string) => void;
 helperText?: string;
 placeholder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
 label = 'Image',
 value,
 onChange,
 helperText = 'Upload an image file directly or paste an external image URL.',
 placeholder = 'https://images.unsplash.com/... or /uploads/...'
}) => {
 const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
 const [uploading, setUploading] = useState(false);
 const [uploadError, setUploadError] = useState<string | null>(null);
 const [previewError, setPreviewError] = useState(false);

 const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 setUploading(true);
 setUploadError(null);
 setPreviewError(false);

 try {
 const formData = new FormData();
 formData.append('file', file);

 const res = await api.post('/media/upload', formData);
 const data = res.data as any;
 if (res.success && data?.file_path) {
 onChange(data.file_path);
 } else {
 setUploadError(res.message || 'Failed to upload image.');
 }
 } catch (err: any) {
 setUploadError(err.message || 'Error uploading file.');
 } finally {
 setUploading(false);
 }
 };

 const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 setPreviewError(false);
 onChange(e.target.value);
 };

 const handleClear = () => {
 onChange('');
 setPreviewError(false);
 setUploadError(null);
 };

 return (
 <div className="space-y-2 text-xs">
 <div className="flex items-center justify-between">
 <label className="block text-[#A9B4C5] font-medium">{label}</label>
 <div className="flex items-center gap-1 bg-[#08111F] p-0.5 rounded-lg border border-[#23344F]">
 <button
 type="button"
 onClick={() => setActiveTab('upload')}
 className={`px-2.5 py-1 rounded-md text-[11px] transition flex items-center gap-1.5 ${
 activeTab === 'upload' ? 'bg-[#0F6FFF] text-white font-medium' : 'text-[#A9B4C5] hover:text-white'
 }`}
 >
 <Upload className="w-3 h-3" /> File Upload
 </button>
 <button
 type="button"
 onClick={() => setActiveTab('url')}
 className={`px-2.5 py-1 rounded-md text-[11px] transition flex items-center gap-1.5 ${
 activeTab === 'url' ? 'bg-[#0F6FFF] text-white font-medium' : 'text-[#A9B4C5] hover:text-white'
 }`}
 >
 <LinkIcon className="w-3 h-3" /> Image URL
 </button>
 </div>
 </div>

 {activeTab === 'upload' ? (
 <div className="relative">
 <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#23344F] hover:border-[#0F6FFF] rounded-xl cursor-pointer bg-[#08111F]/50 transition group">
 <input
 type="file"
 accept="image/*"
 onChange={handleFileChange}
 disabled={uploading}
 className="hidden"
 />
 {uploading ? (
 <div className="flex items-center gap-2 text-[#00A3FF]">
 <Loader2 className="w-5 h-5 animate-spin" />
 <span className="font-medium">Uploading image...</span>
 </div>
 ) : (
 <div className="flex flex-col items-center gap-1.5 text-center">
 <div className="p-2 rounded-lg bg-[#101C2F] text-[#00A3FF] group-hover:scale-110 transition">
 <Upload className="w-5 h-5" />
 </div>
 <div>
 <span className="text-white font-medium">Click to choose image file</span>
 <span className="text-[#A9B4C5] block text-[10px] mt-0.5">PNG, JPG, WEBP, GIF or SVG (Max 10MB)</span>
 </div>
 </div>
 )}
 </label>
 </div>
 ) : (
 <div>
 <input
 type="url"
 value={value}
 onChange={handleUrlChange}
 placeholder={placeholder}
 className="w-full bg-[#08111F] border border-[#23344F] focus:border-[#0F6FFF] rounded-xl px-3 py-2 text-white font-mono placeholder:text-gray-600 outline-none transition"
 />
 </div>
 )}

 {uploadError && (
 <p className="text-red-400 text-[11px] font-medium">{uploadError}</p>
 )}

 {/* Live Preview Box */}
 {value ? (
 <div className="mt-2 p-3 bg-[#08111F] border border-[#23344F] rounded-xl space-y-2">
 <div className="flex items-center justify-between text-[11px]">
 <span className="text-green-400 font-medium flex items-center gap-1">
 <Check className="w-3.5 h-3.5" /> Instant Image Preview
 </span>
 <button
 type="button"
 onClick={handleClear}
 className="text-red-400 hover:text-red-300 flex items-center gap-1 font-medium hover:underline"
 >
 <X className="w-3.5 h-3.5" /> Remove Image
 </button>
 </div>
 <div className="relative aspect-video max-h-48 w-full bg-[#101C2F] rounded-lg overflow-hidden flex items-center justify-center border border-[#23344F]">
 {!previewError ? (
 <img
 src={value}
 alt="Uploaded preview"
 onError={() => setPreviewError(true)}
 className="w-full h-full object-contain"
 />
 ) : (
 <div className="flex flex-col items-center gap-1 text-gray-400 p-4 text-center">
 <ImageIcon className="w-8 h-8 opacity-40" />
 <span className="text-[11px]">Unable to render image preview</span>
 <span className="text-[10px] text-gray-500 font-mono break-all line-clamp-1">{value}</span>
 </div>
 )}
 </div>
 </div>
 ) : (
 <p className="text-[10px] text-gray-500">{helperText}</p>
 )}
 </div>
 );
};
