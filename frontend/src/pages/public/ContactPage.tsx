import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';

export const ContactPage: React.FC = () => {
 const [formData, setFormData] = useState({
 name: '',
 email: '',
 phone: '',
 company: '',
 budget: '$10k - $25k',
 service: 'Custom Software',
 message: ''
 });
 const [submitted, setSubmitted] = useState(false);
 const [sending, setSending] = useState(false);
  const [siteEmail, setSiteEmail] = useState('info@nilepixel.com');
  const [sitePhone, setSitePhone] = useState('+251982310974');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/settings').then(res => {
      if (res.success && res.data?.company) {
        if (res.data.company.email) setSiteEmail(res.data.company.email);
        if (res.data.company.phone) setSitePhone(res.data.company.phone);
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await api.post('/contact', formData);
      if (res && res.success) {
        setSubmitted(true);
      } else {
        alert(res?.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again later.');
    } finally {
      setSending(false);
    }
  };

 return (
 <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white space-y-12 relative">
 {/* Subtle grid background */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E59915_1px,transparent_1px),linear-gradient(to_bottom,#00E59915_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
 <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
 <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Let's Engineer Something Exceptional</h1>
 <p className="text-sm text-[#A9B4C5] leading-relaxed">
 Have an enterprise software requirement or AI project? Send us a message and our lead solution architects will reach out within 24 hours.
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
 <div className="lg:col-span-2 space-y-6 bg-[#101C2F] border border-[#23344F] rounded-2xl p-8">
 <h3 className="text-lg font-bold text-white">Contact HQ</h3>

 <div className="space-y-4 text-xs">
 <div className="flex items-start gap-3">
 <MapPin className="w-5 h-5 text-[#00A3FF] shrink-0 mt-0.5" />
 <div>
 <p className="font-bold text-white">Addis Ababa HQ</p>
 <p className="text-[#A9B4C5]">Bole Sub-City, Next to Millennium Hall, Addis Ababa, Ethiopia</p>
 </div>
 </div>

 <div className="flex items-center gap-3">
 <Mail className="w-5 h-5 text-[#00A3FF] shrink-0" />
 <div>
 <p className="font-bold text-white">Email Enquiries</p>
 {loading ? <Skeleton variant="text" width="120px" height="16px" /> : <p className="text-[#A9B4C5]">{siteEmail}</p>}
 </div>
 </div>

 <div className="flex items-center gap-3">
 <Phone className="w-5 h-5 text-[#00A3FF] shrink-0" />
 <div>
 <p className="font-bold text-white">Phone & WhatsApp</p>
 {loading ? <Skeleton variant="text" width="120px" height="16px" /> : <p className="text-[#A9B4C5]">{sitePhone}</p>}
 </div>
 </div>
 </div>
 </div>

 <div className="lg:col-span-3 bg-[#101C2F] border border-[#23344F] rounded-2xl p-8">
 {submitted ? (
 <div className="py-12 text-center space-y-4">
 <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto animate-bounce" />
 <h3 className="text-xl font-bold">Thank You!</h3>
 <p className="text-xs text-[#A9B4C5]">Your inquiry has been submitted successfully. Our engineering team will contact you shortly.</p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-4 text-xs">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Your Name *</label>
 <input
 type="text"
 required
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2.5 text-white"
 />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Email Address *</label>
 <input
 type="email"
 required
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2.5 text-white"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Phone Number</label>
 <input
 type="text"
 value={formData.phone}
 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2.5 text-white"
 />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Company / Organization</label>
 <input
 type="text"
 value={formData.company}
 onChange={(e) => setFormData({ ...formData, company: e.target.value })}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl px-3 py-2.5 text-white"
 />
 </div>
 </div>

 <div>
 <label className="block text-[#A9B4C5] mb-1">Project Details *</label>
 <textarea
 rows={4}
 required
 value={formData.message}
 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
 placeholder="Describe your functional goals, technical requirements, or timeline..."
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl p-3 text-white"
 />
 </div>

 <button
 type="submit"
 disabled={sending}
 className="w-full py-2.5 sm:py-3.5 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] font-bold text-white transition flex items-center justify-center gap-2 shadow-lg"
 >
 <Send className="w-4 h-4" /> {sending ? 'Sending...' : 'Submit Inquiry'}
 </button>
 </form>
 )}
 </div>
 </div>
 </div>
 );
};
