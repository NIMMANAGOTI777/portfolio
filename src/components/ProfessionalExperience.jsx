import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Comprehensive, Authenticated Professional Experience Dataset
// Preserving all underlying data records, schemas, and historical details
const EXPERIENCES = [
  {
    id: 'exp-innfill-head',
    company: 'Innfill',
    role: 'Head of Community',
    duration: 'July 2026 – Present',
    year: '2026',
    employmentType: 'Full-time Leadership',
    isCurrent: true,
    isFeatured: true,
    location: 'Hyderabad, India (Hybrid)',
    logoText: 'IF',
    logoColor: 'from-indigo-600 via-indigo-500 to-purple-600',
    category: ['Community', 'Leadership', 'Marketing', 'Events'],
    icon: 'users',
    summary: 'Leading community growth, campus initiatives, events, and partnerships.',
    highlightTag: 'Community Growth & Leadership',
    keyMetric: 'Active / Scaling',
    responsibilities: [
      'Leading community growth, brand engagement, and campus chapter scaling initiatives across universities',
      'Designing and executing high-impact workshops, creator networking sessions, and student community programs',
      'Building and managing strategic relationships with student creators, campus ambassadors, and industry partners',
      'Collaborating closely with product, marketing, and operations teams to align launch roadmaps',
      'Overseeing digital community channels, tone of voice, and brand communication workflows',
      'Tracking community retention, weekly engagement metrics, and optimizing member onboarding'
    ],
    skills: ['Community Growth', 'Leadership', 'Campus Partnerships', 'Strategy', 'Brand Operations'],
    outcomes: 'Established standard community governance guidelines and scaled nationwide student outreach to double active ambassador engagement.'
  },
  {
    id: 'exp-paniit-designer',
    company: 'PanIIT Andhra Pradesh Summit 2026',
    role: 'Impact Designer | Student Organizer',
    duration: 'October 2026',
    year: '2026',
    employmentType: 'State Summit Project',
    isCurrent: false,
    isFeatured: true,
    location: 'Vijayawada, Andhra Pradesh',
    logoText: 'PI',
    logoColor: 'from-amber-500 via-rose-500 to-indigo-600',
    category: ['Design', 'Events', 'Visual Branding'],
    icon: 'award',
    summary: 'Designed event branding, physical signage, pavilion visuals, and on-ground communication assets.',
    highlightTag: 'Government & State Event',
    keyMetric: 'State Platform',
    responsibilities: [
      'Designed physical signages and pavilion branding across Dr. B. R. Ambedkar Kala Vedika',
      'Coordinated visual communication materials for state dignitaries and student delegates',
      'Translated digital Figma designs into printed large-format venue installations'
    ],
    skills: ['Event Design', 'Visual Communication', 'Figma', 'Signage', 'Pavilion Branding'],
    outcomes: 'Delivered complete on-ground visual branding implemented across the official state summit platform.'
  },
  {
    id: 'exp-nxtwave-intern',
    company: 'NxtWave',
    role: 'Content Strategist Intern',
    duration: 'February 2026 – July 2026',
    year: '2026',
    employmentType: 'Internship',
    isFeatured: true,
    location: 'Remote',
    logoText: 'NW',
    logoColor: 'from-cyan-500 via-blue-500 to-indigo-600',
    category: ['Content', 'Marketing', 'Leadership'],
    icon: 'sparkles',
    summary: 'Worked on content strategy, digital campaigns, and cross-team execution, contributing to campaigns reaching 400K+.',
    highlightTag: '400K+ Audience Reach',
    keyMetric: '400K+ Reach',
    responsibilities: [
      'Directed multi-channel content strategy targeting student, developer, and creator demographics',
      'Planned and executed digital campaigns that generated over 400,000+ organic impressions',
      'Engineered structured and automated content creation, review, and publishing pipelines',
      'Collaborated with internal leadership to align digital storytelling with core acquisition objectives',
      'Utilized data-driven feedback loops to optimize campaign retention and engagement rates'
    ],
    skills: ['Content Strategy', 'Campaign Architecture', 'Automation', 'Brand Growth', 'Stakeholder Management'],
    outcomes: 'Delivered campaigns reaching 400K+ impressions with a 35% reduction in production turnaround via automated pipelines.'
  },
  {
    id: 'exp-starlit-25',
    company: 'NxtWave / NIAT',
    role: "Event Organizer & Senior Coordinator, Starlit'25",
    duration: '2025',
    year: '2025',
    employmentType: 'Organizing Committee',
    location: 'NIAT Campus',
    logoText: 'S25',
    logoColor: 'from-amber-500 via-yellow-500 to-orange-500',
    category: ['Events', 'Leadership', 'Community'],
    icon: 'award',
    summary: 'Coordinated flagship annual festival operations, VIP hospitality, stage timelines, and volunteer divisions.',
    highlightTag: 'Annual Flagship Festival',
    keyMetric: 'Campus Fest',
    responsibilities: [
      'Coordinated multi-tier volunteer departments across stage setups, sound checks, and hall logistics',
      'Managed VIP guest schedules, keynote speaker hospitality, and smooth green-room transitions',
      'Enforced backstage access control, safety cordons, and audience movement between parallel tracks',
      'Handled rapid troubleshooting for stage audio-visuals and live announcements'
    ],
    skills: ['Fest Operations', 'VIP Hospitality', 'Volunteer Supervision', 'Stage Timeline Management'],
    outcomes: 'Executed high-precision stage and hospitality operations for NIAT’s premier cultural and technology festival.'
  },
  {
    id: 'exp-base44-hackathon',
    company: 'BASE44 Hackathon',
    role: 'Lead Organizer & Web Platform Architect',
    duration: '2025 – 2026',
    year: '2025–26',
    employmentType: 'Organizing Committee / Tech Lead',
    isFeatured: true,
    location: 'NIAT Campus',
    logoText: 'B44',
    logoColor: 'from-purple-600 via-pink-500 to-rose-600',
    category: ['Development', 'Events', 'Leadership'],
    icon: 'code2',
    isCaseStudy: true,
    summary: 'Architected high-concurrency event portal and on-ground QR verification platform serving 1,665+ participants with 100% uptime.',
    highlightTag: '1,665+ Hackers • 100% Uptime',
    keyMetric: '1,665+ Participants',
    caseStudy: {
      problem: 'Developing a resilient, high-concurrency web platform to process thousands of student registrations, real-time notifications, team formations, and instant on-ground participant check-in during peak venue rush without database latency or crashes.',
      responsibilities: [
        'Web Platform Architecture: Engineered the official responsive portal (base44.niat.tech) using React and Tailwind CSS.',
        'Registration & Database Engine: Built robust Supabase schemas and API queries to handle high concurrency seamlessly.',
        'On-Ground QR Verification: Developed an administrative scanner dashboard for instantaneous participant verification.',
        'Technical & Live Operations: Supervised server uptime, database queries, and on-ground check-in desks during peak traffic.'
      ],
      techUsed: ['React', 'Supabase', 'Tailwind CSS', 'Vite', 'Framer Motion', 'REST APIs']
    },
    skills: ['Fullstack Dev', 'System Architecture', 'Supabase', 'Event Operations', 'QR Check-in'],
    outcomes: 'Maintained 100% platform uptime throughout the hackathon and verified all 1,665+ participants smoothly with custom QR codes.'
  },
  {
    id: 'exp-influencer-club',
    company: 'Influencers Club NIAT',
    role: 'President',
    duration: '2024 – 2026',
    year: '2024–2026',
    employmentType: 'Elected Leadership',
    isFeatured: true,
    location: 'NIAT Campus',
    logoText: 'IC',
    logoColor: 'from-amber-500 via-orange-500 to-rose-500',
    category: ['Leadership', 'Community', 'Content', 'Events'],
    icon: 'award',
    summary: 'Led student creator initiatives, workshops, guest sessions, and campus media activities.',
    highlightTag: '500+ Members • Creator Summits',
    keyMetric: '2+ Years Presidency',
    responsibilities: [
      'Directed executive board operations, event budgeting, and weekly digital growth masterclasses',
      'Curated and hosted keynote creator sessions with top industry figures (Ishan Sharma, Madhu Kiran, Tharun Naik)',
      'Led the multi-department media, photography, videography, and post-production crews',
      'Organized live LinkedIn branding workshops, resume reviews, and building-in-public sessions for students',
      'Produced podcasts highlighting entrepreneurship, startup journeys, and technological innovation'
    ],
    skills: ['Executive Leadership', 'Creator Summits', 'Public Speaking', 'Media Direction', 'LinkedIn Growth'],
    gallery: [
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.22.34_AM_vm6hrl.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179680/WhatsApp_Image_2025-11-15_at_9.29.46_AM_ornq12.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.24.22_AM_njlqzg.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.21.22_AM_zywwfg.jpg'
    ],
    outcomes: 'Grew club membership to 500+ active students, hosted top creators, and was honored with the Outstanding Leadership Award.'
  },
  {
    id: 'exp-innfill-intern',
    company: 'Innfill',
    role: 'Digital Marketing Intern',
    duration: 'April 2026 – July 2026',
    year: '2026',
    employmentType: 'Internship',
    location: 'Hyderabad, India',
    logoText: 'IF',
    logoColor: 'from-blue-500 via-sky-400 to-indigo-500',
    category: ['Marketing', 'Content'],
    icon: 'flame',
    summary: 'Engineered growth-focused social strategies, scripted short-form video content, and optimized organic discovery.',
    highlightTag: 'Organic SMM & Video Scripting',
    keyMetric: 'Organic SMM',
    responsibilities: [
      'Developed and executed data-backed social media growth strategies across digital channels',
      'Scripted, storyboarded, and scheduled engaging short-form video content for student audiences',
      'Managed dynamic content calendars and coordinated production with creative teams',
      'Audited digital profiles to maximize organic discoverability and search performance',
      'Analyzed campaign engagement metrics to iterate weekly content performance'
    ],
    skills: ['Digital Marketing', 'Content Strategy', 'Social Media', 'Video Scripting', 'Analytics'],
    outcomes: 'Accelerated video reach and engagement while establishing standard operating procedures for weekly profile audits.'
  },
  {
    id: 'exp-niat-takeover',
    company: 'NIAT Takeover',
    role: 'Head Student Organizer',
    duration: '2026',
    year: '2026',
    employmentType: 'Leadership / Operations',
    location: 'NIAT Campus',
    logoText: 'TO',
    logoColor: 'from-violet-600 via-indigo-600 to-blue-600',
    category: ['Events', 'Leadership', 'Community'],
    icon: 'briefcase',
    summary: 'Orchestrated 3 days of 5 major flagship events including Takeover Hackathon, DJ Night, BRAVE, and GRIT Awards.',
    highlightTag: '5 Major Flagship Events',
    keyMetric: '3 Days • 5 Events',
    responsibilities: [
      'Led Guest Hospitality, coordinating VIP speakers, jury members, mentors, and dignitaries across 3 days',
      'Orchestrated multi-event schedules across Takeover Hackathon, Takeover DJ Night, BRAVE, Makers Conclave, and GRIT Awards',
      'Directed live social media videography and dynamic storytelling to document the festival atmosphere',
      'Managed rapid crisis resolution, stage synchronizations, and volunteer deployments under intense pressure'
    ],
    skills: ['Event Architecture', 'Guest Hospitality', 'Crisis Management', 'Stage Operations', 'Media Production'],
    outcomes: 'Coordinated five concurrent major events seamlessly with exceptional feedback from NIAT leadership and attendees.'
  },
  {
    id: 'exp-hexaverse',
    company: 'HexaVerse 2025',
    role: 'Head of Security & Event Promotions Lead',
    duration: '2025',
    year: '2025',
    employmentType: 'Leadership',
    location: 'Hyderabad, India',
    logoText: 'HV',
    logoColor: 'from-red-500 via-rose-500 to-amber-500',
    category: ['Events', 'Leadership', 'Marketing'],
    icon: 'shield-alert',
    summary: 'Designed event security protocols, commanded a 10-member security crew, and drove campus promotional campaigns.',
    highlightTag: '10-Member Force • Zero Incidents',
    keyMetric: '10-Member Team',
    responsibilities: [
      'Formulated end-to-end security blueprints, perimeter barriers, and entry/exit crowd flow protocols',
      'Commanded a 10-member volunteer security squad with active walkie-talkie communication grids',
      'Designed emergency safety guidelines, rapid response checklists, and VIP escort pathways',
      'Led campus-wide promotional drives and student outreach activations to drive massive registrations',
      'Coordinated real-time attendee crowd management during high-density keynote sessions'
    ],
    skills: ['Security Planning', 'Crowd Management', 'Promotions', 'Emergency Protocols', 'Team Leadership'],
    outcomes: 'Recorded zero safety incidents across large attendance volumes and ensured seamless crowd circulation.'
  },
  {
    id: 'exp-teach-ai',
    company: 'Teach AI for India',
    role: 'Strategic POC',
    duration: '2025 – 2026',
    year: '2025–26',
    employmentType: 'Social Impact Initiative',
    location: 'India',
    logoText: 'TAI',
    logoUrl: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1785759871/WhatsApp_Image_2026-08-03_at_5.52.31_PM_r9lnro.jpg',
    logoColor: 'from-emerald-500 via-teal-500 to-cyan-500',
    category: ['Community', 'Leadership', 'Content'],
    icon: 'globe',
    summary: 'Pioneered student-led AI literacy initiative delivering digital tools awareness to government school students.',
    highlightTag: 'Government School AI Literacy',
    keyMetric: 'AI Literacy',
    responsibilities: [
      'Served as strategic POC coordinating campus volunteer teams for grassroots school outreach visits',
      'Formulated interactive curriculum modules teaching foundational AI concepts, digital safety, and coding awareness',
      'Documented digital impact stories and student growth to build transparent proof of work on LinkedIn',
      'Mentored collegiate tech trainers to deliver highly accessible, practical hands-on classroom sessions'
    ],
    skills: ['Social Impact', 'Curriculum Design', 'Public Speaking', 'Community Outreach', 'Mentorship'],
    gallery: [
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/4_uffbub.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/2_vb5mqh.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/5_ywm5ps.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/1_nft1oe.jpg'
    ],
    outcomes: 'Introduced hundreds of underprivileged students to practical AI tools, empowering them with future-ready skills.'
  },
  {
    id: 'exp-blend-ai',
    company: 'Blend AI for Good Hackathon 2025',
    role: 'Event Organizer',
    duration: '2025',
    year: '2025',
    employmentType: 'Hackathon Organizing Committee',
    location: 'NIAT Campus',
    logoText: 'BAI',
    logoColor: 'from-blue-600 via-indigo-600 to-cyan-500',
    category: ['Events', 'Development', 'Community'],
    icon: 'code2',
    summary: 'Organized AI-focused hackathon fostering student AI solutions for social impact and sustainable development.',
    highlightTag: 'AI for Social Good Hackathon',
    keyMetric: 'AI Hackathon',
    responsibilities: [
      'Structured hackathon challenge tracks addressing real-world social and environmental problems with AI',
      'Managed mentor office hours, judging criteria sheets, and live demo staging',
      'Coordinated technical setup, API token distribution, and team troubleshooting during sprint hours'
    ],
    skills: ['Hackathon Management', 'AI Tools', 'Technical Mentorship', 'Jury Coordination'],
    outcomes: 'Guided 30+ innovative student AI projects to final prototype stage with seamless judging operations.'
  },
  {
    id: 'exp-bhoomi-netra',
    company: 'Bhoomi Netra',
    role: 'Hackathon Organizer & Media Head',
    duration: '2024',
    year: '2024',
    employmentType: 'Organizing Lead',
    location: 'NIAT Campus',
    logoText: 'BN',
    logoColor: 'from-emerald-600 via-green-500 to-lime-600',
    category: ['Events', 'Content', 'Marketing'],
    icon: 'camera',
    summary: 'Spearheaded media branding and operational management for agricultural innovation hackathon.',
    highlightTag: 'AgriTech Hackathon & Media',
    keyMetric: 'AgriTech Event',
    responsibilities: [
      'Led full-scale creative and media branding, designing promo assets, banners, and video teasers',
      'Managed participant registrations, table allocations, and on-ground scheduling',
      'Conducted live media documentation and live broadcasted team pitch presentations'
    ],
    skills: ['Media Direction', 'AgriTech Hackathons', 'Visual Storytelling', 'On-ground Coordination'],
    outcomes: 'Drove record participation for AgriTech problem tracks with comprehensive digital media coverage.'
  },
  {
    id: 'exp-starlit-24',
    company: 'Starlit’24',
    role: 'Security Team Lead',
    duration: '2024',
    year: '2024',
    employmentType: 'Event Security Lead',
    location: 'NIAT Campus',
    logoText: 'S24',
    logoColor: 'from-slate-600 via-slate-700 to-slate-800',
    category: ['Events', 'Leadership'],
    icon: 'shield-alert',
    summary: 'Formulated entry checkpoints, crowd flow barriers, and perimeter safety protocols for 1,000+ attendees.',
    highlightTag: '1,000+ Attendees Secured',
    keyMetric: '1,000+ Attendees',
    responsibilities: [
      'Engineered perimeter barricades, gate entry verification lanes, and emergency egress corridors',
      'Supervised security volunteer shifts and communication networks during high-volume entries',
      'Resolved on-ground disputes, managed pass verifications, and prevented unauthorized venue entry'
    ],
    skills: ['Crowd Safety', 'Gate Logistics', 'Incident Management', 'Perimeter Control'],
    outcomes: 'Delivered an incident-free event experience for over 1,000 student attendees with structured queue management.'
  },
  {
    id: 'exp-naitra',
    company: 'NAITRA 2.0',
    role: 'Head of Security & Social Media Manager',
    duration: '2024',
    year: '2024',
    employmentType: 'Dual Lead Role',
    location: 'NIAT Campus',
    logoText: 'N2',
    logoColor: 'from-teal-500 via-emerald-500 to-cyan-500',
    category: ['Events', 'Marketing', 'Content'],
    icon: 'camera',
    summary: 'Bridged on-ground event security architecture with high-engagement live social media broadcasting.',
    highlightTag: 'Security & Live Media Coverage',
    keyMetric: 'Dual-Lead Role',
    responsibilities: [
      'Commanded physical venue security protocols, crowd barricades, and stage protection cordons',
      'Directed real-time social media publishing, capturing high-energy reels, photos, and live story updates',
      'Managed volunteer teams across both physical safety checkpoints and digital media recording points'
    ],
    skills: ['Event Security', 'Live SMM', 'Event Photography', 'Visual Documentation'],
    outcomes: 'Combined zero security incidents with a record spike in real-time festival social media impressions.'
  },
  {
    id: 'exp-iot-workshop',
    company: 'IoT & Hardware Summit',
    role: 'IoT Workshop Organizer & Media Lead',
    duration: '2024',
    year: '2024',
    employmentType: 'Workshop Organizer',
    location: 'NIAT Campus',
    logoText: 'IOT',
    logoColor: 'from-indigo-600 via-blue-600 to-teal-500',
    category: ['Events', 'Development', 'Content'],
    icon: 'cpu',
    summary: 'Conducted hands-on embedded systems workshop and managed full-scale media documentation.',
    highlightTag: '100+ Hardware Makers',
    keyMetric: 'Hardware Workshop',
    responsibilities: [
      'Coordinated microcontroller and sensor hardware kit distribution for over 100 student makers',
      'Assisted technical instructors during hands-on coding and circuit assembly debugging',
      'Produced cinematic recap videos and technical documentation of student embedded projects'
    ],
    skills: ['Hardware Logistics', 'IoT Workshops', 'Technical Media', 'Mentorship Support'],
    outcomes: 'Enabled 100+ students to successfully build their first working embedded sensor prototypes.'
  },
  {
    id: 'exp-agritech-podcast',
    company: 'AgriTech & Entrepreneurship Podcast',
    role: 'Podcast Organizer & Host',
    duration: '2024',
    year: '2024',
    employmentType: 'Creator / Host',
    location: 'Hyderabad, India',
    logoText: 'POD',
    logoColor: 'from-amber-600 via-orange-600 to-red-600',
    category: ['Content', 'Community', 'Marketing'],
    icon: 'mic',
    summary: "Produced and hosted in-depth podcast with Kishore Indukuri (CEO of Sid's Farm) on AgriTech startup scaling.",
    highlightTag: 'Founder Spotlight Podcast',
    keyMetric: 'Founder Podcast',
    responsibilities: [
      'Formulated in-depth conversational outline on dairy tech, supply chain scaling, and bootstrapped growth',
      'Hosted live discussion spotlighting actionable startup lessons for student entrepreneurs',
      'Engineered audio-visual post-production and published high-engagement micro-clips across social platforms'
    ],
    skills: ['Podcast Hosting', 'Founder Interviewing', 'Audio/Video Editing', 'Content Distribution'],
    outcomes: 'Generated high student engagement and positive reception from Hyderabad startup ecosystem leaders.'
  },
  {
    id: 'exp-industry-expert',
    company: 'Industry Expert Series',
    role: 'Series Curator & Host — Featuring Meera Kannan',
    duration: '2024',
    year: '2024',
    employmentType: 'Curator & Host',
    location: 'NIAT Campus',
    logoText: 'IX',
    logoColor: 'from-pink-600 via-purple-600 to-indigo-600',
    category: ['Community', 'Leadership', 'Content'],
    icon: 'radio',
    summary: 'Curated interactive fireside masterclass with industry leader Meera Kannan on professional career growth.',
    highlightTag: 'Executive Leadership Fireside',
    keyMetric: 'Executive Session',
    responsibilities: [
      'Spearheaded guest speaker outreach, briefing, and thematic agenda alignment',
      'Moderated interactive Q&A session bridging corporate leadership insights with student ambitions',
      'Documented core takeaways into actionable career frameworks shared across the campus community'
    ],
    skills: ['Executive Moderation', 'Speaker Hospitality', 'Agenda Curation', 'Audience Engagement'],
    outcomes: 'Connected 200+ aspiring student technologists directly with high-level corporate leadership insights.'
  }
];

const INITIAL_VISIBLE_COUNT = 6;

export default function ProfessionalExperience() {
  const { publicExperiences } = usePortfolioData();
  const [showAll, setShowAll] = useState(false);

  // Active experiences from database/CMS with full fallback to curated dataset
  const activeExperiences = useMemo(() => {
    if (!publicExperiences || publicExperiences.length === 0) {
      return EXPERIENCES;
    }

    const cmsMap = new Map();
    publicExperiences.forEach(item => {
      cmsMap.set(item.id, item);
      if (item.id === 'exp-niat-president') {
        cmsMap.set('exp-influencer-club', item);
      }
    });

    const merged = EXPERIENCES.map(exp => {
      const cmsItem = cmsMap.get(exp.id);
      if (cmsItem) {
        return {
          ...exp,
          company: cmsItem.company || exp.company,
          role: cmsItem.role || exp.role,
          duration: cmsItem.duration || exp.duration,
          summary: cmsItem.summary || exp.summary,
          published: cmsItem.published !== false
        };
      }
      return exp;
    }).filter(e => e.published !== false);

    // Append any newly added CMS items not in static dataset
    publicExperiences.forEach(item => {
      const alreadyIn = EXPERIENCES.some(e => e.id === item.id) || (item.id === 'exp-niat-president');
      if (!alreadyIn && item.published !== false) {
        merged.push({
          id: item.id,
          company: item.company,
          role: item.role,
          duration: item.duration || '2026',
          summary: item.summary || item.full_description || '',
          logoText: item.logo_text || item.company.substring(0, 2).toUpperCase(),
          logoUrl: item.logo_url || null
        });
      }
    });

    return merged;
  }, [publicExperiences]);

  // Determine items to display based on concise list toggle
  const visibleExperiences = showAll
    ? activeExperiences
    : activeExperiences.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = activeExperiences.length > INITIAL_VISIBLE_COUNT;
  const remainingCount = activeExperiences.length - INITIAL_VISIBLE_COUNT;

  return (
    <section id="experience" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full relative z-10">
      
      {/* Section Header: Compact & Subtle */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight uppercase">
          Professional Experience
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mt-2 font-light">
          Organizations, roles, and projects I've contributed to.
        </p>
      </div>

      {/* Clean Experience List */}
      <div className="space-y-3 sm:space-y-3.5">
        {visibleExperiences.map((exp) => (
          <div
            key={exp.id}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/70 border border-white/[0.07] hover:border-white/15 transition-all duration-200"
          >
            <div className="flex items-start gap-3.5 sm:gap-4">
              
              {/* Minimal Organization Logo / Monogram */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-200 font-semibold text-xs shrink-0 select-none overflow-hidden">
                {exp.logoUrl ? (
                  <img
                    src={exp.logoUrl}
                    alt={`${exp.company} logo`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="tracking-wide">
                    {exp.logoText || (exp.company ? exp.company.substring(0, 2).toUpperCase() : 'EX')}
                  </span>
                )}
              </div>

              {/* Core Information Hierarchy */}
              <div className="flex-1 min-w-0">
                {/* Organization & Duration */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-3 mb-0.5">
                  <span className="text-xs sm:text-sm font-medium text-slate-300">
                    {exp.company}
                  </span>
                  <span className="text-xs text-slate-500 font-normal shrink-0">
                    {exp.duration}
                  </span>
                </div>

                {/* Role / Position: Prominent */}
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-1">
                  {exp.role}
                </h3>

                {/* One-Line Description: Max 2 lines */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {exp.summary}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Understated Show More / Show Less Toggle */}
      {hasMore && (
        <div className="text-center pt-6 sm:pt-8">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
            aria-expanded={showAll}
          >
            <span>
              {showAll ? 'Show Less' : `Show More Experiences (${remainingCount})`}
            </span>
            {showAll ? (
              <ChevronUp size={14} className="text-slate-400" />
            ) : (
              <ChevronDown size={14} className="text-slate-400" />
            )}
          </button>
        </div>
      )}

    </section>
  );
}
