export const STATS = [
  { id: 'students', label: 'Students Impacted', target: 2000, suffix: '+' },
  { id: 'mentorships', label: 'LinkedIn Mentorships', target: 200, suffix: '+' },
  { id: 'events', label: 'Events Led', target: 10, suffix: '+' },
];

export const SERVICE_CATEGORIES = [
  {
    id: 'digital',
    categoryNum: '01',
    title: 'DIGITAL',
    subtitle: 'Web Platforms & Digital Products',
    description: 'Modern, high-performance web applications, intuitive UI/UX design systems, and structured digital product consulting.',
    servicesIncluded: ['Web Development', 'UI/UX & Figma Design', 'Product Strategy & Consulting'],
    serviceIds: ['web-dev', 'ui-ux', 'product-strategy'],
    accent: 'from-indigo-500/20 via-blue-500/10 to-transparent',
    border: 'border-indigo-500/20 hover:border-indigo-500/40'
  },
  {
    id: 'growth-content',
    categoryNum: '02',
    title: 'GROWTH & CONTENT',
    subtitle: 'Brand Strategy & Storytelling',
    description: 'Audience-first social media growth frameworks, high-retention video scripting, and distinct brand identity systems.',
    servicesIncluded: ['Social Media Strategy', 'Content & Reels Script Writing', 'Creative Design & Branding'],
    serviceIds: ['smm', 'script-writing', 'creative-design'],
    accent: 'from-purple-500/20 via-pink-500/10 to-transparent',
    border: 'border-purple-500/20 hover:border-purple-500/40'
  },
  {
    id: 'experiences',
    categoryNum: '03',
    title: 'EXPERIENCES',
    subtitle: 'Events & Cinematic Media',
    description: 'End-to-end hackathon operations, campus fest logistics, and cinematic visual storytelling through photography.',
    servicesIncluded: ['Event Management', 'Photography & Videography'],
    serviceIds: ['event-mgmt', 'photography'],
    accent: 'from-amber-500/20 via-rose-500/10 to-transparent',
    border: 'border-amber-500/20 hover:border-amber-500/40'
  }
];

export const WORK_WITH_ME_SERVICES = [
  {
    id: 'web-dev',
    categoryId: 'digital',
    title: 'Web Development',
    description: 'Modern, responsive websites built for performance, conversion, and growth.',
    icon: 'globe',
    services: [
      'Portfolio Websites',
      'Business Websites',
      'Startup Landing Pages',
      'Event Websites',
      'Admin Dashboards',
      'Custom Web Applications'
    ],
    techStack: ['React', 'Next.js', 'Supabase', 'Tailwind CSS', 'Node.js'],
    colorClass: 'hover:border-indigo-500/50',
    iconBgClass: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 'ui-ux',
    categoryId: 'digital',
    title: 'UI/UX & Figma Design',
    description: 'Designs focused on clarity, usability, visual aesthetics, and user conversion.',
    icon: 'palette',
    services: [
      'Website UI Design',
      'Mobile App UI',
      'Dashboard Design',
      'Landing Pages',
      'Wireframes',
      'Interactive Prototypes',
      'Design Systems'
    ],
    colorClass: 'hover:border-purple-500/50',
    iconBgClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  },
  {
    id: 'product-strategy',
    categoryId: 'digital',
    title: 'Product Strategy & Consulting',
    description: 'Helping turn raw ideas into structured, scalable digital products and workflows.',
    icon: 'layers',
    services: [
      'MVP Planning',
      'Feature Prioritization',
      'Product Roadmaps',
      'User Journey Mapping',
      'Market Research',
      'Product Documentation'
    ],
    colorClass: 'hover:border-emerald-500/50',
    iconBgClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'smm',
    categoryId: 'growth-content',
    title: 'Social Media Strategy',
    description: 'Helping brands and creators build an organic, highly engaged digital presence.',
    icon: 'trending-up',
    services: [
      'Instagram Growth Strategy',
      'LinkedIn Personal Branding',
      'Content Planning',
      'Profile Optimization',
      'Campaign Strategy',
      'Content Calendar'
    ],
    colorClass: 'hover:border-blue-500/50',
    iconBgClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'script-writing',
    categoryId: 'growth-content',
    title: 'Content & Reels Script Writing',
    description: 'Story-driven short-form video scripts designed to educate and convert audiences.',
    icon: 'pen-tool',
    services: [
      'Instagram Reels Scripts',
      'YouTube Shorts Scripts',
      'Promotional Videos',
      'Product Launch Scripts',
      'Event Promotions',
      'Founder Storytelling',
      'LinkedIn Posts'
    ],
    colorClass: 'hover:border-amber-500/50',
    iconBgClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  },
  {
    id: 'creative-design',
    categoryId: 'growth-content',
    title: 'Creative Design & Branding',
    description: 'High-quality marketing assets and brand identities that stand out.',
    icon: 'award',
    services: [
      'Event Posters',
      'Social Media Creatives',
      'Certificate Design',
      'Presentation Decks',
      'Banner Design',
      'Brand Identity Assets',
      'Marketing Graphics'
    ],
    colorClass: 'hover:border-teal-500/50',
    iconBgClass: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  },
  {
    id: 'event-mgmt',
    categoryId: 'experiences',
    title: 'Event Management',
    description: 'Professional planning, operational infrastructure, and execution for high-density events.',
    icon: 'calendar',
    services: [
      'College Fests',
      'Hackathons',
      'Workshops',
      'Tech Conferences',
      'Guest Management',
      'Registration Operations',
      'Event Branding',
      'On-ground Coordination'
    ],
    colorClass: 'hover:border-rose-500/50',
    iconBgClass: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  },
  {
    id: 'photography',
    categoryId: 'experiences',
    title: 'Photography & Videography',
    description: 'Capturing events and moments with a cinematic visual storytelling approach.',
    icon: 'video',
    services: [
      'Event Photography',
      'Event Videography',
      'After Movies',
      'Highlight Reels',
      'Behind-the-Scenes Coverage',
      'Content Editing'
    ],
    colorClass: 'hover:border-cyan-500/50',
    iconBgClass: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
  }
];

export const WHY_WORK_WITH_ME = [
  'End-to-end execution, from planning to delivery',
  'Leadership experience managing large-scale events',
  'Strong design and development skills',
  'Content-first marketing approach',
  'Fast communication and timely delivery',
  'Tailored solutions for startups, creators, and communities'
];

export const ACHIEVEMENTS = [
  {
    id: 'outstanding-leadership',
    priority: 1,
    title: 'Outstanding Leadership Award',
    issuer: 'NxtWave (NIAT)',
    description: 'Honored to receive this award for serving as President of the Influencers Club NIAT for the academic year 2024–2026.',
    quote: 'This recognition reflects the collective effort, dedication, and support of everyone who contributed to our journey.',
    tags: ['Leadership', 'StudentLeadership', 'Community', 'EventManagement'],
    images: [
      { label: 'Leadership Award 1', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1778312568/Screenshot_2026-05-09_131109_h0satx.png' },
      { label: 'Leadership Award 2', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1778312568/Screenshot_2026-05-09_131157_ztgn2z.png' }
    ]
  },
  {
    id: 'best-student',
    priority: 2,
    title: 'Best Student Awardee',
    issuer: 'NxtWave (NIAT)',
    description: 'Stood on stage at the Parents’ Success Meet – Worth It Awards. The real highlight was sharing this proud milestone with my father in the audience.',
    quote: 'A man who taught me discipline not through words, but through consistency. That moment redefined success for me.',
    tags: ['Leadership', 'FamilyFirst', 'Growth', 'Discipline'],
    images: [
      { label: 'Best Student 1', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122112_mj2ygi.png' },
      { label: 'Best Student 2', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122124_pj7rab.png' },
      { label: 'Best Student 3', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122051_mowwqz.png' }
    ]
  },
  {
    id: 'reel-contest',
    priority: 3,
    title: 'Festive Reel Contest Winner',
    issuer: 'NxtWave (NIAT)',
    description: 'Honored with a Certificate of Appreciation and trophy in the Festive Reel Making Contest during Diwali celebrations.',
    quote: 'This recognition reminds me how creativity, consistency, and passion can turn small ideas into something meaningful.',
    tags: ['ContentCreation', 'Storytelling', 'VideoEditing'],
    images: [
      { label: 'Reel Contest 1', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122425_ub5wyz.png' },
      { label: 'Reel Contest 2', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774508113/Screenshot_2026-03-26_122412_bnwpvh.png' }
    ]
  },
  {
    id: 'annadata-policy-2047',
    priority: 4,
    title: 'ANNADATA POLICY 2047 — 1st Prize',
    issuer: 'Youth Leadership & Governance Forum 2026',
    description: 'Presented ANNADATA POLICY 2047, “One Farmer, One Resolution”, a farmer-centric policy proposal focused on agricultural grievance coordination and accountable governance.',
    quote: 'A farmer should report the problem once. The system should take responsibility for coordinating the solution.',
    tags: ['YouthLeadership', 'Governance', 'Agriculture', 'PolicyInnovation', 'SocialImpact'],
    images: [
      { label: 'Stage Pitch', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1789101010/WhatsApp_Image_2026-09-11_at_9.58.10_AM_cwpojm.jpg' },
      { label: '1st Prize Certificate', path: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1789101131/20260910_182648.jpg_fg4o9x.jpg' }
    ]
  },
  {
    id: 'bappa-through-your-lens',
    priority: 5,
    title: 'BAPPA THROUGH YOUR LENS – Reel Contest',
    result: 'RUNNER-UP',
    creator: 'Karthik.exe',
    issuer: 'NIAT Media Club',
    description: 'My reel, created under the name Karthik.exe, was selected as the Runner-Up in the BAPPA THROUGH YOUR LENS – Reel Contest organized by the NIAT Media Club.',
    quote: 'This experience was about finding a story in the celebration, translating an idea into visuals, and paying attention to every frame, transition, and detail.',
    tags: ['ReelContest', 'ContentCreation', 'VideoEditing', 'VisualStorytelling', 'NIATMediaClub'],
    winnerAcknowledgement: { winner: 'Gurram Mohita', team: 'Turbo' },
    images: []
  }
];

export const COLLABORATIONS = [
  {
    id: 'takeover',
    title: 'NIAT Takeover 2026',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1784811619/WhatsApp_Image_2026-07-16_at_6.49.39_PM_mozq5a.jpg',
    tag: 'Flagship Summit',
    category: 'Event Operations',
    date: 'July 2026',
    attendees: '1000+ Participants',
    desc: 'Led Guest Hospitality and social media documentation across 3 days of 5 major events (Takeover Hackathon, DJ Night, BRAVE, Makers Conclave, GRIT Awards).',
    roles: [
      'Guest Hospitality Lead: Coordinated VIP speakers, judges, and dignitaries',
      'Media Handler: Captured live keynote sessions, aftermovies, and story moments'
    ],
    links: {}
  },
  {
    id: 'ishan',
    title: 'Ishan Sharma',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.22.34_AM_vm6hrl.jpg',
    tag: 'Guest Session',
    category: 'Creator Summit',
    date: 'Oct 2024',
    attendees: '450+ Attendees',
    desc: 'Hosted renowned creator Ishan Sharma for an electrifying session inspiring hundreds of students. Managed crowd flow, scheduling, and live Q&A.',
    roles: [
      'Event Host: Stage introduction and speaker moderation',
      'Operations: Crowd coordination and stage timing'
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/ishansharma7390/',
      instagram: 'https://www.instagram.com/ishansharma7390/'
    }
  },
  {
    id: 'madhu',
    title: 'Madhu Kiran',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179680/WhatsApp_Image_2025-11-15_at_9.29.46_AM_ornq12.jpg',
    tag: 'Content Strategy',
    category: 'Creator Workshop',
    date: 'Sep 2024',
    attendees: '300+ Attendees',
    desc: 'Curated "Learn. Create. Influence." workshop featuring top creator Madhu Kiran. Focused on content strategy, personal branding, and career opportunities.',
    roles: [
      'Event Curator: Workshop agenda and student engagement',
      'Media Lead: Live social media coverage'
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/madhu-kiran-guntur-54036226b/',
      instagram: 'https://www.instagram.com/thelazylearning/'
    }
  },
  {
    id: 'sid',
    title: "Sid's Farm CEO",
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.24.22_AM_njlqzg.jpg',
    tag: 'Podcast',
    category: 'AgriTech Conversation',
    date: 'Aug 2024',
    attendees: 'Online Audience',
    desc: 'Hosted an impactful podcast with Kishore Indukuri, founder & CEO of Sid\'s Farm, spotlighting AgriTech innovation, startup scaling, and bootstrapped growth.',
    roles: [
      'Podcast Host: In-depth founder interview',
      'Post-Production: Snippet editing and social distribution'
    ],
    links: {
      instagram: 'https://www.instagram.com/sidsfarmpure/'
    }
  },
  {
    id: 'tharun',
    title: 'Tharun Speaks',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.21.22_AM_zywwfg.jpg',
    tag: 'Branding',
    category: 'Creator Dialogue',
    date: 'July 2024',
    attendees: '500+ Attendees',
    desc: 'Inspiring dialogue on personal branding, content creation, and professional storytelling with Tharun Naik (IITian). Handled logistics and speaker hospitality.',
    roles: [
      'Hospitality Lead: Speaker onboarding and green room coordination',
      'Student Engagement: Moderated audience interaction'
    ],
    links: {
      youtube: 'https://www.youtube.com/@TharunSpeaks',
      linkedin: 'https://www.linkedin.com/in/tharunnaik/',
      instagram: 'https://www.instagram.com/tharunnaik.0/'
    }
  },
  {
    id: 'hack',
    title: 'Ethical Hacking 101',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1764061209/Screenshot_2025-11-25_142832_gv8kdz.png',
    tag: 'Workshop',
    category: 'Technical Workshop',
    date: 'Nov 2024',
    attendees: '150+ Attendees',
    desc: 'High-impact cybersecurity workshop featuring Sai Krishna Kothapalli (Hackrew CEO). Bridged the gap between developer creativity and ethical cyber responsibility.',
    roles: [
      'Event Manager: Venue coordination and kit management',
      'Registration Operations: Attendee credential verification'
    ],
    links: {}
  },
  {
    id: 'drone',
    title: 'Drone Club Showcase',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1764061567/Screenshot_2025-11-25_143521_fuc1bn.png',
    tag: 'Tech Showcase',
    category: 'Hardware Showcase',
    date: 'Dec 2024',
    attendees: '200+ Attendees',
    desc: 'Collaborated with the drone club for a live flight showcase. Managed participant flow and provided professional-grade event media coverage.',
    roles: [
      'Media Head: Live drone flight footage capture',
      'Logistics: Crowd safety zones and flight perimeter'
    ],
    links: {}
  }
];

export const PROJECTS = [
  {
    id: 'paniit-summit-2026',
    featured: true,
    eyebrow: 'FEATURED PROJECT',
    badgeSecondary: 'GOVERNMENT / PUBLIC EVENT',
    tag: 'Featured Project',
    icon: 'award',
    title: 'PanIIT Andhra Pradesh Summit 2026',
    sub: 'Impact Designer | Student Organizer',
    desc: 'My first government project, where I contributed to the visual communication, event branding, and on-ground design requirements for the PanIIT Andhra Pradesh Summit 2026 in Vijayawada.',
    tech: ['Event Design', 'Visual Communication', 'Figma', 'Signage', 'Pavilion Branding', 'On-Ground Execution'],
    tags: ['Event Design', 'Visual Communication', 'Figma', 'Signage', 'Pavilion Branding', 'On-Ground Execution'],
    result: 'Designed and executed physical signage, pavilion branding, and official event communication across a state-level government-backed summit.',
    actionLabel: 'VIEW CASE STUDY →',
    secondaryActionLabel: 'VIEW GALLERY →',
    image: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260290/WhatsApp_Image_2026-10-06_at_9.46.08_AM_pyg8pk.jpg',
    caseStudy: {
      title: 'PanIIT Andhra Pradesh Summit 2026',
      subtitle: 'Impact Designer | Student Organizer',
      heroIntros: [
        'PanIIT Andhra Pradesh Summit 2026 was my first government project and one of the most meaningful design experiences in my journey.',
        'I had the opportunity to work as an Impact Designer for the PanIIT Andhra Pradesh Summit 2026 in Vijayawada, contributing to the visual communication and on-ground design requirements of a state-level summit.'
      ],
      date: '3 October 2026',
      venue: 'Dr. B. R. Ambedkar Kala Vedika, Vijayawada',
      theme: '“Catalyzing Innovation for Swarna Andhra Vision 2047”',
      metadata: [
        { label: 'Project', value: 'PanIIT Andhra Pradesh Summit 2026' },
        { label: 'Role', value: 'Impact Designer' },
        { label: 'Additional Role', value: 'Student Organizer' },
        { label: 'Location', value: 'Vijayawada, Andhra Pradesh' },
        { label: 'Venue', value: 'Dr. B. R. Ambedkar Kala Vedika' },
        { label: 'Date', value: '3 October 2026' },
        { label: 'Project Type', value: 'Government / Public Event / Event Branding' },
        { label: 'Focus', value: 'Event Design, Visual Communication, Signage, Pavilion Branding, On-Ground Design' }
      ],
      myRole: {
        heading: 'MY ROLE',
        content: "As an Impact Designer, I worked on multiple visual assets required for the event and helped translate the summit's visual identity into physical event experiences.",
        responsibilities: [
          'Event branding and visual assets',
          'Guest of Honour posters',
          'Directional signages',
          'Exhibition signage',
          'Pavilion branding',
          'Amaravati Stall signage',
          'PanIIT Pavilion signage',
          'Delegate Reception branding',
          'Event directory and information graphics',
          'Partner and welcome boards',
          'Reception desk branding',
          'Lanyard and badge design',
          'Other on-ground event communication materials'
        ]
      },
      figmaToVenue: {
        heading: 'FROM FIGMA TO THE VENUE',
        paragraphs: [
          'One of the most rewarding parts of the project was seeing my designs move beyond the screen.',
          'The designs I created were finalized, printed, and implemented across the summit venue.',
          'Seeing the same designs I worked on appear as large-format physical signages, pavilion branding, exhibition boards, and event assets was a memorable moment for me as a designer.',
          'It showed me the difference between designing something digitally and designing something that has to work in a real event environment.'
        ]
      },
      stateLevelPlatform: {
        heading: 'A STATE-LEVEL PLATFORM',
        paragraphs: [
          'The work was used across the PanIIT Andhra Pradesh Summit 2026 and appeared across the event environment.',
          'Some of the event creatives were also published through official Andhra Pradesh government channels and the official PanIIT platform.',
          'Seeing my design work move from Figma screens to official event communication and physical installations was a proud milestone in my design journey.',
          'Being able to contribute to a large-scale public event gave me valuable experience in designing for real-world environments, scale, readability, consistency, and execution.'
        ]
      },
      eventExperience: {
        heading: 'THE EVENT EXPERIENCE',
        paragraphs: [
          'The project was more than designing posters.',
          'I experienced the event from the ground, met different teams and participants, connected with juniors and peers, and saw how a large-scale summit operates behind the scenes.',
          'These interactions gave me a broader understanding of how design, communication, coordination, and execution come together in a large public event.'
        ]
      },
      peopleBehind: {
        heading: 'THE PEOPLE BEHIND THE EXPERIENCE',
        paragraphs: [
          'Working on the summit also gave me the opportunity to meet people I had previously worked with and connect with new teams.',
          'Meeting my juniors at the venue was especially memorable. Seeing everyone contribute to the same event created a strong sense of community and made the experience more personal.'
        ]
      },
      learnings: [
        { num: '01', text: 'Designing for real-world implementation requires more attention to scale and readability.' },
        { num: '02', text: 'Event design needs consistency across multiple formats and locations.' },
        { num: '03', text: 'Last-minute changes are part of large-scale event execution.' },
        { num: '04', text: 'A design needs to work from a distance, not only on a laptop screen.' },
        { num: '05', text: 'Collaboration and communication are as important as design skills.' },
        { num: '06', text: "Good event design has to support the visitor's experience and movement." }
      ],
      milestone: {
        heading: 'A MEANINGFUL MILESTONE',
        paragraphs: [
          'This project started with screens, layouts, revisions, and countless small design decisions.',
          'It ended with those designs standing across a state-level summit.',
          'For me, PanIIT Andhra Pradesh Summit 2026 represents more than a project in my portfolio. It represents a step from creating designs digitally to seeing my work implemented at a real government-backed event.'
        ],
        prominentStatements: [
          'My first government project.',
          'My first experience contributing to a state-level summit.',
          'And a milestone I’ll always remember.'
        ]
      },
      recognition: {
        heading: 'RECOGNITION',
        paragraphs: [
          "My work was officially featured and shared through PanIIT's official platforms, giving me the opportunity to see my contribution recognized beyond the event venue.",
          "This project strengthened my confidence as a designer and gave me the experience of working on a large-scale, high-visibility event."
        ]
      },
      gallery: [
        {
          id: 'paniit-1',
          url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260290/WhatsApp_Image_2026-10-06_at_9.46.08_AM_pyg8pk.jpg',
          title: 'Featured On-Ground Pavilion & Stage Branding',
          caption: 'PanIIT Andhra Pradesh Summit 2026 event design by Karthik Nimmanagoti',
          alt: 'PanIIT Andhra Pradesh Summit 2026 event design by Karthik Nimmanagoti',
          role: 'large-featured'
        },
        {
          id: 'paniit-2',
          url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260288/WhatsApp_Image_2026-10-06_at_9.46.08_AM_2_gnw8o9.jpg',
          title: 'Event Visual Communication & Main Stage Assets',
          caption: 'Karthik Nimmanagoti event branding work at PanIIT Andhra Pradesh Summit 2026',
          alt: 'Karthik Nimmanagoti event branding work at PanIIT Andhra Pradesh Summit 2026',
          role: 'medium'
        },
        {
          id: 'paniit-3',
          url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260288/WhatsApp_Image_2026-10-06_at_9.46.09_AM_ezogdq.jpg',
          title: 'Exhibition Signage & Information Boards',
          caption: "Karthik's PanIIT Andhra Pradesh Summit 2026 visual communication work",
          alt: "Karthik's PanIIT Andhra Pradesh Summit 2026 visual communication work",
          role: 'medium'
        },
        {
          id: 'paniit-4',
          url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260286/WhatsApp_Image_2026-10-06_at_9.46.07_AM_rcabls.jpg',
          title: 'Pavilion Signage & Venue Wayfinding',
          caption: 'PanIIT Andhra Pradesh Summit 2026 pavilion and signage execution in Vijayawada',
          alt: 'PanIIT Andhra Pradesh Summit 2026 pavilion and signage execution in Vijayawada',
          role: 'supporting'
        },
        {
          id: 'paniit-5',
          url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260287/WhatsApp_Image_2026-10-06_at_9.46.08_AM_3_ncfflx.jpg',
          title: 'On-Ground Venue Execution & Collaborations',
          caption: 'Dr. B. R. Ambedkar Kala Vedika summit on-ground installations by Karthik Nimmanagoti',
          alt: 'Dr. B. R. Ambedkar Kala Vedika summit on-ground installations by Karthik Nimmanagoti',
          role: 'supporting'
        },
        {
          id: 'paniit-6',
          url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260287/WhatsApp_Image_2026-10-06_at_9.46.08_AM_1_yg5rfk.jpg',
          title: 'Community, Delegate Reception & Event Atmosphere',
          caption: 'PanIIT Andhra Pradesh Summit 2026 community and event design moments',
          alt: 'PanIIT Andhra Pradesh Summit 2026 community and event design moments',
          role: 'supporting'
        }
      ]
    }
  },
  {
    title: 'Frame by DB',
    tag: 'Freelance Platform',
    icon: 'camera',
    sub: 'Cinematography & Photography Agency Portfolio',
    desc: 'Modern cinematography agency platform built for Director of Photography Dasari Bharadwaj (Hyderabad, India). Built to deliver a high-end luxury aesthetic with fluid transitions, custom galleries, live pricing calculators, and client CMS.',
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'GSAP', 'Zod', 'Prisma'],
    result: 'Delivered a luxury modern agency aesthetic with fluid kinetic animations and client booking workflows.',
    link: 'https://frame-by-db.vercel.app/',
    actionLabel: 'Launch Platform'
  },
  {
    title: 'BASE44 Hackathon',
    tag: 'Web Platform & Infrastructure',
    icon: 'server',
    sub: 'Lead Organizer & Web Platform Architect',
    desc: 'Official platform (base44.niat.tech) built for 1,665+ participants. Architected registration workflows, high-concurrency database queries, and an on-ground QR verification dashboard.',
    tech: ['React', 'Supabase', 'Tailwind CSS', 'Vite', 'REST APIs', 'QR Scanning'],
    result: 'Maintained 100% platform uptime and checked in 1,665+ participants seamlessly during on-ground rush.',
    link: 'https://base44results.niat.tech/',
    actionLabel: 'View Results Portal'
  },
  {
    title: 'AidTrace',
    tag: 'Blockchain Platform',
    icon: 'link-2',
    sub: 'Cardano Donation Transparency Platform',
    desc: 'Cardano-powered donation transparency platform built during IndiaCodex’26. Tracks donation journeys from fundraising campaigns to transparent fund allocations and verifiable expense proofs on-chain.',
    tech: ['Cardano Blockchain', 'Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    result: 'Built verifiable on-chain audit transparency for disaster relief and non-profit allocation tracking.',
    link: 'https://aidtrace-cardano-dapp.vercel.app/',
    actionLabel: 'Launch DApp'
  },
  {
    title: 'Siemens Mobility Simulation',
    tag: 'Project Management',
    icon: 'bar-chart-2',
    sub: 'Urban Rail Expansion Simulation',
    desc: 'Virtual project management simulation for the Metroville Urban Rail Expansion under Siemens Mobility. Designed KPI dashboards tracking track installation, electrification progress, and budgets.',
    tech: ['Project Management', 'Data Analysis', 'KPI Strategy', 'Dashboard Reporting'],
    result: 'Formulated predictive milestone analytics models and resource allocation dashboards.',
    link: 'https://docs.google.com/spreadsheets/d/191AVtfduvH5h1rd8D4JnYJItELzTRJyOmFPs7IsppZM/edit?gid=0#gid=0',
    actionLabel: 'View Spreadsheet'
  }
];

export const TEACH_AI_DATA = {
  headline: "Technology exposure shouldn't depend on where a student grows up.",
  metrics: [
    { value: '1,820+', label: 'Students Impacted' },
    { value: '18+', label: 'Schools Reached' },
    { value: '31+', label: 'Volunteer Mentors' }
  ],
  role: 'Strategic POC',
  ownership: [
    'Documenting the journey not as routine updates, but as stories people remember',
    'Converting volunteer student efforts into public proof of leadership on LinkedIn',
    'Guiding student tech mentors to structure and present their workshops professionally',
    'Positioning every government school session as a sustainable grassroots movement'
  ],
  impact: [
    'Bridged digital divide by introducing AI tools and computer fundamentals in government schools',
    'Shifted students from passive users to creative problem solvers with practical tech challenges',
    'Built a sustainable, student-led tech mentorship model powered by NIAT volunteers'
  ],
  images: [
    'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/4_uffbub.jpg',
    'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/2_vb5mqh.jpg',
    'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/5_ywm5ps.jpg',
    'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/1_nft1oe.jpg'
  ],
  fullStory: {
    description: 'Teach AI for India is a student-led knowledge movement by NIATIANS to bring technology awareness and practical digital skills to government school students. This is not about teaching abstract theory — it is about opening real access where it does not exist.',
    reflection: 'Because talent is everywhere, but exposure is not. Scaling this movement with student tech mentors proved that young engineers can drive grassroots digital empowerment at state scale.',
    thanks: "Grateful to Nikhil Dendeti, Kalidindi Krishna Sai Varma, Pravalika Sabbavarapu ma'am, Pavan Dharma sir, Shivika Shrivastava ma'am, and Bogada Chandrakanth sir for backing this vision."
  }
};

export const GALLERY = [
  'https://res.cloudinary.com/do4nuj2kh/image/upload/v1766378248/Screenshot_2025-12-22_100305_ay8p5z.png',
  'https://res.cloudinary.com/do4nuj2kh/image/upload/v1766378248/Screenshot_2025-12-22_100242_ymx1y8.png',
  'https://res.cloudinary.com/do4nuj2kh/image/upload/v1766378338/Screenshot_2025-12-22_100847_vrhlpy.png',
];

export const CERTIFICATIONS = [
  {
    title: 'Social Media Certified',
    issuer: 'HubSpot Academy',
    date: '2026',
    validUntil: 'Sep 2028',
    code: 'd600498e876f4d439b1d0c5976700c6c',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1787172644/d600498e876f4d439b1d0c5796700c6c_jpseg4.png',
    link: '#',
    desc: 'Tested on best practices in inbound social strategy: social monitoring, content strategy, engagement, and demonstrating social ROI to stakeholders.',
    skills: ['Social Media Strategy', 'Content Strategy', 'Social Engagement', 'Social ROI'],
    verified: true
  },
  {
    title: 'TCS iON Career Edge',
    issuer: 'Tata Consultancy Services',
    date: '2025',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1764673068/Screenshot_2025-12-02_162733_h53itk.png',
    link: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1764673068/Screenshot_2025-12-02_162733_h53itk.png',
    desc: 'IT Service Management, business communication, and operational tools primer.'
  },
  {
    title: 'MSME & Startup India',
    issuer: 'Govt. of India',
    date: '2025',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1736232194/Picsart_25-01-06_23-20-36-401_b0ceud.jpg',
    link: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1736232194/Picsart_25-01-06_23-20-36-401_b0ceud.jpg',
    desc: 'Entrepreneurship, product innovation, and national startup ecosystem guidelines.'
  },
  {
    title: 'Digital Marketing',
    issuer: 'HubSpot Academy',
    date: '2024',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1735620143/2809d81dd69242fbab985eacccec3c47_ebzz3k.png',
    link: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1735620143/2809d81dd69242fbab985eacccec3c47_ebzz3k.png',
    desc: 'Inbound marketing funnels, SEO strategy, and content campaign analytics.'
  },
  {
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    date: '2024',
    img: 'https://placehold.co/600x400/22c55e/ffffff?text=HackerRank',
    link: 'https://placehold.co/600x400/22c55e/ffffff?text=HackerRank',
    desc: 'Verified software problem solving, data structures, and algorithmic logic.'
  },
  {
    title: 'Generative AI',
    issuer: 'Simplilearn',
    date: '2025',
    img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1735811083/Screenshot_2025-01-02_150942_dlzbyf.png',
    link: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1735811083/Screenshot_2025-01-02_150942_dlzbyf.png',
    desc: 'Training in generative models, prompt engineering, and modern application structures.'
  }
];

export const TESTIMONIAL = {
  quote: '"I had the opportunity to mentor Karthik closely and was impressed by his commitment and positive approach to challenges. He takes feedback seriously, asks thoughtful questions, and applies insights effectively. Karthik also played an active role in promoting one of our ongoing products as a social media manager, contributing to content planning and outreach efforts, which reflects his strong understanding of product positioning and audience engagement."',
  name: 'Sudheer Chikile',
  role: 'Mentor at NIAT',
  img: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1766396528/Screenshot_2025-12-22_150919_kx6w9v.png',
  linkedin: 'https://www.linkedin.com/in/sudheerchikile/',
};

export const FAQS = [
  {
    question: 'Are you open to freelance projects?',
    answer: 'Yes! I actively take on projects involving web development, social media strategy, personal branding, and end-to-end event management.',
  },
  {
    question: 'What kind of events do you organize?',
    answer: 'I specialize in large-scale tech summits, student hackathons (like BASE44 and Blend AI), and hands-on coding workshops. I manage technical platforms, on-ground logistics, crowd operations, and guest coordination.',
  },
  {
    question: 'How can I contact or collaborate with you?',
    answer: 'You can reach out using the "Let\'s Talk" button to send an inquiry, connect directly via WhatsApp, or email me at aktechintelligence@gmail.com.',
  },
];

export const CURRENTLY_WORKING_ON = [
  "Building AI Products",
  "Leading Innfill Community",
  "Running Teach AI for India",
  "Web Platform Architecture"
];
