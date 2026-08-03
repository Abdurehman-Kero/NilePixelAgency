import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Logo } from '../../components/ui/Logo';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleLogin = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 setError(null);

 const res = await api.post('/auth/login', { email, password });
 if (res.success && res.data?.token) {
 login(res.data.token, res.data.user || { email, role: 'admin' });
 navigate('/admin/dashboard');
 } else {
 setError(res.message || 'Invalid administrator credentials.');
 }
 setLoading(false);
 };

 return (
 <div className="min-h-screen bg-[#050B15] flex flex-col justify-center items-center p-4 text-white">
 <div className="w-full max-w-md space-y-6">
 <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#A9B4C5] hover:text-white transition w-fit group">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
 </Link>
 <div className="w-full bg-[#101C2F] border border-[#23344F] rounded-2xl p-8 space-y-6 shadow-2xl">
 <div className="flex flex-col items-center text-center space-y-2">
 <Logo size="lg" />
 <h2 className="text-xl font-extrabold pt-2">Admin CMS Portal</h2>
 <p className="text-xs text-[#A9B4C5]">Sign in to manage company website content, projects, & team.</p>
 </div>

 {error && (
 <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
 <AlertCircle className="w-4 h-4 shrink-0" />
 <span>{error}</span>
 </div>
 )}

 <form onSubmit={handleLogin} className="space-y-4 text-xs">
 <div>
 <label className="block text-[#A9B4C5] mb-1">Email Address</label>
 <div className="relative">
 <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
 <input
 type="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl pl-9 pr-3 py-2.5 text-white"
 />
 </div>
 </div>

 <div>
 <label className="block text-[#A9B4C5] mb-1">Password</label>
 <div className="relative">
 <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
 <input
 type="password"
 required
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full bg-[#08111F] border border-[#23344F] rounded-xl pl-9 pr-3 py-2.5 text-white"
 />
 </div>
 </div>


 <button
 type="submit"
 disabled={loading}
 className="w-full py-3 rounded-xl bg-[#0F6FFF] hover:bg-[#005FE0] font-bold text-white transition flex items-center justify-center gap-2 shadow-lg"
 >
 {loading ? 'Authenticating...' : 'Access Admin CMS'} <ArrowRight className="w-4 h-4" />
 </button>
 </form>
 </div>
 </div>
 </div>
 );
};
