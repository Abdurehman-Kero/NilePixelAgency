import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Check } from 'lucide-react';

const BACKEND_URL = 'https://nilepixel-backend.onrender.com';

// Hard-coded team from live DB — avoids a /team fetch on load
const HARDCODED_TEAM = [
  {
    id: 3,
    name: 'Abdurehman',
    position: 'Co-founder & Chief Software Architect',
    photo: `${BACKEND_URL}/uploads/file-1785663407417-978299282.JPG`,
  },
  {
    id: 2,
    name: 'Mifta',
    position: 'Co-Founder & CTO',
    photo: `${BACKEND_URL}/uploads/file-1785663361515-574881770.jpg`,
  },
  {
    id: 1,
    name: 'Anwar',
    position: 'Co-Founder and UI/UX Architect',
    photo: `${BACKEND_URL}/uploads/file-1785663330833-268431322.JPG`,
  },
  {
    id: 6,
    name: 'Harun',
    position: 'Senior Software Engineer',
    photo: `${BACKEND_URL}/uploads/file-1785704517116-892906150.jpg`,
  },
  {
    id: 4,
    name: 'Fuad',
    position: 'Head of Mobile & DevOps',
    photo: `${BACKEND_URL}/uploads/file-1785704270317-126974139.jpg`,
  },
];

export const About: React.FC = () => {
  const { accentColor: accentHex } = useTheme();

  const t = (key: string) => {
    const translations: Record<string, any> = {
      'about.title': 'About us',
      'about.subtitle': 'Empowering Innovation through unparalleled software development expertise',
      'about.ourStory': 'Our Story',
      'about.storyBody':
        "NilePixel Technologies began in 2023 with a simple but powerful goal: to build software that actually solves real-world problems. What started as a tight-knit team of engineers has quickly evolved into a trusted technical partner for businesses across the globe. We aren't just writing code; we're architecting scalable, resilient platforms that help our clients thrive in a digital-first world.",
      'about.ourVision': 'Our Vision',
      'about.visionBody':
        'To become a globally recognized engineering powerhouse, consistently delivering world-class software by elevating and showcasing exceptional African tech talent on the world stage.',
      'about.ourMission': 'Our Mission',
      'about.missionBody':
        'We challenge the status quo by delivering robust, human-centric software designed to empower Ethiopian entrepreneurs and global businesses alike. We bridge the gap between complex engineering and intuitive design, helping our partners operate smarter and scale faster.',
      'about.ourValues': 'Our Values',
      'about.meetTeam': 'Meet Our Team',
      'about.ourGoals': 'Our Goals',
    };
    return translations[key] || key;
  };

  const values = ['Innovation', 'Excellence', 'Integrity', 'Collaboration', 'Customer Focus'];

  const goals = [
    'Deliver cutting-edge technology solutions by consistently providing innovative software solutions that surpass client expectations.',
    'Foster continuous learning and development by cultivating a culture that encourages ongoing education and professional growth within our teams.',
    'Build long-term partnerships by establishing and maintaining relationships with clients based on trust, transparency, and shared success.',
    'Ensure timely project delivery by adhering to project timelines and ensuring punctual delivery without compromising quality.',
    'Utilize cutting-edge technologies by staying abreast of industry advancements and incorporating the latest technologies into our solutions.',
  ];

  return (
    <div className="bg-[#04080F] text-white min-h-screen pt-16 sm:pt-28 pb-16 sm:pb-24 relative overflow-hidden">
      {/* Very faint grid background */}
      <div
        className="absolute inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${accentHex}15 1px, transparent 1px), linear-gradient(to bottom, ${accentHex}15 1px, transparent 1px)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        {/* Header Section */}
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">{t('about.title')}</h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-medium">{t('about.subtitle')}</p>
        </div>

        {/* Story, Vision, Mission, Values & Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 sm:gap-y-16 items-start">
          {/* Left Column: Our Story, Vision, Mission, Values */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10 text-center sm:text-left">
            {/* Our Story */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">{t('about.ourStory')}</h2>
              <p className="text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed">{t('about.storyBody')}</p>
            </div>

            {/* Our Vision */}
            <div
              className="border-t-[3px] sm:border-t-0 sm:border-l-[3px] pt-4 sm:pt-0 sm:pl-5 py-0.5 space-y-2 mx-auto sm:mx-0 max-w-sm sm:max-w-none"
              style={{ borderColor: accentHex }}
            >
              <h3 className="text-xl font-bold text-white">{t('about.ourVision')}</h3>
              <p className="text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed">{t('about.visionBody')}</p>
            </div>

            {/* Our Mission */}
            <div
              className="border-t-[3px] sm:border-t-0 sm:border-l-[3px] pt-4 sm:pt-0 sm:pl-5 py-0.5 space-y-2 mx-auto sm:mx-0 max-w-sm sm:max-w-none"
              style={{ borderColor: accentHex }}
            >
              <h3 className="text-xl font-bold text-white">{t('about.ourMission')}</h3>
              <p className="text-xs sm:text-[13px] text-[#A9B4C5] leading-relaxed">{t('about.missionBody')}</p>
            </div>

            {/* Our Values */}
            <div
              className="border-t-[3px] sm:border-t-0 sm:border-l-[3px] pt-4 sm:pt-0 sm:pl-5 py-0.5 space-y-4 mx-auto sm:mx-0 max-w-sm sm:max-w-none"
              style={{ borderColor: accentHex }}
            >
              <h3 className="text-xl font-bold text-white">{t('about.ourValues')}</h3>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                {values.map(val => (
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

          {/* Right Column: Meet Our Team — hard-coded from live DB */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-white text-center sm:text-left">{t('about.meetTeam')}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {HARDCODED_TEAM.map((member, index) => {
                const isEven = HARDCODED_TEAM.length % 2 === 0;
                const spanClass =
                  index === 0
                    ? 'col-span-2 sm:col-span-1 sm:row-span-2 h-[350px] sm:h-[550px]'
                    : isEven
                    ? index === 1
                      ? 'col-span-1 sm:col-span-2 row-span-1 h-[200px] sm:h-[250px]'
                      : index === 2 || index === 3
                      ? 'col-span-1 row-span-1 h-[200px] sm:h-[280px]'
                      : index === 4
                      ? 'col-span-1 row-span-1 h-[200px] sm:h-[250px]'
                      : index === 5
                      ? 'col-span-2 sm:col-span-2 row-span-1 h-[200px] sm:h-[250px]'
                      : 'col-span-1 row-span-1 h-[200px] sm:h-[280px]'
                    : 'col-span-1 row-span-1 h-[200px] sm:h-[250px]';

                return (
                  <div
                    key={member.id}
                    className={`group relative rounded-2xl overflow-hidden border border-[#1B2B44]/50 bg-[#0A1220] transition duration-300 flex flex-col justify-end ${spanClass}`}
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition duration-500"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-sm font-bold text-white leading-tight drop-shadow-md">{member.name}</h3>
                      <p className="text-[11px] font-bold mt-1 drop-shadow-md" style={{ color: accentHex }}>
                        {member.position}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Our Goals Section */}
        <div className="bg-[#060C16] border border-[#00E599]/20 rounded-2xl p-8 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold" style={{ color: accentHex }}>
            {t('about.ourGoals')}
          </h2>
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
