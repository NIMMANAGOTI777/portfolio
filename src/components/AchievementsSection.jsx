import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { 
  Play, X, ChevronLeft, ChevronRight, 
  Film, Trophy, ArrowRight, Pause, Eye
} from 'lucide-react';

const BAPPA_REEL_VIDEO_URL = 'https://res.cloudinary.com/do4nuj2kh/video/upload/v1789962558/WhatsApp_Video_2026-09-21_at_9.17.52_AM_ifitl1.mp4'; 

const ACHIEVEMENTS_DATA = [
  {
    id: 'annadata-policy-2047',
    priority: 1,
    awardBadgeText: '🥇 1st Prize',
    badgePrimary: '1ST PRIZE',
    badgeSecondary: 'POLICY INNOVATION',
    metricPill: 'Team Achievement',
    metricPillIcon: 'users',
    issuer: 'Youth Leadership & Governance Forum 2026',
    title: 'ANNADATA POLICY 2047',
    subtitle: '“One Farmer, One Resolution”',
    shortDesc: 'A farmer-centric policy proposal focused on agricultural grievance coordination and accountable governance.',
    featuredRank: '🥇 Featured #1',
    tags: [
      'Youth Leadership',
      'Governance',
      'Annadata Policy 2047',
      'Agriculture',
      'Policy Innovation'
    ],
    accent: {
      bar: 'from-[#FF5A1F] via-[#FF7A18] to-transparent',
      border: 'border-[#FF5A1F]/30 hover:border-[#FF5A1F]/60',
      shadow: 'shadow-[0_0_35px_rgba(255,90,31,0.12)]',
      awardText: 'text-[#FF7A18]',
      badge1: 'bg-[#FF5A1F]/20 text-[#FFA87D] border-[#FF5A1F]/35',
      badge2: 'bg-white/10 text-white border-white/15',
      button: 'bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white',
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
    id: 'bappa-through-your-lens',
    priority: 2,
    awardBadgeText: '🥈 Runner-Up',
    badgePrimary: 'RUNNER-UP',
    badgeSecondary: 'REEL CONTEST',
    metricPill: 'NIAT Media Club',
    metricPillIcon: 'video',
    issuer: 'NIAT Media Club',
    creator: 'Karthik.exe',
    title: 'BAPPA THROUGH YOUR LENS',
    subtitle: '“Finding a story in the celebration — translating an idea into visuals frame by frame.”',
    shortDesc: 'Selected as Runner-Up in the BAPPA THROUGH YOUR LENS Reel Contest created under Karthik.exe for NIAT Media Club.',
    featuredRank: '🥈 Featured #2',
    tags: [
      'Reel Contest',
      'Content Creation',
      'Video Editing',
      'Visual Storytelling',
      'Creative Direction'
    ],
    accent: {
      bar: 'from-[#FF7A18] via-amber-400 to-transparent',
      border: 'border-white/15 hover:border-[#FF5A1F]/50',
      shadow: 'shadow-[0_0_35px_rgba(255,122,24,0.1)]',
      awardText: 'text-[#FFA87D]',
      badge1: 'bg-white/10 text-slate-200 border-white/20',
      badge2: 'bg-[#FF5A1F]/15 text-[#FFA87D] border-[#FF5A1F]/30',
      button: 'bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white',
    },
    metrics: [
      { value: '2nd', label: 'Runner-Up Result' },
      { value: '31s', label: 'Short-Form Reel' },
      { value: 'Karthik.exe', label: 'Creator Handle' }
    ],
    prominentStatement: '“Finding a story in the celebration — translating an idea into visuals, frame by frame.”',
    descriptionLabel: 'Recognition & Overview',
    description: 'My reel, created under the name Karthik.exe, was selected as the Runner-Up in the BAPPA THROUGH YOUR LENS – Reel Contest organized by the NIAT Media Club.',
    coreReflectionLabel: 'Creative Process',
    coreReflection: '“This experience was about finding a story in the celebration, translating an idea into visuals, and paying attention to every frame, transition, and detail.”',
    storyLabel: 'Production & Recognition',
    storyP1: 'From planning the concept to shooting and editing the final 31-second reel, I enjoyed the complete creative process — focusing on precise beat matching, dynamic color grading, and framing the festive energy.',
    storyP2: 'A big thank you to the NIAT Media Club and everyone who supported, watched, liked, commented, and shared the reel throughout the contest.',
    takeawayLabel: 'Key Takeaway',
    takeaway: 'Great short-form content isn’t just about capturing clips — it’s about intentional pacing, disciplined editing, and honoring the emotion behind every second.',
    media: [
      {
        type: 'video',
        url: BAPPA_REEL_VIDEO_URL,
        poster: '',
        title: 'BAPPA THROUGH YOUR LENS – 31s Reel',
        caption: '31-second short-form reel created by Karthik.exe for NIAT Media Club contest (Runner-Up)',
        isPlaceholder: !BAPPA_REEL_VIDEO_URL
      }
    ],
    details: {
      leftTitle: 'Creator & Organization',
      leftIcon: 'award',
      ackList: [
        { name: 'Karthik.exe', role: 'Creator & Video Editor' },
        { name: 'NIAT Media Club', role: 'Contest Organizer' },
        { name: '31s Reel Contest', role: 'Visual Storytelling Category' }
      ],
      rightTitle: 'Winner Acknowledgements',
      rightIcon: 'check',
      ackListRight: [
        { name: 'Gurram Mohita', role: 'Contest Winner' },
        { name: 'Team Turbo', role: 'Winner Team' },
        { name: 'NIAT Community', role: 'Audience & Engagement Support' }
      ]
    }
  },
  {
    id: 'outstanding-leadership',
    priority: 3,
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
      bar: 'from-[#FF5A1F] via-[#FF7A18] to-transparent',
      border: 'border-white/10 hover:border-[#FF5A1F]/40',
      shadow: 'shadow-[0_0_35px_rgba(255,90,31,0.08)]',
      awardText: 'text-[#FF7A18]',
      badge1: 'bg-[#FF5A1F]/20 text-[#FFA87D] border-[#FF5A1F]/30',
      badge2: 'bg-white/10 text-slate-300 border-white/15',
      button: 'bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white',
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
  },
  {
    id: 'best-student',
    priority: 4,
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
      bar: 'from-[#FF7A18] via-amber-400 to-transparent',
      border: 'border-white/10 hover:border-[#FF5A1F]/40',
      shadow: 'shadow-[0_0_35px_rgba(255,90,31,0.08)]',
      awardText: 'text-[#FFA87D]',
      badge1: 'bg-[#FF5A1F]/20 text-[#FFA87D] border-[#FF5A1F]/30',
      badge2: 'bg-white/10 text-slate-300 border-white/15',
      button: 'bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white',
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
    id: 'reel-contest',
    priority: 5,
    awardBadgeText: '🎬 Contest Winner',
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
      bar: 'from-[#FF5A1F] via-[#FF7A18] to-transparent',
      border: 'border-white/10 hover:border-[#FF5A1F]/40',
      shadow: 'shadow-[0_0_35px_rgba(255,90,31,0.08)]',
      awardText: 'text-[#FF7A18]',
      badge1: 'bg-[#FF5A1F]/20 text-[#FFA87D] border-[#FF5A1F]/30',
      badge2: 'bg-white/10 text-slate-300 border-white/15',
      button: 'bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white',
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
  }
];

export default function AchievementsSection() {
  const { publicAchievements } = usePortfolioData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [lightboxData, setLightboxData] = useState(null);
  const lightboxVideoRef = useRef(null);

  const displayedAchievements = useMemo(() => {
    if (!publicAchievements || publicAchievements.length === 0) return ACHIEVEMENTS_DATA;
    return publicAchievements.map(liveItem => {
      const existing = ACHIEVEMENTS_DATA.find(d => d.id === liveItem.id);
      if (existing) {
        return {
          ...existing,
          title: liveItem.title || existing.title,
          issuer: liveItem.issuer || existing.issuer,
          description: liveItem.description || existing.description,
          quote: liveItem.quote || existing.quote,
          priority: liveItem.display_order || existing.priority
        };
      }
      return {
        id: liveItem.id,
        priority: liveItem.display_order || 99,
        awardBadgeText: liveItem.result || 'Award Winner',
        badgePrimary: 'AWARD',
        badgeSecondary: liveItem.issuer || 'RECOGNITION',
        metricPill: 'Achievement',
        metricPillIcon: 'users',
        issuer: liveItem.issuer || 'Organization',
        title: liveItem.title,
        subtitle: liveItem.result || '',
        shortDesc: (liveItem.description || '').substring(0, 100) + '...',
        featuredRank: `#${liveItem.display_order || 1}`,
        tags: liveItem.tags || ['Recognition', 'Leadership'],
        accent: ACHIEVEMENTS_DATA[0].accent,
        metrics: [{ value: 'Award', label: 'Milestone' }],
        prominentStatement: liveItem.quote || `“${liveItem.description}”`,
        descriptionLabel: 'Description',
        description: liveItem.description,
        media: liveItem.image ? [{ type: 'image', label: liveItem.title, url: liveItem.image }] : []
      };
    });
  }, [publicAchievements]);

  const [cardsVisible, setCardsVisible] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setCardsVisible(1);
      } else if (w < 1200) {
        setCardsVisible(2);
      } else {
        setCardsVisible(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCards = displayedAchievements.length;

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= totalCards - 1 ? 0 : prev + 1));
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? totalCards - 1 : prev - 1));
  }, [totalCards]);

  useEffect(() => {
    if (prefersReducedMotion || isHovered || isInteracting || selectedAchievement || lightboxData) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [handleNext, prefersReducedMotion, isHovered, isInteracting, selectedAchievement, lightboxData]);

  const handleTouchStart = (e) => {
    setIsInteracting(true);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxData) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          setLightboxData((prev) => {
            if (!prev) return null;
            const nextIndex = prev.index === 0 ? prev.items.length - 1 : prev.index - 1;
            return { ...prev, index: nextIndex };
          });
        } else if (e.key === 'ArrowRight') {
          setLightboxData((prev) => {
            if (!prev) return null;
            const nextIndex = prev.index === prev.items.length - 1 ? 0 : prev.index + 1;
            return { ...prev, index: nextIndex };
          });
        }
      } else if (selectedAchievement) {
        if (e.key === 'Escape') {
          setSelectedAchievement(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (selectedAchievement || lightboxData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxData, selectedAchievement]);

  const openLightbox = (items, index) => {
    setLightboxData({ items, index });
  };

  const closeLightbox = () => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
    setLightboxData(null);
  };

  return (
    <div 
      className="w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Achievements Showcase"
    >
      {/* Top Carousel Navigation Controls */}
      <div className="flex items-center justify-between gap-4 mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF7A18] bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Trophy size={11} className="text-[#FF5A1F]" />
            <span>Honors & Recognitions ({totalCards})</span>
          </span>
          {isHovered && (
            <span className="text-[10px] font-semibold text-slate-500 hidden sm:inline-flex items-center gap-1">
              <Pause size={10} /> Paused
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous achievement card"
            className="p-2.5 rounded-xl bg-[#171717] hover:bg-[#222222] border border-white/10 hover:border-[#FF5A1F]/40 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next achievement card"
            className="p-2.5 rounded-xl bg-[#171717] hover:bg-[#222222] border border-white/10 hover:border-[#FF5A1F]/40 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL VIEWPORT */}
      <div 
        className="relative overflow-hidden w-full rounded-3xl select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsVisible)}%)`,
          }}
        >
          {displayedAchievements.map((achievement) => {
            const previewMedia = achievement.media?.[0];

            return (
              <div 
                key={achievement.id}
                className="shrink-0 px-2 sm:px-2.5 flex"
                style={{
                  width: `${100 / cardsVisible}%`
                }}
              >
                <div 
                  className="w-full bg-[#171717] rounded-3xl border border-white/10 hover:border-[#FF5A1F]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group/card relative shadow-xl"
                >
                  {/* Subtle top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#FF5A1F] via-[#FF7A18] to-transparent opacity-90" />

                  <div>
                    {/* Media Preview Container */}
                    <div 
                      onClick={() => setSelectedAchievement(achievement)}
                      className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#111111] cursor-pointer"
                    >
                      {previewMedia?.type === 'video' ? (
                        <>
                          {previewMedia.poster ? (
                            <img 
                              src={previewMedia.poster} 
                              alt={achievement.title}
                              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#121212]">
                              <Film size={36} className="text-[#FF7A18]/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] text-white flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                              <Play size={18} className="ml-1 fill-current" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <img 
                            src={previewMedia?.url} 
                            alt={achievement.title} 
                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-80" />
                        </>
                      )}

                      {/* Badges on media */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md bg-[#FF5A1F]/20 text-[#FFA87D] border border-[#FF5A1F]/30 shadow-sm">
                          {achievement.awardBadgeText}
                        </span>

                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/60 text-slate-300 border border-white/10 backdrop-blur-md">
                          {achievement.badgeSecondary}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10">
                        <span className="text-[10px] font-bold text-white/90 drop-shadow-md truncate">
                          {achievement.issuer}
                        </span>
                        <span className="p-1 rounded-md bg-black/50 text-white shrink-0 group-hover/card:bg-[#FF5A1F] transition">
                          <Eye size={12} />
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF7A18]">
                            {achievement.issuer}
                          </span>
                          {achievement.creator && (
                            <span className="text-[9px] font-mono text-slate-400 font-bold">
                              {achievement.creator}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover/card:text-[#FFA87D] transition-colors line-clamp-1 font-display">
                          {achievement.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-300 line-clamp-1 mt-0.5">
                          {achievement.subtitle}
                        </p>
                      </div>

                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 font-light">
                        {achievement.shortDesc || achievement.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {achievement.tags?.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[9px] px-2 py-0.5 rounded-md bg-[#222222] text-slate-300 border border-white/5 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      onClick={() => setSelectedAchievement(achievement)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white text-xs font-bold transition shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Honor Details</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedAchievement && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in"
          onClick={() => setSelectedAchievement(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#171717] border border-white/10 rounded-3xl shadow-2xl animate-scale-in my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#171717]/95 backdrop-blur-xl border-b border-white/10 px-5 sm:px-8 py-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[10px] font-bold uppercase text-[#FF7A18] bg-[#FF5A1F]/15 px-2.5 py-0.5 rounded-full border border-[#FF5A1F]/30 shrink-0">
                  {selectedAchievement.awardBadgeText}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {selectedAchievement.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition border border-white/10 cursor-pointer ml-3 shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 bg-[#111111]">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#FF7A18] tracking-widest block mb-1">
                  {selectedAchievement.issuer}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {selectedAchievement.title}
                </h2>
                <p className="text-sm font-semibold text-slate-300 mt-1">
                  {selectedAchievement.subtitle}
                </p>
              </div>

              {/* Prominent Statement */}
              {selectedAchievement.prominentStatement && (
                <div className="p-4 rounded-2xl bg-[#1C1513] border border-[#FF5A1F]/30 text-[#FFA87D] text-xs sm:text-sm font-bold italic leading-relaxed">
                  {selectedAchievement.prominentStatement}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {selectedAchievement.descriptionLabel || 'Overview'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Story */}
              {(selectedAchievement.storyP1 || selectedAchievement.storyP2) && (
                <div className="space-y-2 p-4 rounded-2xl bg-[#171717] border border-white/5">
                  <h4 className="text-xs font-bold text-[#FF7A18] uppercase tracking-wider">
                    {selectedAchievement.storyLabel || 'Achievement Story'}
                  </h4>
                  {selectedAchievement.storyP1 && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {selectedAchievement.storyP1}
                    </p>
                  )}
                  {selectedAchievement.storyP2 && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {selectedAchievement.storyP2}
                    </p>
                  )}
                </div>
              )}

              {/* Media Gallery Grid */}
              {selectedAchievement.media && selectedAchievement.media.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Documentation & Media ({selectedAchievement.media.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedAchievement.media.map((med, mIdx) => (
                      <div 
                        key={mIdx}
                        onClick={() => openLightbox(selectedAchievement.media, mIdx)}
                        className="h-44 rounded-2xl overflow-hidden border border-white/10 relative group cursor-pointer bg-[#171717] shadow-md"
                      >
                        {med.type === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center bg-black/60 relative">
                            {med.poster && (
                              <img src={med.poster} alt={med.title} className="w-full h-full object-cover opacity-60" />
                            )}
                            <div className="absolute w-11 h-11 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play size={18} className="ml-0.5 fill-current" />
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={med.url} 
                            alt={med.title || selectedAchievement.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-2 left-3 right-3 text-[10px] text-slate-200 font-medium truncate">
                          {med.caption || med.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details & Acknowledgements */}
              {selectedAchievement.details && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {selectedAchievement.details.teamList && (
                    <div className="p-4 rounded-2xl bg-[#171717] border border-white/5 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Team Members
                      </span>
                      <ul className="space-y-1">
                        {selectedAchievement.details.teamList.map((tm, idx) => (
                          <li key={idx} className="text-xs text-white font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"></span>
                            <span>{tm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedAchievement.details.ackList && (
                    <div className="p-4 rounded-2xl bg-[#171717] border border-white/5 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {selectedAchievement.details.rightTitle || 'Acknowledgements'}
                      </span>
                      <ul className="space-y-1.5">
                        {selectedAchievement.details.ackList.map((ack, idx) => (
                          <li key={idx} className="text-xs text-slate-200 leading-snug">
                            <span className="font-bold text-white block">{ack.name}</span>
                            <span className="text-[10px] text-slate-400">{ack.role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Takeaway */}
              {selectedAchievement.takeaway && (
                <div className="p-4 rounded-2xl bg-[#171717] border border-white/10 text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] font-bold text-[#FF7A18] uppercase tracking-wider block mb-1">
                    Key Takeaway
                  </span>
                  <p>{selectedAchievement.takeaway}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX */}
      {lightboxData && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 z-50 cursor-pointer"
          >
            <X size={22} />
          </button>

          {lightboxData.items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxData(prev => ({
                    ...prev,
                    index: prev.index === 0 ? prev.items.length - 1 : prev.index - 1
                  }));
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 z-50 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxData(prev => ({
                    ...prev,
                    index: prev.index === prev.items.length - 1 ? 0 : prev.index + 1
                  }));
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 z-50 cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div 
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxData.items[lightboxData.index].type === 'video' ? (
              <video 
                ref={lightboxVideoRef}
                src={lightboxData.items[lightboxData.index].url}
                controls 
                autoPlay 
                className="max-w-full max-h-[70vh] rounded-2xl border border-white/10 shadow-2xl"
              />
            ) : (
              <img 
                src={lightboxData.items[lightboxData.index].url} 
                alt={lightboxData.items[lightboxData.index].title}
                className="max-w-full max-h-[72vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
              />
            )}
            <p className="mt-4 text-xs sm:text-sm text-slate-200 text-center font-medium max-w-lg px-4">
              {lightboxData.items[lightboxData.index].caption || lightboxData.items[lightboxData.index].title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
