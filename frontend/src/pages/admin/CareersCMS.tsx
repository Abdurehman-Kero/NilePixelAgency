import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/ui/AdminLayout';
import { api } from '../../services/api';
import { Plus, Briefcase, MapPin, Edit, Trash2, Calendar, Users, X, Eye } from 'lucide-react';

export const CareersCMS: React.FC = () => {
 const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
 const [careers, setCareers] = useState<any[]>([]);
 const [applications, setApplications] = useState<any[]>([]);
 
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [editingJob, setEditingJob] = useState<any | null>(null);

 const [isAppModalOpen, setIsAppModalOpen] = useState(false);
 const [viewingApp, setViewingApp] = useState<any | null>(null);

 const [formData, setFormData] = useState({
 job_title: '',
 department: '',
 employment_type: 'Full-time',
 location: 'Remote',
 description: '',
 requirements: '',
 responsibilities: '',
 salary: '',
 expire_date: '',
 status: 'open'
 });

 const fetchData = async () => {
 try {
 const resCareers = await api.get('/careers');
 if (resCareers.success) setCareers(resCareers.data || []);
 
 const resApps = await api.get('/applications');
 if (resApps.success) setApplications(resApps.data || []);
 } catch (err) {
 console.error(err);
 }
 };

 useEffect(() => {
 fetchData();
 }, []);

 const openModal = (job: any = null) => {
 setEditingJob(job);
 if (job) {
 setFormData({
 job_title: job.job_title || '',
 department: job.department || '',
 employment_type: job.employment_type || 'Full-time',
 location: job.location || 'Remote',
 description: job.description || '',
 requirements: job.requirements || '',
 responsibilities: job.responsibilities || '',
 salary: job.salary || '',
 expire_date: job.expire_date ? job.expire_date.split('T')[0] : '',
 status: job.status || 'open'
 });
 } else {
 setFormData({
 job_title: '', department: '', employment_type: 'Full-time', location: 'Remote',
 description: '', requirements: '', responsibilities: '', salary: '', expire_date: '', status: 'open'
 });
 }
 setIsModalOpen(true);
 };

 const handleSave = async (e: React.FormEvent) => {
 e.preventDefault();
 try {
 if (editingJob) {
 await api.put(`/careers/${editingJob.id}`, formData);
 } else {
 await api.post('/careers', formData);
 }
 setIsModalOpen(false);
 fetchData();
 } catch (err) {
 console.error(err);
 alert('Error saving job.');
 }
 };

 const handleDelete = async (id: number) => {
 if (window.confirm('Are you sure you want to delete this job posting?')) {
 await api.delete(`/careers/${id}`);
 fetchData();
 }
 };

 const openAppModal = (app: any) => {
 setViewingApp(app);
 setIsAppModalOpen(true);
 };

 const handleUpdateAppStatus = async (id: number, status: string) => {
 try {
 await api.put(`/applications/${id}`, { status });
 setViewingApp((prev: any) => ({ ...prev, status }));
 fetchData();
 } catch (err) {
 console.error(err);
 alert('Error updating application status.');
 }
 };

 return (
 <AdminLayout title="Careers & Job Postings">
 <div className="flex gap-4 mb-6">
 <button 
 onClick={() => setActiveTab('jobs')}
 className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-colors ${activeTab === 'jobs' ? 'bg-[#00E599] text-[#0A1220]' : 'bg-[#1B2B44] text-white hover:bg-[#23344F]'}`}
 >
 Job Postings
 </button>
 <button 
 onClick={() => setActiveTab('applications')}
 className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-colors ${activeTab === 'applications' ? 'bg-[#00E599] text-[#0A1220]' : 'bg-[#1B2B44] text-white hover:bg-[#23344F]'}`}
 >
 Applications
 </button>
 </div>

 {activeTab === 'jobs' && (
 <div className="space-y-6">
 <div className="flex justify-between items-center">
 <h3 className="text-white font-bold">All Postings</h3>
 <button onClick={() => openModal()} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0F6FFF] hover:bg-[#0F6FFF]/90 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors">
 <Plus className="w-4 h-4" /> Post New Job
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {careers.map((j) => (
 <div key={j.id} className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-5 text-xs space-y-4">
 <div className="flex justify-between items-start">
 <div>
 <h4 className="font-bold text-sm text-white mb-1">{j.job_title}</h4>
 <p className="text-[#00A3FF] font-medium flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> {j.department} • {j.employment_type}</p>
 </div>
 <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${j.status === 'open' ? 'bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
 {j.status.toUpperCase()}
 </div>
 </div>
 
 <div className="flex flex-col gap-1 text-[#A9B4C5]">
 <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {j.location}</p>
 {j.expire_date && <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Expires: {new Date(j.expire_date).toLocaleDateString()}</p>}
 </div>
 
 <div className="pt-3 border-t border-[#23344F] flex justify-between items-center">
 <span className="text-[#A9B4C5]">{j.salary || 'Salary not specified'}</span>
 <div className="flex gap-2">
 <button onClick={() => openModal(j)} className="p-1.5 bg-[#0F6FFF]/10 text-[#0F6FFF] hover:bg-[#0F6FFF]/20 rounded-lg transition-colors"><Edit className="w-4 h-4"/></button>
 <button onClick={() => handleDelete(j.id)} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4"/></button>
 </div>
 </div>
 </div>
 ))}
 {careers.length === 0 && <p className="text-[#A9B4C5] text-sm">No job postings found.</p>}
 </div>
 </div>
 )}

 {activeTab === 'applications' && (
 <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl overflow-hidden overflow-x-auto">
 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs text-[#A9B4C5]">
 <thead className="bg-[#08111F] text-white border-b border-[#23344F]">
 <tr>
 <th className="px-6 py-4 font-semibold">Applicant</th>
 <th className="px-6 py-4 font-semibold">Job Title</th>
 <th className="px-6 py-4 font-semibold">Date</th>
 <th className="px-6 py-4 font-semibold">Status</th>
 <th className="px-6 py-4 font-semibold">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-[#23344F]">
 {applications.map((app) => (
 <tr key={app.id} className="hover:bg-[#1B2B44]/30 transition-colors">
 <td className="px-6 py-4">
 <p className="font-bold text-white">{app.applicant_name}</p>
 <p>{app.email}</p>
 </td>
 <td className="px-6 py-4">{app.job_title || 'General Application'}</td>
 <td className="px-6 py-4">{new Date(app.created_at).toLocaleDateString()}</td>
 <td className="px-6 py-4">
 <select 
 value={app.status} 
 onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
 className={`bg-transparent border border-[#23344F] rounded px-2 py-1 outline-none font-bold
 ${app.status === 'applied' ? 'text-yellow-500' : 
 app.status === 'interviewing' ? 'text-blue-500' :
 app.status === 'hired' ? 'text-[#00E599]' : 'text-red-500'}`}
 >
 <option value="applied" className="text-black">Applied</option>
 <option value="interviewing" className="text-black">Interviewing</option>
 <option value="rejected" className="text-black">Rejected</option>
 <option value="hired" className="text-black">Hired</option>
 </select>
 </td>
 <td className="px-6 py-4">
 <button onClick={() => openAppModal(app)} className="flex items-center gap-1.5 text-[#00A3FF] hover:underline font-bold">
 <Eye className="w-4 h-4" /> View Details
 </button>
 </td>
 </tr>
 ))}
 {applications.length === 0 && (
 <tr><td colSpan={5} className="px-6 py-8 text-center">No applications received yet.</td></tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* Job Modal */}
 {isModalOpen && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
 <div className="bg-[#0A1220] border border-[#1B2B44] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
 <div className="flex justify-between items-center border-b border-[#1B2B44] pb-4">
 <h3 className="text-xl font-bold text-white">{editingJob ? 'Edit Job Posting' : 'Post New Job'}</h3>
 <button onClick={() => setIsModalOpen(false)} className="text-[#A9B4C5] hover:text-white transition-colors">
 <X className="w-5 h-5" />
 </button>
 </div>
 
 <form onSubmit={handleSave} className="space-y-4 text-xs">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Job Title *</label>
 <input required type="text" value={formData.job_title} onChange={(e)=>setFormData({...formData, job_title: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Department *</label>
 <input required type="text" value={formData.department} onChange={(e)=>setFormData({...formData, department: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white" placeholder="e.g. Engineering"/>
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Employment Type</label>
 <select value={formData.employment_type} onChange={(e)=>setFormData({...formData, employment_type: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white outline-none">
 <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
 </select>
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Location</label>
 <input type="text" value={formData.location} onChange={(e)=>setFormData({...formData, location: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white" placeholder="Remote, Hybrid, etc."/>
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Salary Range</label>
 <input type="text" value={formData.salary} onChange={(e)=>setFormData({...formData, salary: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white" placeholder="e.g. $80k - $120k"/>
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Expire Date</label>
 <input type="date" value={formData.expire_date} onChange={(e)=>setFormData({...formData, expire_date: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white" />
 </div>
 <div>
 <label className="block text-[#A9B4C5] mb-1">Status</label>
 <select value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white outline-none">
 <option value="open">Open</option>
 <option value="closed">Closed</option>
 </select>
 </div>
 </div>

 <div>
 <label className="block text-[#A9B4C5] mb-1">Description *</label>
 <textarea required rows={3} value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white" />
 </div>

 <div>
 <label className="block text-[#A9B4C5] mb-1">Requirements</label>
 <textarea rows={3} value={formData.requirements} onChange={(e)=>setFormData({...formData, requirements: e.target.value})} className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white" placeholder="Markdown or bullet points supported..." />
 </div>

 <div className="flex justify-end gap-3 pt-4 border-t border-[#1B2B44]">
 <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-white font-bold hover:bg-[#1B2B44] transition-colors">Cancel</button>
 <button type="submit" className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#0F6FFF] hover:bg-[#0F6FFF]/90 text-white font-bold transition-colors">Save Job Posting</button>
 </div>
 </form>
 </div>
 </div>
 )}

 {/* Application Detail Modal */}
 {isAppModalOpen && viewingApp && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
 <div className="bg-[#0A1220] border border-[#1B2B44] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
 <div className="flex justify-between items-start border-b border-[#1B2B44] pb-4">
 <div>
 <h3 className="text-xl font-bold text-white mb-1">{viewingApp.applicant_name}</h3>
 <p className="text-[#00A3FF] text-sm font-medium">Applied for: {viewingApp.job_title || 'General'}</p>
 </div>
 <button onClick={() => setIsAppModalOpen(false)} className="text-[#A9B4C5] hover:text-white transition-colors">
 <X className="w-5 h-5" />
 </button>
 </div>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
 <div className="space-y-4">
 <div>
 <p className="text-[#A9B4C5] text-xs mb-1">Email Address</p>
 <p className="text-white font-medium">{viewingApp.email}</p>
 </div>
 <div>
 <p className="text-[#A9B4C5] text-xs mb-1">Phone Number</p>
 <p className="text-white font-medium">{viewingApp.phone || 'N/A'}</p>
 </div>
 <div>
 <p className="text-[#A9B4C5] text-xs mb-1">Telegram</p>
 <p className="text-white font-medium">{viewingApp.telegram_username || 'N/A'}</p>
 </div>
 <div>
 <p className="text-[#A9B4C5] text-xs mb-1">Status</p>
 <select 
 value={viewingApp.status} 
 onChange={(e) => handleUpdateAppStatus(viewingApp.id, e.target.value)}
 className="w-full bg-[#101C2F] border border-[#23344F] rounded-xl px-3 py-2 text-white outline-none mt-1"
 >
 <option value="applied">Applied</option>
 <option value="interviewing">Interviewing</option>
 <option value="rejected">Rejected</option>
 <option value="hired">Hired</option>
 </select>
 </div>
 </div>
 
 <div className="space-y-4">
 <div>
 <p className="text-[#A9B4C5] text-xs mb-1">Portfolio URL</p>
 {viewingApp.portfolio_url ? (
 <a href={viewingApp.portfolio_url} target="_blank" rel="noreferrer" className="text-[#00A3FF] hover:underline break-all">{viewingApp.portfolio_url}</a>
 ) : <p className="text-white">N/A</p>}
 </div>
 <div>
 <p className="text-[#A9B4C5] text-xs mb-1">LinkedIn URL</p>
 {viewingApp.linkedin_url ? (
 <a href={viewingApp.linkedin_url} target="_blank" rel="noreferrer" className="text-[#00A3FF] hover:underline break-all">{viewingApp.linkedin_url}</a>
 ) : <p className="text-white">N/A</p>}
 </div>
 <div>
 <p className="text-[#A9B4C5] text-xs mb-1">GitHub URL</p>
 {viewingApp.github_url ? (
 <a href={viewingApp.github_url} target="_blank" rel="noreferrer" className="text-[#00A3FF] hover:underline break-all">{viewingApp.github_url}</a>
 ) : <p className="text-white">N/A</p>}
 </div>
 <div>
 <p className="text-[#A9B4C5] text-xs mb-1">Resume</p>
 <a href={viewingApp.resume_url} target="_blank" rel="noreferrer" className="inline-flex px-3 py-1.5 bg-[#00E599]/10 text-[#00E599] font-bold rounded-lg hover:bg-[#00E599]/20 transition-colors">
 View Resume / CV
 </a>
 </div>
 </div>
 </div>

 {viewingApp.cover_letter && (
 <div className="pt-4 border-t border-[#1B2B44]">
 <p className="text-[#A9B4C5] text-xs mb-2">Cover Letter</p>
 <div className="bg-[#101C2F] border border-[#23344F] rounded-xl p-4 text-white text-sm whitespace-pre-wrap">
 {viewingApp.cover_letter}
 </div>
 </div>
 )}
 </div>
 </div>
 )}

 </AdminLayout>
 );
};
