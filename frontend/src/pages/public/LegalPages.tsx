import React from 'react';

export const PrivacyPolicy: React.FC = () => (
  <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 text-white text-xs">
    <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
    <p className="text-[#A9B4C5]">Last updated: August 2026</p>
    <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 space-y-4 text-[#A9B4C5] leading-relaxed">
      <p>NilePixel Technologies respects your data privacy. We collect minimal information required to deliver high-quality software services and custom software integrations.</p>
      <h3 className="text-white font-bold text-sm">Data Security</h3>
      <p>All client metrics, uploaded media assets, and server communications are protected with industry-standard encryption protocols.</p>
    </div>
  </div>
);

export const TermsOfService: React.FC = () => (
  <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 text-white text-xs">
    <h1 className="text-3xl font-extrabold">Terms of Service</h1>
    <p className="text-[#A9B4C5]">Last updated: August 2026</p>
    <div className="bg-[#101C2F] border border-[#23344F] rounded-2xl p-6 space-y-4 text-[#A9B4C5] leading-relaxed">
      <p>Welcome to NilePixel Technologies. By accessing our platform or contracting our engineering services, you agree to comply with our client SLAs and technical parameters.</p>
    </div>
  </div>
);
