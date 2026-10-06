import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { 
  Users, Play, X, ChevronLeft, ChevronRight, 
  Sparkles, Lightbulb, CheckCircle2, ShieldCheck, 
  Maximize2, Award, Heart, Video, Film, Trophy, Medal,
  ArrowRight, Pause, PlayCircle, Eye
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
      bar: 'from-transparent via-amber-400 to-transparent',
      glowTop: 'from-amber-500/10 via-purple-500/5 to-transparent',
      glowBottom: 'from-indigo-500/10 via-purple-500/5 to-transparent',
      border: 'border-amber-500/30 hover:border-amber-500/50',
      shadow: 'shadow-[0_0_35px_rgba(245,158,11,0.12)]',
      awardText: 'text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]',
      badge1: 'bg-amber-500/20 text-amber-300 border-amber-500/35',
      badge2: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
      issuerText: 'text-amber-400/90',
      button: 'bg-gradient-to-r from-amber-500/20 via-indigo-600/25 to-purple-600/25 hover:from-amber-500/35 hover:via-indigo-600/40 hover:to-purple-600/40 border-amber-500/35 hover:border-amber-500/60 shadow-amber-500/10 text-amber-200',
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
      bar: 'from-transparent via-sky-400 to-transparent',
      glowTop: 'from-sky-500/10 via-cyan-500/5 to-transparent',
      glowBottom: 'from-slate-500/10 via-sky-500/5 to-transparent',
      border: 'border-sky-500/30 hover:border-sky-500/50',
      shadow: 'shadow-[0_0_35px_rgba(56,189,248,0.12)]',
      awardText: 'text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]',
      badge1: 'bg-slate-400/20 text-slate-200 border-slate-400/35',
      badge2: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
      issuerText: 'text-sky-400/90',
      button: 'bg-gradient-to-r from-sky-500/20 via-slate-600/25 to-cyan-600/25 hover:from-sky-500/35 hover:via-slate-600/40 hover:to-cyan-600/40 border-sky-500/35 hover:border-sky-500/60 shadow-sky-500/10 text-sky-200',
      chevron: 'text-sky-400',
      metric1Box: 'bg-gradient-to-b from-sky-500/10 to-sky-500/5 border-sky-500/25 text-sky-300',
      metric1Label: 'text-sky-200/70',
      statementBox: 'from-sky-500/10 via-slate-600/10 to-cyan-600/10 border-sky-500/30 shadow-sky-500/5',
      statementText: 'from-slate-200 via-sky-200 to-cyan-200',
      headingAccent: 'text-sky-400',
      dot: 'bg-sky-400',
      hoverMediaBorder: 'hover:border-sky-500/40'
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
      bar: 'from-transparent via-cyan-400 to-transparent',
      glowTop: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      glowBottom: 'from-indigo-500/10 via-violet-500/5 to-transparent',
      border: 'border-cyan-500/25 hover:border-cyan-500/40',
      shadow: 'shadow-[0_0_35px_rgba(6,182,212,0.08)]',
      awardText: 'text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]',
      badge1: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/35',
      badge2: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
      issuerText: 'text-cyan-400/90',
      button: 'bg-gradient-to-r from-cyan-500/15 via-indigo-600/20 to-purple-600/20 hover:from-cyan-500/25 hover:via-indigo-600/30 hover:to-purple-600/30 border-cyan-500/30 hover:border-cyan-500/50 shadow-cyan-500/5 text-cyan-200',
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
      bar: 'from-transparent via-orange-400 to-transparent',
      glowTop: 'from-orange-500/10 via-amber-500/5 to-transparent',
      glowBottom: 'from-rose-500/10 via-purple-500/5 to-transparent',
      border: 'border-orange-500/25 hover:border-orange-500/40',
      shadow: 'shadow-[0_0_35px_rgba(249,115,22,0.08)]',
      awardText: 'text-orange-300 drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]',
      badge1: 'bg-orange-500/20 text-orange-300 border-orange-500/35',
      badge2: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
      issuerText: 'text-orange-400/90',
      button: 'bg-gradient-to-r from-orange-500/15 via-rose-600/20 to-amber-600/20 hover:from-orange-500/25 hover:via-rose-600/30 hover:to-amber-600/30 border-orange-500/30 hover:border-orange-500/50 shadow-orange-500/5 text-orange-200',
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
      bar: 'from-transparent via-fuchsia-400 to-transparent',
      glowTop: 'from-fuchsia-500/10 via-pink-500/5 to-transparent',
      glowBottom: 'from-purple-500/10 via-indigo-500/5 to-transparent',
      border: 'border-fuchsia-500/25 hover:border-fuchsia-500/40',
      shadow: 'shadow-[0_0_35px_rgba(217,70,239,0.08)]',
      awardText: 'text-fuchsia-300 drop-shadow-[0_0_12px_rgba(217,70,239,0.3)]',
      badge1: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/35',
      badge2: 'bg-pink-500/15 text-pink-300 border-pink-500/25',
      issuerText: 'text-fuchsia-400/90',
      button: 'bg-gradient-to-r from-fuchsia-500/15 via-purple-600/20 to-pink-600/20 hover:from-fuchsia-500/25 hover:via-purple-600/30 hover:to-pink-600/30 border-fuchsia-500/30 hover:border-fuchsia-500/50 shadow-fuchsia-500/5 text-fuchsia-200',
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
  }
];

export default function AchievementsSection() {
  const { publicAchievements } = usePortfolioData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [lightboxData, setLightboxData] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const lightboxVideoRef = useRef(null);
  const modalVideoRef = useRef(null);

  // Merge live achievements order from Supabase/admin with rich styling template
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

  // Responsive cards visible calculation
  const [cardsVisible, setCardsVisible] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setCardsVisible(1);
      } else if (w < 1280) {
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
  const maxIndex = Math.max(0, totalCards - cardsVisible);

  // Touch / Drag handling state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= totalCards - 1 ? 0 : prev + 1));
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? totalCards - 1 : prev - 1));
  }, [totalCards]);

  // Auto-scroll loop timer (3.5s per slide)
  useEffect(() => {
    if (prefersReducedMotion || isHovered || isInteracting || isDragging || selectedAchievement || lightboxData) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [handleNext, prefersReducedMotion, isHovered, isInteracting, isDragging, selectedAchievement, lightboxData]);

  // Touch event handlers for mobile
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

  // Mouse drag event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX - e.clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  // Keyboard navigation for lightbox & modal
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
          setIsZoomed(false);
        } else if (e.key === 'ArrowRight') {
          setLightboxData((prev) => {
            if (!prev) return null;
            const nextIndex = prev.index === prev.items.length - 1 ? 0 : prev.index + 1;
            return { ...prev, index: nextIndex };
          });
          setIsZoomed(false);
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
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
    setIsZoomed(false);
    setLightboxData(null);
  };

  // Active indicator dot calculation
  const activeDotIndex = currentIndex % totalCards;

  return (
    <div 
      className="w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="College Achievements Showcase Carousel"
    >
      {/* Top Carousel Controls Strip */}
      <div className="flex items-center justify-between gap-4 mb-5 px-1 sm:px-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <Trophy size={11} className="text-indigo-400" />
            <span>Honors & Recognitions ({totalCards})</span>
          </span>
          {isHovered && (
            <span className="text-[10px] font-semibold text-slate-500 hidden sm:inline-flex items-center gap-1">
              <Pause size={10} /> Paused
            </span>
          )}
        </div>

        {/* Previous / Next Desktop Nav Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous achievement card"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-indigo-600 border border-white/10 hover:border-indigo-400 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next achievement card"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-indigo-600 border border-white/10 hover:border-indigo-400 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL VIEWPORT */}
      <div 
        className="relative overflow-hidden w-full rounded-3xl cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsVisible)}%)`,
            gap: '0px'
          }}
        >
          {displayedAchievements.map((achievement, idx) => {
            const accent = achievement.accent;
            const isTopFeatured = achievement.priority <= 2;
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
                  className={`w-full glass-panel rounded-3xl border ${accent.border} ${accent.shadow} hover:border-indigo-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group/card relative`}
                >
                  {/* Subtle top accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${accent.bar} opacity-90`} />

                  <div>
                    {/* Media Preview Container */}
                    <div 
                      onClick={() => setSelectedAchievement(achievement)}
                      className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 cursor-pointer"
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
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-sky-950 to-slate-950">
                              <Film size={36} className="text-sky-400/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-slate-950/40 group-hover/card:bg-slate-950/20 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-amber-500/90 group-hover/card:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
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
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity" />
                        </>
                      )}

                      {/* Top badges on media */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${accent.badge1} shadow-sm`}>
                          {achievement.awardBadgeText}
                        </span>

                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/60 text-slate-300 border border-white/10 backdrop-blur-md">
                          {achievement.badgeSecondary}
                        </span>
                      </div>

                      {/* Bottom media title hint */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10">
                        <span className="text-[10px] font-bold text-white/90 drop-shadow-md truncate">
                          {achievement.issuer}
                        </span>
                        <span className="p-1 rounded-md bg-black/50 text-white shrink-0 group-hover/card:bg-indigo-600 transition">
                          <Eye size={12} />
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                            {achievement.issuer}
                          </span>
                          {achievement.creator && (
                            <span className="text-[9px] font-mono text-sky-300 font-bold">
                              {achievement.creator}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-black text-white group-hover/card:text-indigo-200 transition-colors line-clamp-1 font-display">
                          {achievement.title}
                        </h3>
                        
                        <p className="text-xs font-semibold text-indigo-300/90 italic truncate mt-0.5">
                          {achievement.subtitle}
                        </p>
                      </div>

                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 font-light">
                        {achievement.shortDesc}
                      </p>

                      {/* Compact Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(achievement.tags || []).slice(0, 3).map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="text-[9px] font-medium text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-white/5 mt-2">
                    <button
                      onClick={() => setSelectedAchievement(achievement)}
                      className={`w-full py-2.5 rounded-xl ${accent.button} text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover/card:scale-[1.01]`}
                    >
                      <span>View Achievement Details</span>
                      <ArrowRight size={13} className="group-hover/card:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROGRESS INDICATOR DOTS */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {displayedAchievements.map((item, dotIdx) => {
          const isActive = dotIdx === activeDotIndex;
          return (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Jump to slide ${dotIdx + 1}: ${item.title}`}
              aria-current={isActive ? 'true' : 'false'}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive 
                  ? 'w-7 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md shadow-indigo-500/30' 
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          );
        })}
      </div>

      {/* FULL ACHIEVEMENT STORY & MEDIA DETAILS MODAL */}
      {selectedAchievement && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in"
          onClick={() => setSelectedAchievement(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-white/10 rounded-3xl shadow-2xl animate-scale-in my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Sticky Header */}
            <div className="sticky top-0 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 px-5 sm:px-8 py-4 flex items-center justify-between z-30">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${selectedAchievement.accent.badge1}`}>
                  {selectedAchievement.awardBadgeText}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white truncate">
                  {selectedAchievement.title}
                </span>
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition border border-white/10 shrink-0 cursor-pointer ml-3"
                aria-label="Close details modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Details */}
            <div className="p-6 sm:p-8 md:p-10 space-y-8">
              
              {/* Header Titles */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                    {selectedAchievement.issuer}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {selectedAchievement.badgeSecondary}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-display">
                  {selectedAchievement.title}
                </h2>
                
                <p className="text-sm sm:text-base text-indigo-300 font-medium italic">
                  {selectedAchievement.subtitle}
                </p>
              </div>

              {/* 1. KEY METRICS ROW */}
              <div className="grid grid-cols-3 gap-3 sm:gap-5">
                <div className={`p-4 rounded-2xl ${selectedAchievement.accent.metric1Box} text-center`}>
                  <div className="text-xl sm:text-3xl font-extrabold font-display mb-0.5">
                    {selectedAchievement.metrics[0].value}
                  </div>
                  <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                    {selectedAchievement.metrics[0].label}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                  <div className="text-xl sm:text-3xl font-extrabold text-indigo-300 font-display mb-0.5">
                    {selectedAchievement.metrics[1].value}
                  </div>
                  <p className="text-[10px] font-semibold text-indigo-200/70 uppercase tracking-wider">
                    {selectedAchievement.metrics[1].label}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-purple-300 font-display mb-0.5 truncate">
                    {selectedAchievement.metrics[2].value}
                  </div>
                  <p className="text-[10px] font-semibold text-purple-200/70 uppercase tracking-wider">
                    {selectedAchievement.metrics[2].label}
                  </p>
                </div>
              </div>

              {/* 2. PROMINENT STATEMENT */}
              <div className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-r ${selectedAchievement.accent.statementBox} text-center`}>
                <p className={`text-base sm:text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${selectedAchievement.accent.statementText} font-display leading-snug`}>
                  {selectedAchievement.prominentStatement}
                </p>
              </div>

              {/* 3. DESCRIPTION & STORY GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      {selectedAchievement.descriptionLabel}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {selectedAchievement.description}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3">
                    <Lightbulb size={18} className="text-emerald-300 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                        {selectedAchievement.coreReflectionLabel}
                      </h4>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                        {selectedAchievement.coreReflection}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${selectedAchievement.accent.headingAccent}`}>
                      {selectedAchievement.storyLabel}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {selectedAchievement.storyP1}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                      {selectedAchievement.storyP2}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15">
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-bold uppercase tracking-wider text-indigo-300">
                      <ShieldCheck size={14} />
                      <span>{selectedAchievement.takeawayLabel}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {selectedAchievement.takeaway}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. MEDIA GALLERY */}
              {selectedAchievement.media && selectedAchievement.media.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedAchievement.accent.dot}`} />
                      Media Gallery &amp; Honors ({selectedAchievement.media.length})
                    </h4>
                    <span className="text-[10px] text-slate-400">Click to enlarge</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedAchievement.media.map((med, mIdx) => (
                      <div
                        key={mIdx}
                        onClick={() => openLightbox(selectedAchievement.media, mIdx)}
                        className="h-44 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-indigo-400 transition-all cursor-pointer relative group/med"
                      >
                        {med.type === 'video' ? (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-900 to-sky-950/40">
                            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mb-2 group-hover/med:scale-110 transition-transform">
                              <Play size={16} className="ml-0.5 fill-current" />
                            </div>
                            <span className="text-[10px] font-bold text-white uppercase truncate">
                              {med.title}
                            </span>
                            <span className="text-[9px] text-slate-400 mt-0.5">Click to play video</span>
                          </div>
                        ) : (
                          <>
                            <img 
                              src={med.url} 
                              alt={med.title} 
                              className="w-full h-full object-cover group-hover/med:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover/med:opacity-100 transition-opacity" />
                            <div className="absolute bottom-2 left-2.5 right-2.5 flex justify-between items-center text-[10px] text-slate-200">
                              <span className="truncate">{med.title}</span>
                              <Maximize2 size={11} className="shrink-0 ml-1" />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. DETAILS & TEAM */}
              {selectedAchievement.details && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-2">
                      {selectedAchievement.details.leftTitle}
                    </h5>
                    {selectedAchievement.details.teamList && (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedAchievement.details.teamList.map((tm, tIdx) => (
                          <span key={tIdx} className="text-xs text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                            {tm}
                          </span>
                        ))}
                      </div>
                    )}
                    {selectedAchievement.details.ackList && (
                      <div className="space-y-1 text-xs text-slate-300">
                        {selectedAchievement.details.ackList.map((it, iIdx) => (
                          <div key={iIdx} className="flex justify-between">
                            <span className="font-semibold">{it.name}</span>
                            <span className="text-slate-500">{it.role}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-2">
                      {selectedAchievement.details.rightTitle}
                    </h5>
                    {selectedAchievement.details.ackList && selectedAchievement.details.ackListRight ? (
                      <div className="space-y-1 text-xs text-slate-300">
                        {selectedAchievement.details.ackListRight.map((it, iIdx) => (
                          <div key={iIdx} className="flex justify-between">
                            <span className="font-semibold">{it.name}</span>
                            <span className="text-slate-500">{it.role}</span>
                          </div>
                        ))}
                      </div>
                    ) : selectedAchievement.details.ackList ? (
                      <div className="space-y-1 text-xs text-slate-300">
                        {selectedAchievement.details.ackList.map((it, iIdx) => (
                          <div key={iIdx} className="flex justify-between">
                            <span className="font-semibold">{it.name}</span>
                            <span className="text-slate-500">{it.role}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Close Achievement
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxData && lightboxData.items[lightboxData.index] && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Lightbox Controls */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-xs text-white/80 font-mono bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            Item {lightboxData.index + 1} of {lightboxData.items.length}
          </div>

          <button
            onClick={closeLightbox}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 backdrop-blur-md z-50 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>

          {lightboxData.items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxData((prev) => ({
                    ...prev,
                    index: prev.index === 0 ? prev.items.length - 1 : prev.index - 1
                  }));
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 backdrop-blur-md z-50 cursor-pointer"
                aria-label="Previous item"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxData((prev) => ({
                    ...prev,
                    index: prev.index === prev.items.length - 1 ? 0 : prev.index + 1
                  }));
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 backdrop-blur-md z-50 cursor-pointer"
                aria-label="Next item"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Media Presentation */}
          <div 
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxData.items[lightboxData.index].type === 'video' ? (
              <div className="w-full max-w-2xl bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <video
                  ref={lightboxVideoRef}
                  src={lightboxData.items[lightboxData.index].url}
                  poster={lightboxData.items[lightboxData.index].poster}
                  controls
                  playsInline
                  className="w-full max-h-[70vh] object-contain mx-auto"
                />
              </div>
            ) : (
              <img 
                src={lightboxData.items[lightboxData.index].url} 
                alt={lightboxData.items[lightboxData.index].title}
                className="max-w-full max-h-[72vh] object-contain rounded-2xl border border-white/10 shadow-2xl select-none"
              />
            )}

            <div className="mt-4 text-center max-w-xl px-4">
              <p className="text-xs sm:text-sm font-semibold text-white">
                {lightboxData.items[lightboxData.index].title}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lightboxData.items[lightboxData.index].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
