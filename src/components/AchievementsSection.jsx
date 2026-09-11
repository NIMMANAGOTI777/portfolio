import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Play, X, ChevronLeft, ChevronRight, 
  ChevronDown, ChevronUp, ZoomIn, ZoomOut, Sparkles, Lightbulb,
  CheckCircle2, ShieldCheck, Maximize2, Award, Heart
} from 'lucide-react';

const ACHIEVEMENTS_DATA = [
  {
    id: 'annadata-policy-2047',
    awardBadgeText: '🏆 1st Prize',
    badgePrimary: '1ST PRIZE',
    badgeSecondary: 'POLICY INNOVATION',
    metricPill: 'Team Achievement',
    metricPillIcon: 'users',
    issuer: 'Youth Leadership & Governance Forum 2026',
    title: 'ANNADATA POLICY 2047',
    subtitle: '“One Farmer, One Resolution”',
    shortDesc: 'A farmer-centric policy proposal focused on agricultural grievance coordination and accountable governance.',
    tags: [
      'Youth Leadership',
      'Governance',
      'Annadata Policy 2047',
      'Agriculture',
      'Policy Innovation',
      'Student Leadership',
      'Social Impact'
    ],
    accent: {
      bar: 'from-transparent via-amber-400 to-transparent',
      glowTop: 'from-amber-500/10 via-purple-500/5 to-transparent',
      glowBottom: 'from-indigo-500/10 via-purple-500/5 to-transparent',
      border: 'border-amber-500/25 hover:border-amber-500/40',
      shadow: 'shadow-[0_0_35px_rgba(245,158,11,0.08)]',
      awardText: 'text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]',
      badge1: 'bg-amber-500/20 text-amber-300 border-amber-500/35',
      badge2: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
      issuerText: 'text-amber-400/90',
      button: 'bg-gradient-to-r from-amber-500/15 via-indigo-600/20 to-purple-600/20 hover:from-amber-500/25 hover:via-indigo-600/30 hover:to-purple-600/30 border-amber-500/30 hover:border-amber-500/50 shadow-amber-500/5',
      chevron: 'text-amber-400',
      metric1Box: 'bg-gradient-to-b from-amber-500/10 to-amber-500/5 border-amber-500/25 text-amber-300',
      metric1Label: 'text-amber-200/70',
      statementBox: 'from-amber-500/10 via-indigo-600/10 to-purple-600/10 border-amber-500/30 shadow-amber-500/5',
      statementText: 'from-amber-300 via-white to-indigo-300',
      headingAccent: 'text-amber-400',
      dot: 'bg-amber-400',
      hoverMediaBorder: 'hover:border-amber-500/40'
    },
    metrics: [
      { value: '1st', label: 'Prize' },
      { value: '3', label: 'Team Members' },
      { value: 'ANNADATA', label: 'Policy 2047' }
    ],
    prominentStatement: '“From an idea on paper to a policy pitch on stage to 1st Prize.”',
    descriptionLabel: 'Description',
    description: 'Presented ANNADATA POLICY 2047, “One Farmer, One Resolution”, a farmer-centric policy proposal focused on improving agricultural grievance coordination and making government services more accessible and accountable for farmers.',
    coreReflectionLabel: 'Core Idea',
    coreReflection: '“A farmer should report the problem once. The system should take responsibility for coordinating the solution.”',
    storyLabel: 'Achievement Story',
    storyP1: 'Our team presented the policy proposal at the Youth Leadership & Governance Forum 2026 and won 1st Prize.',
    storyP2: 'The experience focused on understanding real problems, questioning existing systems, discussing practical solutions, and designing a policy around the needs of farmers.',
    takeawayLabel: 'Key Takeaway',
    takeaway: 'Policy innovation is most impactful when it bridges grassroots realities with systemic accountability — transforming fragmented agricultural grievances into a unified, responsive governance model.',
    media: [
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1789101010/WhatsApp_Image_2026-09-11_at_9.58.10_AM_cwpojm.jpg',
        title: 'Stage Presentation & Pitch',
        caption: 'Presenting ANNADATA POLICY 2047 on stage at the Youth Leadership & Governance Forum 2026'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1789101131/20260910_182648.jpg_fg4o9x.jpg',
        title: '1st Prize Certificate & Team',
        caption: 'Official 1st Prize Certificate awarded to the team for Annadata Policy 2047'
      },
      {
        type: 'video',
        url: 'https://res.cloudinary.com/do4nuj2kh/video/upload/v1789101423/WhatsApp_Video_2026-09-11_at_9.59.34_AM_ydy3wj.mp4',
        poster: 'https://res.cloudinary.com/do4nuj2kh/video/upload/v1789101423/WhatsApp_Video_2026-09-11_at_9.59.34_AM_ydy3wj.jpg',
        title: 'Stage Pitch & Announcement Video',
        caption: 'Live footage of the presentation and 1st Prize announcement'
      }
    ],
    details: {
      leftTitle: 'Team',
      leftIcon: 'users',
      teamList: ['Karthik Nimmanagoti', 'Murari Muthavarapu', 'Dheeraj Masetty'],
      rightTitle: 'Acknowledgements',
      rightIcon: 'check',
      ackList: [
        { name: 'Social Impact Club', role: 'Student Organisation' },
        { name: 'Ponugoti Kruthik Rao', role: 'President, NIAT Social Impact Club' },
        { name: 'ANAND MOKKAPATI', role: 'BOA' }
      ]
    }
  },
  {
    id: 'reel-contest',
    awardBadgeText: '🏆 Contest Winner',
    badgePrimary: 'WINNER',
    badgeSecondary: 'CREATIVE STORYTELLING',
    metricPill: 'Trophy & Certificate',
    metricPillIcon: 'award',
    issuer: 'NxtWave (NIAT)',
    title: 'Festive Reel Contest Winner',
    subtitle: '“Creativity, consistency, and passion turn small ideas into meaning.”',
    shortDesc: 'Awarded Certificate of Appreciation and trophy for performance in the Festive Reel Making Contest during Diwali celebrations.',
    tags: [
      'Content Creation',
      'Storytelling',
      'Creative Strategy',
      'Video Editing'
    ],
    accent: {
      bar: 'from-transparent via-fuchsia-400 to-transparent',
      glowTop: 'from-fuchsia-500/10 via-pink-500/5 to-transparent',
      glowBottom: 'from-purple-500/10 via-indigo-500/5 to-transparent',
      border: 'border-fuchsia-500/25 hover:border-fuchsia-500/40',
      shadow: 'shadow-[0_0_35px_rgba(217,70,239,0.08)]',
      awardText: 'text-fuchsia-300 drop-shadow-[0_0_12px_rgba(217,70,239,0.3)]',
      badge1: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/35',
      badge2: 'bg-pink-500/15 text-pink-300 border-pink-500/25',
      issuerText: 'text-fuchsia-400/90',
      button: 'bg-gradient-to-r from-fuchsia-500/15 via-purple-600/20 to-pink-600/20 hover:from-fuchsia-500/25 hover:via-purple-600/30 hover:to-pink-600/30 border-fuchsia-500/30 hover:border-fuchsia-500/50 shadow-fuchsia-500/5',
      chevron: 'text-fuchsia-400',
      metric1Box: 'bg-gradient-to-b from-fuchsia-500/10 to-fuchsia-500/5 border-fuchsia-500/25 text-fuchsia-300',
      metric1Label: 'text-fuchsia-200/70',
      statementBox: 'from-fuchsia-500/10 via-purple-600/10 to-pink-600/10 border-fuchsia-500/30 shadow-fuchsia-500/5',
      statementText: 'from-fuchsia-300 via-white to-pink-300',
      headingAccent: 'text-fuchsia-400',
      dot: 'bg-fuchsia-400',
      hoverMediaBorder: 'hover:border-fuchsia-500/40'
    },
    metrics: [
      { value: '1st', label: 'Contest Win' },
      { value: 'Diwali', label: 'Celebrations' },
      { value: 'Trophy', label: '& Certificate' }
    ],
    prominentStatement: '“Turning creativity, consistency, and passion into meaningful visual storytelling.”',
    descriptionLabel: 'Recognition',
    description: 'Honored with a Certificate of Appreciation and a trophy for performance in the Festive Reel Making Contest during the Diwali celebrations organized at NxtWave (NIAT).',
    coreReflectionLabel: 'Personal Takeaway',
    coreReflection: '“This recognition reminds me how creativity, consistency, and passion can turn small ideas into something meaningful.”',
    storyLabel: 'Achievement Story',
    storyP1: 'Conceptualized, shot, and edited a dynamic festival reel capturing the cultural spirit, vibrant energy, and camaraderie of Diwali celebrations on campus.',
    storyP2: 'The challenge was to craft a narrative that felt genuine rather than staged — utilizing seamless beat-matched transitions and compelling campus perspectives that connected with peers.',
    takeawayLabel: 'Key Takeaway',
    takeaway: 'Authentic visual storytelling creates lasting resonance when technical craft is matched with genuine emotion and consistent creative discipline.',
    media: [
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122425_ub5wyz.png',
        title: 'Certificate of Appreciation',
        caption: 'Certificate of Appreciation for Festive Reel Making during Diwali celebrations'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122412_bnwpvh.png',
        title: 'Winner Trophy & Felicitation',
        caption: 'Honored with the winner trophy for creative storytelling at NxtWave (NIAT)'
      }
    ],
    details: {
      leftTitle: 'Host & Institution',
      leftIcon: 'award',
      ackList: [
        { name: 'NxtWave (NIAT)', role: 'Award Issuer & Host' },
        { name: 'Diwali Celebrations', role: 'Campus Cultural Festival' }
      ],
      rightTitle: 'Creative Execution',
      rightIcon: 'sparkles',
      ackListRight: [
        { name: 'Visual Storytelling', role: 'Short-Form Narrative Direction' },
        { name: 'Creative Consistency', role: 'Pacing, Color Grading & Audio Sync' }
      ]
    }
  },
  {
    id: 'best-student',
    awardBadgeText: '🏆 Best Student',
    badgePrimary: 'WORTH IT AWARDS',
    badgeSecondary: 'CONSISTENCY & DISCIPLINE',
    metricPill: 'Parents’ Success Meet',
    metricPillIcon: 'heart',
    issuer: 'NxtWave (NIAT)',
    title: 'Best Student Awardee',
    subtitle: '“A moment that redefined success through quiet consistency.”',
    shortDesc: 'Recognized at the Parents’ Success Meet – Worth It Awards, celebrating dedication and discipline.',
    tags: [
      'Leadership',
      'Growth',
      'Family',
      'Discipline',
      'Student Excellence'
    ],
    accent: {
      bar: 'from-transparent via-orange-400 to-transparent',
      glowTop: 'from-orange-500/10 via-amber-500/5 to-transparent',
      glowBottom: 'from-rose-500/10 via-purple-500/5 to-transparent',
      border: 'border-orange-500/25 hover:border-orange-500/40',
      shadow: 'shadow-[0_0_35px_rgba(249,115,22,0.08)]',
      awardText: 'text-orange-300 drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]',
      badge1: 'bg-orange-500/20 text-orange-300 border-orange-500/35',
      badge2: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
      issuerText: 'text-orange-400/90',
      button: 'bg-gradient-to-r from-orange-500/15 via-rose-600/20 to-amber-600/20 hover:from-orange-500/25 hover:via-rose-600/30 hover:to-amber-600/30 border-orange-500/30 hover:border-orange-500/50 shadow-orange-500/5',
      chevron: 'text-orange-400',
      metric1Box: 'bg-gradient-to-b from-orange-500/10 to-orange-500/5 border-orange-500/25 text-orange-300',
      metric1Label: 'text-orange-200/70',
      statementBox: 'from-orange-500/10 via-rose-600/10 to-amber-600/10 border-orange-500/30 shadow-orange-500/5',
      statementText: 'from-orange-300 via-white to-amber-300',
      headingAccent: 'text-orange-400',
      dot: 'bg-orange-400',
      hoverMediaBorder: 'hover:border-orange-500/40'
    },
    metrics: [
      { value: 'Top', label: 'Student Honor' },
      { value: 'Worth It', label: 'Annual Awards' },
      { value: 'Values', label: 'Consistency First' }
    ],
    prominentStatement: '“A defining milestone shared with family — celebrating consistency over words.”',
    descriptionLabel: 'Recognition',
    description: 'Stood on stage at the Parents’ Success Meet – Worth It Awards. The real highlight wasn’t just the award, it was seeing my father in the audience — proud, silent, and fulfilled.',
    coreReflectionLabel: 'Personal Takeaway',
    coreReflection: '“A man who taught me discipline not through words, but through consistency. That moment redefined success for me.”',
    storyLabel: 'Achievement Story',
    storyP1: 'Recognized at the Parents’ Success Meet – Worth It Awards for sustained academic dedication, peer mentoring, and campus leadership.',
    storyP2: 'The true meaning of this achievement was grounded in family — witnessing my father witness the results of the discipline he quietly taught me every single day.',
    takeawayLabel: 'Key Takeaway',
    takeaway: 'True success is not measured solely by stage recognition, but by living up to the values and quiet sacrifices of the people who shaped you.',
    media: [
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122112_mj2ygi.png',
        title: 'Stage Felicitation',
        caption: 'Parents’ Success Meet – Worth It Awards milestone stage recognition'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122124_pj7rab.png',
        title: 'Best Student Award Felicitation',
        caption: 'Official Best Student Awardee honors at NxtWave (NIAT)'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122051_mowwqz.png',
        title: 'With My Father',
        caption: 'Sharing the proud, defining moment with my father in attendance'
      }
    ],
    details: {
      leftTitle: 'Event & Organization',
      leftIcon: 'award',
      ackList: [
        { name: 'NxtWave (NIAT)', role: 'Institution & Award Issuer' },
        { name: 'Parents’ Success Meet', role: 'Worth It Awards Ceremony' }
      ],
      rightTitle: 'Core Principles',
      rightIcon: 'heart',
      ackListRight: [
        { name: 'Discipline', role: 'Daily consistency and work ethic' },
        { name: 'Family Values', role: 'Humility, dedication and accountability' }
      ]
    }
  },
  {
    id: 'outstanding-leadership',
    awardBadgeText: '🏆 Outstanding Leader',
    badgePrimary: 'PRESIDENT',
    badgeSecondary: 'COMMUNITY STEWARDSHIP',
    metricPill: '2024–2026 Tenure',
    metricPillIcon: 'shield',
    issuer: 'NxtWave (NIAT)',
    title: 'Outstanding Leadership Award',
    subtitle: '“Reflecting the collective effort, dedication, and support of our team.”',
    shortDesc: 'Honored for serving as President of the Influencers Club NIAT for the 2024–2026 academic years.',
    tags: [
      'Leadership',
      'Student Leadership',
      'Community',
      'Event Management'
    ],
    accent: {
      bar: 'from-transparent via-cyan-400 to-transparent',
      glowTop: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      glowBottom: 'from-indigo-500/10 via-violet-500/5 to-transparent',
      border: 'border-cyan-500/25 hover:border-cyan-500/40',
      shadow: 'shadow-[0_0_35px_rgba(6,182,212,0.08)]',
      awardText: 'text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]',
      badge1: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/35',
      badge2: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
      issuerText: 'text-cyan-400/90',
      button: 'bg-gradient-to-r from-cyan-500/15 via-indigo-600/20 to-purple-600/20 hover:from-cyan-500/25 hover:via-indigo-600/30 hover:to-purple-600/30 border-cyan-500/30 hover:border-cyan-500/50 shadow-cyan-500/5',
      chevron: 'text-cyan-400',
      metric1Box: 'bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 border-cyan-500/25 text-cyan-300',
      metric1Label: 'text-cyan-200/70',
      statementBox: 'from-cyan-500/10 via-indigo-600/10 to-purple-600/10 border-cyan-500/30 shadow-cyan-500/5',
      statementText: 'from-cyan-300 via-white to-indigo-300',
      headingAccent: 'text-cyan-400',
      dot: 'bg-cyan-400',
      hoverMediaBorder: 'hover:border-cyan-500/40'
    },
    metrics: [
      { value: 'President', label: 'Influencers Club' },
      { value: '2 Years', label: '2024–2026 Tenure' },
      { value: '500+', label: 'Students Mentored' }
    ],
    prominentStatement: '“Leadership is the collective dedication of everyone who believed in the journey.”',
    descriptionLabel: 'Recognition',
    description: 'Honored to receive this award for serving as President of the Influencers Club NIAT for the academic year 2024–2026, spearheading creator summits and student initiatives.',
    coreReflectionLabel: 'Personal Takeaway',
    coreReflection: '“This recognition reflects the collective effort, dedication, and support of everyone who contributed to our journey.”',
    storyLabel: 'Achievement Story',
    storyP1: 'Led the Influencers Club through two transformative years — curating keynote sessions with top creators, organizing crowd logistics for hundreds of students, and driving community initiatives.',
    storyP2: 'The milestone recognized the discipline required to build an engaging club culture from the ground up and empower fellow students to share their creative ideas.',
    takeawayLabel: 'Key Takeaway',
    takeaway: 'True leadership is not about personal spotlight; it is about creating a thriving platform where others can discover their voice and confidence.',
    media: [
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1778312568/Screenshot_2026-05-09_131109_h0satx.png',
        title: 'Outstanding Leadership Certificate',
        caption: 'Certificate of Outstanding Leadership awarded for service as President of Influencers Club NIAT'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1778312568/Screenshot_2026-05-09_131157_ztgn2z.png',
        title: 'Presidential Felicitation',
        caption: 'Recognition for leading the Influencers Club across the 2024–2026 academic tenure'
      }
    ],
    details: {
      leftTitle: 'Leadership Role',
      leftIcon: 'shield',
      ackList: [
        { name: 'Influencers Club NIAT', role: 'President (2024–2026)' },
        { name: 'NxtWave (NIAT)', role: 'Campus Leadership Council' }
      ],
      rightTitle: 'Impact Highlights',
      rightIcon: 'users',
      ackListRight: [
        { name: 'Guest Creator Summits', role: 'Ishan Sharma, Tharun Naik, Madhu Kiran' },
        { name: 'Student Growth', role: 'Workshops in Content & Communication' }
      ]
    }
  }
];

export default function AchievementsSection() {
  // Accordion state: only one achievement card expanded at a time
  const [expandedId, setExpandedId] = useState('annadata-policy-2047');
  
  // Shared Lightbox state
  const [lightboxData, setLightboxData] = useState(null); // { items, index }
  const [isZoomed, setIsZoomed] = useState(false);
  const lightboxVideoRef = useRef(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxData) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxData((prev) => {
          if (!prev) return null;
          const nextIndex = prev.index === 0 ? prev.items.length - 1 : prev.index - 1;
          return { ...prev, index: nextIndex };
        });
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxData((prev) => {
          if (!prev) return null;
          const nextIndex = prev.index === prev.items.length - 1 ? 0 : prev.index + 1;
          return { ...prev, index: nextIndex };
        });
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxData]);

  // Pause video when closing lightbox or switching media
  useEffect(() => {
    if (lightboxData && lightboxData.items[lightboxData.index]?.type !== 'video' && lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
  }, [lightboxData]);

  const openLightbox = (items, index) => {
    setLightboxData({ items, index });
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
    setIsZoomed(false);
    setLightboxData(null);
  };

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePrevMedia = (e) => {
    e.stopPropagation();
    setIsZoomed(false);
    setLightboxData((prev) => {
      if (!prev) return null;
      const nextIndex = prev.index === 0 ? prev.items.length - 1 : prev.index - 1;
      return { ...prev, index: nextIndex };
    });
  };

  const handleNextMedia = (e) => {
    e.stopPropagation();
    setIsZoomed(false);
    setLightboxData((prev) => {
      if (!prev) return null;
      const nextIndex = prev.index === prev.items.length - 1 ? 0 : prev.index + 1;
      return { ...prev, index: nextIndex };
    });
  };

  const toggleFullscreen = () => {
    if (!lightboxVideoRef.current) return;
    if (lightboxVideoRef.current.requestFullscreen) {
      lightboxVideoRef.current.requestFullscreen();
    } else if (lightboxVideoRef.current.webkitRequestFullscreen) {
      lightboxVideoRef.current.webkitRequestFullscreen();
    }
  };

  return (
    <div className="w-full space-y-6">
      {ACHIEVEMENTS_DATA.map((achievement) => {
        const isExpanded = expandedId === achievement.id;
        const accent = achievement.accent;

        return (
          <motion.div
            key={achievement.id}
            layout
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-3xl overflow-hidden glass-panel border ${accent.border} ${accent.shadow} transition-colors duration-300`}
          >
            {/* Subtle decorative background gradients */}
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${accent.glowTop} rounded-full blur-3xl pointer-events-none -mr-20 -mt-20`} />
            <div className={`absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr ${accent.glowBottom} rounded-full blur-3xl pointer-events-none -ml-20 -mb-20`} />

            {/* Top Accent Bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${accent.bar} opacity-80`} />

            {/* Collapsed Achievement Card Header */}
            <div className="p-6 sm:p-8 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                {/* 🏆 Award Badge & Pill Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`text-base sm:text-lg font-extrabold ${accent.awardText} flex items-center gap-1.5`}>
                    {achievement.awardBadgeText}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${accent.badge1}`}>
                    {achievement.badgePrimary}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${accent.badge2}`}>
                    <Sparkles size={11} className="shrink-0" />
                    {achievement.badgeSecondary}
                  </span>
                </div>

                {/* Metric Pill */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  {achievement.metricPillIcon === 'users' && <Users size={13} className="text-indigo-400" />}
                  {achievement.metricPillIcon === 'award' && <Award size={13} className="text-fuchsia-400" />}
                  {achievement.metricPillIcon === 'heart' && <Heart size={13} className="text-rose-400" />}
                  {achievement.metricPillIcon === 'shield' && <ShieldCheck size={13} className="text-cyan-400" />}
                  <span>{achievement.metricPill}</span>
                </div>
              </div>

              {/* Forum / Issuer */}
              <p className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wider uppercase mb-1">
                {achievement.issuer}
              </p>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-2 font-display">
                {achievement.title}
              </h3>

              {/* Tagline / Subtitle */}
              <p className="text-sm sm:text-base text-indigo-300/90 font-medium italic mb-4">
                {achievement.subtitle}
              </p>

              {/* Compact Tags Row in Collapsed State */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {achievement.tags.slice(0, 4).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-medium text-slate-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {achievement.tags.length > 4 && (
                  <span className="text-[10px] font-medium text-slate-500 self-center">
                    +{achievement.tags.length - 4} more
                  </span>
                )}
              </div>

              {/* View Achievement Action Button */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => toggleAccordion(achievement.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl ${accent.button} text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer`}
                >
                  <span>{isExpanded ? 'Collapse Achievement' : 'View Achievement'}</span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} className={accent.chevron} />
                  </motion.span>
                </button>

                {!isExpanded && (
                  <span className="text-[11px] text-slate-400 hidden sm:inline-block">
                    Story • Media Gallery • Personal Takeaway
                  </span>
                )}
              </div>
            </div>

            {/* Expanded Details Revealed on Click */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="expanded-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-white/10 bg-slate-950/40 overflow-hidden"
                >
                  <div className="p-6 sm:p-8 space-y-8">
                    
                    {/* 1. KEY METRICS ROW */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-6">
                      {/* Metric 1 */}
                      <motion.div 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.35 }}
                        className={`p-4 sm:p-5 rounded-2xl ${accent.metric1Box} text-center relative overflow-hidden group transition`}
                      >
                        <div className="text-2xl sm:text-4xl font-extrabold font-display mb-1 flex items-center justify-center gap-1">
                          <span>{achievement.metrics[0].value}</span>
                        </div>
                        <p className={`text-[10px] sm:text-xs font-semibold ${accent.metric1Label} uppercase tracking-wider`}>
                          {achievement.metrics[0].label}
                        </p>
                      </motion.div>

                      {/* Metric 2 */}
                      <motion.div 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.35 }}
                        className="p-4 sm:p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center relative overflow-hidden group hover:border-indigo-500/35 transition"
                      >
                        <div className="text-2xl sm:text-4xl font-extrabold text-indigo-300 font-display mb-1">
                          {achievement.metrics[1].value}
                        </div>
                        <p className="text-[10px] sm:text-xs font-semibold text-indigo-200/70 uppercase tracking-wider">
                          {achievement.metrics[1].label}
                        </p>
                      </motion.div>

                      {/* Metric 3 */}
                      <motion.div 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.35 }}
                        className="p-4 sm:p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center relative overflow-hidden group hover:border-purple-500/35 transition"
                      >
                        <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-purple-300 font-display mb-1 tracking-tight truncate">
                          {achievement.metrics[2].value}
                        </div>
                        <p className="text-[10px] sm:text-xs font-semibold text-purple-200/70 uppercase tracking-wider">
                          {achievement.metrics[2].label}
                        </p>
                      </motion.div>
                    </div>

                    {/* 2. PROMINENT STATEMENT */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.18, duration: 0.4 }}
                      className={`relative p-6 sm:p-7 rounded-2xl bg-gradient-to-r ${accent.statementBox} text-center shadow-lg`}
                    >
                      <p className={`text-lg sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${accent.statementText} font-display leading-snug`}>
                        {achievement.prominentStatement}
                      </p>
                    </motion.div>

                    {/* 3. DESCRIPTION & CORE REFLECTION & ACHIEVEMENT STORY */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column: Description & Core Reflection */}
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                            {achievement.descriptionLabel}
                          </h4>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>

                        {/* Core Reflection Box */}
                        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 relative overflow-hidden">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300 mt-0.5">
                              <Lightbulb size={18} />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                                {achievement.coreReflectionLabel}
                              </h4>
                              <p className="text-white text-xs sm:text-sm font-medium leading-relaxed">
                                {achievement.coreReflection}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Achievement Story & Key Takeaway */}
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className={`text-xs font-bold uppercase tracking-wider ${accent.headingAccent} mb-2`}>
                            {achievement.storyLabel}
                          </h4>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                            {achievement.storyP1}
                          </p>
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                            {achievement.storyP2}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15">
                          <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-indigo-300">
                            <ShieldCheck size={15} />
                            <span>{achievement.takeawayLabel}</span>
                          </div>
                          <p className="text-slate-300 text-xs leading-relaxed">
                            {achievement.takeaway}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 4. MEDIA GALLERY / COLLAGE */}
                    {achievement.media && achievement.media.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                            Media Gallery &amp; Honors
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            Click any item to view full screen
                          </span>
                        </div>

                        {/* 3 Media Items: Large Left + 2 Stacked Right */}
                        {achievement.media.length === 3 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                            {/* Item 1: Large Photo 1 on Left */}
                            <div 
                              onClick={() => openLightbox(achievement.media, 0)}
                              className={`lg:col-span-7 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 ${accent.hoverMediaBorder} transition-all duration-300 group cursor-pointer flex items-center justify-center`}
                            >
                              <img 
                                src={achievement.media[0].url} 
                                alt="" 
                                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                              />
                              <img 
                                src={achievement.media[0].url} 
                                alt={achievement.media[0].title}
                                loading="lazy"
                                decoding="async"
                                className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none z-10" />
                              
                              <div className="absolute top-3 left-3 z-20">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10 backdrop-blur-md">
                                  Photo 1
                                </span>
                              </div>

                              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                                <div>
                                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition">
                                    {achievement.media[0].title}
                                  </p>
                                  <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-1">
                                    {achievement.media[0].caption}
                                  </p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center shrink-0 backdrop-blur-md transition">
                                  <Maximize2 size={14} />
                                </div>
                              </div>
                            </div>

                            {/* Right Column: Photo 2 on Top, Photo 3 / Video Preview Underneath */}
                            <div className="lg:col-span-5 flex flex-col gap-4">
                              {/* Item 2 */}
                              <div 
                                onClick={() => openLightbox(achievement.media, 1)}
                                className={`relative h-48 sm:h-52 lg:h-[222px] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 ${accent.hoverMediaBorder} transition-all duration-300 group cursor-pointer flex items-center justify-center`}
                              >
                                <img 
                                  src={achievement.media[1].url} 
                                  alt="" 
                                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                                />
                                <img 
                                  src={achievement.media[1].url} 
                                  alt={achievement.media[1].title}
                                  loading="lazy"
                                  decoding="async"
                                  className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none z-10" />
                                
                                <div className="absolute top-3 left-3 z-20">
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10 backdrop-blur-md">
                                    Photo 2
                                  </span>
                                </div>

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                                  <div>
                                    <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                                      {achievement.media[1].title}
                                    </p>
                                    <p className="text-[10px] text-slate-300 line-clamp-1">
                                      {achievement.media[1].caption}
                                    </p>
                                  </div>
                                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center shrink-0 backdrop-blur-md transition">
                                    <Maximize2 size={12} />
                                  </div>
                                </div>
                              </div>

                              {/* Item 3 (Video or Photo 3) */}
                              <div 
                                onClick={() => openLightbox(achievement.media, 2)}
                                className={`relative h-48 sm:h-52 lg:h-[222px] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 ${accent.hoverMediaBorder} transition-all duration-300 group cursor-pointer flex items-center justify-center`}
                              >
                                {achievement.media[2].type === 'video' ? (
                                  <>
                                    <img 
                                      src={achievement.media[2].poster} 
                                      alt="" 
                                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                                    />
                                    <img 
                                      src={achievement.media[2].poster} 
                                      alt={achievement.media[2].title}
                                      loading="lazy"
                                      decoding="async"
                                      className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors pointer-events-none z-10" />
                                    
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-amber-500/90 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-all duration-300">
                                        <Play size={22} className="ml-1 fill-current" />
                                      </div>
                                    </div>

                                    <div className="absolute top-3 left-3 z-20">
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10 backdrop-blur-md flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        Video Preview
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <img 
                                      src={achievement.media[2].url} 
                                      alt="" 
                                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                                    />
                                    <img 
                                      src={achievement.media[2].url} 
                                      alt={achievement.media[2].title}
                                      loading="lazy"
                                      decoding="async"
                                      className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none z-10" />
                                    
                                    <div className="absolute top-3 left-3 z-20">
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10 backdrop-blur-md">
                                        Photo 3
                                      </span>
                                    </div>
                                  </>
                                )}

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                                  <div>
                                    <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                                      {achievement.media[2].title}
                                    </p>
                                    <p className="text-[10px] text-slate-300 line-clamp-1">
                                      {achievement.media[2].type === 'video' ? 'Watch presentation video' : achievement.media[2].caption}
                                    </p>
                                  </div>
                                  <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded bg-black/50 border border-white/10">
                                    {achievement.media[2].type === 'video' ? 'Play' : 'View'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2 Media Items: Balanced 2-Column Grid */}
                        {achievement.media.length === 2 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {achievement.media.map((item, mIdx) => (
                              <div
                                key={mIdx}
                                onClick={() => openLightbox(achievement.media, mIdx)}
                                className={`relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 ${accent.hoverMediaBorder} transition-all duration-300 group cursor-pointer flex items-center justify-center`}
                              >
                                <img 
                                  src={item.url} 
                                  alt="" 
                                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                                />
                                <img 
                                  src={item.url} 
                                  alt={item.title}
                                  loading="lazy"
                                  decoding="async"
                                  className="relative z-10 w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none z-10" />

                                <div className="absolute top-3 left-3 z-20">
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10 backdrop-blur-md">
                                    Photo {mIdx + 1}
                                  </span>
                                </div>

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                                  <div>
                                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition">
                                      {item.title}
                                    </p>
                                    <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-1">
                                      {item.caption}
                                    </p>
                                  </div>
                                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center shrink-0 backdrop-blur-md transition">
                                    <Maximize2 size={12} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 1 Media Item */}
                        {achievement.media.length === 1 && (
                          <div 
                            onClick={() => openLightbox(achievement.media, 0)}
                            className={`relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 ${accent.hoverMediaBorder} transition-all duration-300 group cursor-pointer flex items-center justify-center`}
                          >
                            <img 
                              src={achievement.media[0].url} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                            />
                            <img 
                              src={achievement.media[0].url} 
                              alt={achievement.media[0].title}
                              loading="lazy"
                              decoding="async"
                              className="relative z-10 w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none z-10" />

                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                              <div>
                                <p className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition">
                                  {achievement.media[0].title}
                                </p>
                                <p className="text-[10px] text-slate-300">
                                  {achievement.media[0].caption}
                                </p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center shrink-0 backdrop-blur-md transition">
                                <Maximize2 size={14} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 5. TEAM / ORGANIZATION & DETAILS */}
                    {achievement.details && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Left Box */}
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-1.5">
                            {achievement.details.leftIcon === 'users' && <Users size={14} />}
                            {achievement.details.leftIcon === 'award' && <Award size={14} />}
                            {achievement.details.leftIcon === 'shield' && <ShieldCheck size={14} />}
                            {achievement.details.leftTitle}
                          </h4>
                          <div className="space-y-2.5">
                            {achievement.details.teamList ? (
                              achievement.details.teamList.map((name, idx) => (
                                <div 
                                  key={idx}
                                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/50 border border-white/5"
                                >
                                  <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-xs font-bold shrink-0">
                                    {name.charAt(0)}
                                  </div>
                                  <span className="text-xs sm:text-sm font-semibold text-white">
                                    {name}
                                  </span>
                                </div>
                              ))
                            ) : (
                              achievement.details.ackList.map((item, idx) => (
                                <div 
                                  key={idx}
                                  className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between"
                                >
                                  <span className="text-xs sm:text-sm font-semibold text-white">
                                    {item.name}
                                  </span>
                                  <span className="text-[10px] sm:text-[11px] text-slate-400">
                                    {item.role}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Right Box */}
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                            <CheckCircle2 size={14} className={accent.headingAccent} />
                            {achievement.details.rightTitle}
                          </h4>
                          <div className="space-y-2.5">
                            {(achievement.details.ackListRight || achievement.details.ackList).map((item, idx) => (
                              <div 
                                key={idx}
                                className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between"
                              >
                                <span className="text-xs sm:text-sm font-semibold text-white">
                                  {item.name}
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-400">
                                  {item.role}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 6. TAGS */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-2">
                        {achievement.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="text-[11px] font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-lg transition"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 7. Bottom Collapse Button */}
                    <div className="pt-4 flex justify-center">
                      <button
                        onClick={() => setExpandedId(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                      >
                        <ChevronUp size={14} />
                        <span>Collapse Details</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Shared Full-Screen Media Lightbox Modal */}
      <AnimatePresence>
        {lightboxData !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
          >
            {/* Top Control Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl flex items-center justify-between py-2 border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {lightboxData.index + 1} of {lightboxData.items.length}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {lightboxData.items[lightboxData.index].title}
                </span>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                {/* Photo Zoom Button */}
                {lightboxData.items[lightboxData.index].type === 'image' && (
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    title={isZoomed ? "Zoom Out" : "Zoom In"}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
                  >
                    {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  </button>
                )}

                {/* Video Fullscreen Button */}
                {lightboxData.items[lightboxData.index].type === 'video' && (
                  <button
                    onClick={toggleFullscreen}
                    title="Fullscreen"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
                  >
                    <Maximize2 size={18} />
                  </button>
                )}

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  title="Close (Esc)"
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-slate-200 hover:text-white transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Media Content Area */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden"
            >
              {/* Previous Button */}
              {lightboxData.items.length > 1 && (
                <button
                  onClick={handlePrevMedia}
                  title="Previous (Left Arrow)"
                  className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/10 hover:border-amber-400 transition shadow-lg cursor-pointer"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {/* Next Button */}
              {lightboxData.items.length > 1 && (
                <button
                  onClick={handleNextMedia}
                  title="Next (Right Arrow)"
                  className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/10 hover:border-amber-400 transition shadow-lg cursor-pointer"
                >
                  <ChevronRight size={22} />
                </button>
              )}

              {/* Media Render */}
              {lightboxData.items[lightboxData.index].type === 'image' ? (
                <div className={`w-full h-full flex items-center justify-center overflow-auto ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                  <img
                    src={lightboxData.items[lightboxData.index].url}
                    alt={lightboxData.items[lightboxData.index].title}
                    onClick={() => setIsZoomed(!isZoomed)}
                    style={{ transform: isZoomed ? 'scale(1.75)' : 'scale(1)' }}
                    className="max-h-[75vh] max-w-[85vw] object-contain rounded-xl transition-transform duration-300 select-none shadow-2xl"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center max-w-3xl">
                  <div className="relative w-full aspect-video sm:aspect-auto max-h-[75vh] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center">
                    <video
                      ref={lightboxVideoRef}
                      src={lightboxData.items[lightboxData.index].url}
                      poster={lightboxData.items[lightboxData.index].poster}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full max-h-[75vh] object-contain bg-black"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Caption & Controls */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl text-center py-2"
            >
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {lightboxData.items[lightboxData.index].caption}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {lightboxData.items.length > 1 && (
                  <>Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">→</kbd> to navigate, </>
                )}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">Esc</kbd> to exit
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
