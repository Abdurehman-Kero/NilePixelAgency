import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Check } from 'lucide-react';

export const About: React.FC = () => {
  const { accentColor: accentHex } = useTheme();
  
  const t = (key: string) => {
    const translations: Record<string, any> = {
      'about.title': 'About us',
      'about.subtitle': 'Empowering Innovation through unparalleled software development expertise',
      'about.ourStory': 'Our Story',
      'about.storyBody': 'NilePixel Technologies was founded in 2020 with a vision to bring innovative solutions to the tech industry. What started as a small group of passionate developers has grown into a global company serving thousands of clients worldwide. Our mission is to empower businesses through cutting-edge technology and exceptional customer support.',
      'about.ourVision': 'Our Vision',
      'about.visionBody': 'To be the leading provider of innovative software solutions, exceeding client expectations through exceptional African talent, while fostering sustainable growth and contributing positively to society and the environment.',
      'about.ourMission': 'Our Mission',
      'about.missionBody': 'We challenge the status quo by empowering Ethiopian entrepreneurs with simple, human-centered software that helps them work smarter, faster, and at a global standard.',
      'about.ourValues': 'Our Values',
      'about.meetTeam': 'Meet Our Team',
      'about.ourGoals': 'Our Goals'
    };
    return translations[key] || key;
  };
  const [siteData, setSiteData] = useState<any>(null);
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    api.get('/settings').then(res => res.success && setSiteData(res.data));
    api.get('/team').then(res => res.success && setTeam(res.data || []));
  }, []);

  const defaultTeam = [
    {
      name: 'Kena Girma',
      position: 'CEO & Founder',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=100',
      span: 'col-span-1 row-span-2 h-[550px]'
    },
    {
      name: 'Tesfaye Adugna',
      position: 'CTO & Engineer @ Google',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=100',
      span: 'col-span-2 row-span-1 h-[250px]'
    },
    {
      name: 'Admas Terefe',
      position: 'COO',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=100',
      span: 'col-span-1 row-span-1 h-[280px]'
    },
    {
      name: 'Fita Wegene',
      position: 'Software Engineer',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=100',
      span: 'col-span-1 row-span-1 h-[280px]'
    }
  ];

  const teamList = team.length > 0 ? team : defaultTeam;
  const values = ['Innovation', 'Excellence', 'Integrity', 'Collaboration', 'Customer Focus'];

  const translatedGoals = (t('about.goals') as unknown as string[]) || [
    'Deliver cutting-edge technology solutions by consistently providing innovative software solutions that surpass client expectations.',
    'Foster continuous learning and development by cultivating a culture that encourages ongoing education and professional growth within our teams.',
    'Build long-term partnerships by establishing and maintaining relationships with clients based on trust, transparency, and shared success.',
    'Ensure timely project delivery by adhering to project timelines and ensuring punctual delivery without compromising quality.',
    'Utilize cutting-edge technologies by staying abreast of industry advancements and incorporating the latest technologies into our solutions.'
  ];

  const goals = Array.isArray(translatedGoals) ? translatedGoals : [
    'Deliver cutting-edge technology solutions by consistently providing innovative software solutions that surpass client expectations.',
    'Foster continuous learning and development by cultivating a culture that encourages ongoing education and professional growth within our teams.',
    'Build long-term partnerships by establishing and maintaining relationships with clients based on trust, transparency, and shared success.',
    'Ensure timely project delivery by adhering to project timelines and ensuring punctual delivery without compromising quality.',
    'Utilize cutting-edge technologies by staying abreast of industry advancements and incorporating the latest technologies into our solutions.'
  ];

  return (
    <div className="bg-[#04080F] text-white min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Subtle background gradient to match screenshot */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00E599]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {t('about.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-medium">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Story, Vision, Mission, Values & Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 items-start">
          
          {/* Left Column: Our Story, Vision, Mission, Values */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Our Story */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">{t('about.ourStory')}</h2>
              <p className="text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed">
                {t('about.storyBody')}
              </p>
            </div>

            {/* Our Vision */}
            <div className="border-l-[3px] pl-5 py-0.5 space-y-2" style={{ borderColor: accentHex }}>
              <h3 className="text-xl font-bold text-white">{t('about.ourVision')}</h3>
              <p className="text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed">
                {t('about.visionBody')}
              </p>
            </div>

            {/* Our Mission */}
            <div className="border-l-[3px] pl-5 py-0.5 space-y-2" style={{ borderColor: accentHex }}>
              <h3 className="text-xl font-bold text-white">{t('about.ourMission')}</h3>
              <p className="text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed">
                {t('about.missionBody')}
              </p>
            </div>

            {/* Our Values */}
            <div className="border-l-[3px] pl-5 py-0.5 space-y-4" style={{ borderColor: accentHex }}>
              <h3 className="text-xl font-bold text-white">{t('about.ourValues')}</h3>
              <div className="flex flex-wrap gap-2.5">
                {values.map((val) => (
                  <div
                    key={val}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#00E599]/10 border border-[#00E599]/20 text-[11px] font-medium text-white"
                  >
                    <Check className="w-3.5 h-3.5" style={{ color: accentHex }} />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Meet Our Team */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-white">{t('about.meetTeam')}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {teamList.slice(0, 6).map((member, index) => {
                // Determine span and height based on the screenshot layout logic
                // If the team is dynamic, map to the default spans by index.
                const spanClass = member.span || (
                  index === 0 ? 'col-span-1 row-span-2 h-[550px]' : 
                  index === 1 ? 'col-span-2 row-span-1 h-[250px]' : 
                  index === 2 || index === 3 ? 'col-span-1 row-span-1 h-[280px]' :
                  index === 4 ? 'col-span-1 row-span-1 h-[250px]' :
                  index === 5 ? 'col-span-2 row-span-1 h-[250px]' :
                  'col-span-1 row-span-1 h-[280px]'
                );

                return (
                  <div
                    key={member.id || member.name || index}
                    className={`group relative rounded-2xl overflow-hidden border border-[#1B2B44]/50 bg-[#0A1220] transition duration-300 flex flex-col justify-end ${spanClass}`}
                  >
                    <img
                      src={member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=100'}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-transparent to-transparent flex flex-col justify-end p-5">
                      <h3 className="text-sm font-bold text-white leading-tight">{member.name}</h3>
                      <p className="text-[11px] font-medium mt-1" style={{ color: accentHex }}>{member.position}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Our Goals Section */}
        <div className="bg-[#060C16] border border-[#00E599]/20 rounded-2xl p-8 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold" style={{ color: accentHex }}>{t('about.ourGoals')}</h2>
          <ul className="space-y-4">
            {goals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accentHex }} />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
