import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Briefcase, MapPin, Clock, ArrowRight, X } from 'lucide-react';

export const CareersPage: React.FC = () => {
 const [careers, setCareers] = useState<any[]>([]);
 const [selectedJob, setSelectedJob] = useState<any | null>(null);
 
 const [formData, setFormData] = useState({
 applicant_name: '',
 email: '',
 phone: '',
 telegram_username: '',
 resume_url: '',
 portfolio_url: '',
 linkedin_url: '',
 github_url: '',
 cover_letter: ''
 });
 const [submitting, setSubmitting] = useState(false);
 const [success, setSuccess] = useState(false);

 useEffect(() => {
 api.get('/careers').then((res) => {
 if (res.success && res.data?.length > 0) {
 const now = new Date().getTime();
 const validJobs = res.data.filter((j: any) => {
 if (j.status !== 'open') return false;
 if (j.expire_date && new Date(j.expire_date + 'T23:59:59').getTime() < now) return false;
 return true;
 });
 setCareers(validJobs);
 }
 });
 }, []);

 const handleApply = (job: any) => {
 setSelectedJob(job);
 setSuccess(false);
 setFormData({
 applicant_name: '', email: '', phone: '', telegram_username: '', resume_url: '',
 portfolio_url: '', linkedin_url: '', github_url: '', cover_letter: ''
 });
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitting(true);
 try {
 const res = await api.post('/applications', {
 ...formData,
 career_id: selectedJob.id
 });
 if (res.success) {
 setSuccess(true);
 }
 } catch (err) {
 console.error(err);
 alert('Failed to submit application.');
 } finally {
 setSubmitting(false);
 }
 };

 return (
 <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 text-white relative">
 {/* Subtle grid background */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E59915_1px,transparent_1px),linear-gradient(to_bottom,#00E59915_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
 <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
 <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Join NilePixel Technologies</h1>
 <p className="text-sm text-[#A9B4C5] leading-relaxed">
 We are building the next generation of cloud software and AI intelligence across Africa.
 </p>
 </div>

 <div className="space-y-4">
 {careers.length === 0 ? (
 <div className="text-center p-12 bg-[#101C2F] border border-[#23344F] rounded-2xl">
 <h3 className="text-lg font-bold text-white mb-2">No Open Roles Right Now</h3>
 <p className="text-[#A9B4C5] text-sm">Please check back later or follow us on LinkedIn for updates.</p>
 </div>
 ) : (
 careers.map((job) => (
 <div key={job.id} className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#0F6FFF] transition">
 <div className="space-y-2">
 <h3 className="text-base font-bold text-white">{job.job_title}</h3>
 <div className="flex flex-wrap items-center gap-4 text-xs text-[#A9B4C5]">
 <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#00A3FF]" /> {job.location}</span>
 <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#00A3FF]" /> {job.employment_type}</span>
 <span className="px-2 py-0.5 rounded bg-[#08111F] text-[#00A3FF] border border-[#23344F] text-[10px] font-mono">{job.department}</span>
 </div>
 <p className="text-xs text-[#A9B4C5] leading-relaxed">{job.description}</p>
 </div>

 <button onClick={() => handleApply(job)} className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] text-xs font-semibold text-white whitespace-nowrap self-start sm:self-center transition-colors">
 Apply Position
 </button>
 </div>
 ))
 )}
 </div>

 {/* Application Modal */}
 {selectedJob && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
 <div className="bg-[#0A1220] border border-[#1B2B44] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
 <button onClick={() => setSelectedJob(null)} className="absolute top-6 right-6 text-[#A9B4C5] hover:text-white transition-colors">
 <X className="w-6 h-6" />
 </button>
 
 <div>
 <h2 className="text-2xl font-bold text-white mb-1">Apply for {selectedJob.job_title}</h2>
 <p className="text-sm text-[#00A3FF]">{selectedJob.location} • {selectedJob.employment_type}</p>
 </div>

 {success ? (
 <div className="bg-[#00E599]/10 border border-[#00E599]/20 p-6 rounded-xl text-center space-y-3">
 <div className="w-12 h-12 bg-[#00E599] rounded-full flex items-center justify-center mx-auto mb-4">
 <Briefcase className="w-6 h-6 text-[#0A1220]" />
 </div>
 <h3 className="text-xl font-bold text-white">Application Received!</h3>
 <p className="text-[#A9B4C5] text-sm">Thank you for applying. Our talent team will review your application and be in touch soon.</p>
 <button onClick={() => setSelectedJob(null)} className="mt-4 px-3 py-1 sm:px-4 sm:py-1.5 sm:px-6 sm:py-2 bg-[#1B2B44] hover:bg-[#23344F] text-white rounded-lg font-semibold transition-colors">
 Close
 </button>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-4 text-sm">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1.5 font-medium">Full Name *</label>
 <input required type="text" value={formData.applicant_name} onChange={e=>setFormData({...formData, applicant_name: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-1.5 sm:px-4 sm:py-2.5 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1.5 font-medium">Email Address *</label>
 <input required type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-1.5 sm:px-4 sm:py-2.5 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1.5 font-medium">Phone Number</label>
 <input type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-1.5 sm:px-4 sm:py-2.5 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1.5 font-medium">Telegram Username</label>
 <input type="text" placeholder="@username" value={formData.telegram_username} onChange={e=>setFormData({...formData, telegram_username: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-1.5 sm:px-4 sm:py-2.5 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1.5 font-medium">Resume/CV URL *</label>
 <input required type="url" placeholder="Link to Google Drive, Dropbox, etc." value={formData.resume_url} onChange={e=>setFormData({...formData, resume_url: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-1.5 sm:px-4 sm:py-2.5 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1.5 font-medium">Portfolio URL</label>
 <input type="url" value={formData.portfolio_url} onChange={e=>setFormData({...formData, portfolio_url: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-1.5 sm:px-4 sm:py-2.5 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1.5 font-medium">LinkedIn Profile</label>
 <input type="url" value={formData.linkedin_url} onChange={e=>setFormData({...formData, linkedin_url: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-1.5 sm:px-4 sm:py-2.5 text-white" />
 </div>
 </div>

 <div>
 <label className="block text-[#A9B4C5] mb-1.5 font-medium">Cover Letter / Notes</label>
 <textarea rows={4} value={formData.cover_letter} onChange={e=>setFormData({...formData, cover_letter: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-4 py-3 text-white placeholder-[#A9B4C5]/50" placeholder="Tell us why you're a great fit..."></textarea>
 </div>

 <div className="pt-4 flex justify-end gap-3">
 <button type="button" onClick={() => setSelectedJob(null)} className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold text-white hover:bg-[#1B2B44] transition-colors">
 Cancel
 </button>
 <button type="submit" disabled={submitting} className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold bg-[#00E599] text-[#0A1220] hover:bg-[#00E599]/90 transition-colors disabled:opacity-50">
 {submitting ? 'Submitting...' : 'Submit Application'}
 </button>
 </div>
 </form>
 )}
 </div>
 </div>
 )}
 </div>
 );
};
