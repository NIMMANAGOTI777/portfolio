export const PHOTOGRAPHY_STATS = [
  { id: 'views', label: 'Views', value: 25000, suffix: '+' },
  { id: 'followers', label: 'Followers', value: 100, suffix: '+' },
  { id: 'posts', label: 'Posts', value: 15, suffix: '+' },
  { id: 'device', label: 'Medium', value: 'Mobile Photography', isString: true },
  { id: 'location', label: 'Base', value: 'Hyderabad', isString: true }
];

export const PHOTOGRAPHY_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'photography', label: 'Photography' },
  { id: 'reels', label: 'Reels' },
  { id: 'streets', label: 'Streets' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'nature', label: 'Nature' },
  { id: 'creative edits', label: 'Creative Edits' }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Neon Drizzle',
    category: 'Streets',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800',
    location: 'DLF Street, Hyderabad',
    shotOn: 'iPhone 15 Pro Max',
    story: 'Captured this shot on a rainy Tuesday evening at DLF. The reflection of the food stalls in the puddle created a cyberpunk-like atmosphere. I waited for a single commuter to pass by to add a sense of movement and scale.',
    editingStyle: 'Deep blues with warm orange neon glow, contrast-heavy, elevated highlights, 15% film grain.',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 2,
    title: 'Warm Shadows',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
    location: 'Gachibowli, Hyderabad',
    shotOn: 'iPhone 15 Pro Max',
    story: 'Golden hour portrait focusing on high contrast shadows. The sunlight was filtering through window blinds, casting clean geometric stripes across the face. Minimal pose, maximum emotion.',
    editingStyle: 'Analog warm tones, rich skin-tone preservation, soft highlights, subtle contrast curves.',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 3,
    title: 'Morning Canopy',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800',
    location: 'Ananthagiri Hills, Vikarabad',
    shotOn: 'iPhone 13',
    story: 'Woke up at 5:00 AM to catch the morning mist in the forest. The sun rays just began slicing through the tall trees, creating light shafts that felt almost spiritual.',
    editingStyle: 'Earthtone greens, warm golden highlights, misty highlights, soft shadows.',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 4,
    title: 'Vanguard Motion',
    category: 'Reels',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800',
    location: 'HITEC City, Hyderabad',
    shotOn: 'iPhone 15 Pro Max',
    story: 'A frame captured while filming a cinematic reel about Hyderabad metro life. Transitioned from high shutter action to motion blur to capture the fast-paced developer lifestyle.',
    editingStyle: 'Cool steel blue tint, high sharpness, motion blur accents, matte dark look.',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 5,
    title: 'Charminar Chords',
    category: 'Streets',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800',
    location: 'Old City, Hyderabad',
    shotOn: 'iPhone 15 Pro Max',
    story: 'Finding a clean angle at Charminar is nearly impossible due to the crowd. I went low, placing my phone near a vendor\'s shiny brass items to capture a reflection that splits the monument in two.',
    editingStyle: 'Vibrant yellow and warm orange pop, contrasty heritage finish, custom HDR compression.',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 6,
    title: 'Surreal Sunset',
    category: 'Creative Edits',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800',
    location: 'Hussain Sagar, Hyderabad',
    shotOn: 'iPhone 13',
    story: 'A double exposure experiment. Blended a silhouette photo of sailboat masts at Hussain Sagar with a dreamy star-field texture shot in my darkroom.',
    editingStyle: 'Dreamy pink and purple gradient tones, composite overlay, high dynamic range, dreamy glow.',
    aspect: 'aspect-[1/1]'
  },
  {
    id: 7,
    title: 'Muted Simplicity',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800',
    location: 'Studio, Hyderabad',
    shotOn: 'iPhone 15 Pro Max',
    story: 'A natural light portrait close-up. Emphasized the storytelling depth of the eyes. Employs classic composition rules using grid alignments.',
    editingStyle: 'Muted pastel tones, low saturation, high luminance skin tones, soft matte shadows.',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 8,
    title: 'Mist & Pine',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800',
    location: 'Ooty, India',
    shotOn: 'iPhone 13',
    story: 'Shot this during a trek. The mist was moving so fast that the visibility kept changing every few minutes. Captured the exact moment the pines emerged from the white cloud.',
    editingStyle: 'Desaturated greens, heavy fade curve, soft vignette, film-like grain texture.',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 9,
    title: 'Behind the Reel',
    category: 'Reels',
    image: 'https://images.unsplash.com/photo-1461151304267-386db978c2c3?q=80&w=800',
    location: 'NIAT Campus, Hyderabad',
    shotOn: 'iPhone 15 Pro Max',
    story: 'Behind the scenes while editing a fast-paced recap video. Documenting the workflow is as important as the final product. Every transition is timed to a beat.',
    editingStyle: 'Workspace glow, high clarity, neon purple contrast, deep vignette.',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 10,
    title: 'Retro Arcade',
    category: 'Creative Edits',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800',
    location: 'Cyber Arcade, Hyderabad',
    shotOn: 'iPhone 15 Pro Max',
    story: 'Took a basic image of vintage controllers and layered neon gradients and light leaks in post to create a nostalgic 80s arcade feel.',
    editingStyle: 'Teal/Magenta split tone, vintage warm filter, heavy light leaks, retro styling.',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 11,
    title: 'Chasing Light',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800',
    location: 'Khajaguda Hills, Hyderabad',
    shotOn: 'iPhone 15 Pro Max',
    story: 'Climbed the boulder hills of Khajaguda to shoot silhouettes. The sunset backlight outlines the organic shapes of the rocks and grass beautifully.',
    editingStyle: 'High silhouette contrast, rich warm sky gradient, reduced highlight details.',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 12,
    title: 'Sole Silhouette',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=800',
    location: 'Secunderabad Station, Hyderabad',
    shotOn: 'iPhone 13',
    story: 'A solitary traveler standing in the light tunnel at the railway station. A storytelling perspective focusing on solitude and journey.',
    editingStyle: 'High contrast monochrome, heavy grain, deep black point, classic film look.',
    aspect: 'aspect-[9/16]'
  }
];

export const CREATIVE_SETUP = [
  {
    id: 'mobile-photo',
    title: 'Mobile Photography',
    toolName: 'iPhone 15 Pro Max & iPhone 13',
    desc: 'The primary cameras. Using manual focus locks and RAW output mode to capture maximum dynamic range directly on the field.',
    iconName: 'camera'
  },
  {
    id: 'lightroom',
    title: 'Lightroom Mobile',
    toolName: 'Color Grading & Lighting',
    desc: 'My playground for crafting consistent styles. Custom presets, tone curves, selective masking, and film grain configurations.',
    iconName: 'sliders'
  },
  {
    id: 'capcut',
    title: 'CapCut',
    toolName: 'Cinematic Sequencing',
    desc: 'Used for timing video clips, layering sound designs, speed ramping, and applying smooth camera stabilization effects.',
    iconName: 'video'
  },
  {
    id: 'vn',
    title: 'VN Video Editor',
    toolName: 'Precision Editing',
    desc: 'Ideal for timeline precision, beat-sync cutting, keyframe animations, and exporting high-bitrate vertical video content.',
    iconName: 'film'
  },
  {
    id: 'canva',
    title: 'Canva',
    toolName: 'Visual Framing & Covers',
    desc: 'Used to draft Instagram story layouts, text overlays, cinematic reel covers, and thumbnail frames.',
    iconName: 'layout'
  },
  {
    id: 'photoshop',
    title: 'Photoshop',
    toolName: 'Creative Composition',
    desc: 'Enables advanced edits like double exposures, sky replacements, complex object removals, and graphic merges.',
    iconName: 'image'
  }
];

export const PHOTOGRAPHY_TIMELINE = [
  {
    year: '2024',
    title: 'The Spark',
    milestones: [
      'Started experimenting with mobile photography',
      'Learned rules of framing, leading lines, and golden hour timing',
      'Discovered the power of mobile RAW shooting and basic color grading'
    ]
  },
  {
    year: '2025',
    title: 'Content Transition',
    milestones: [
      'Started creating photography-focused content',
      'Experimented with fast-paced editing and storytelling voiceovers in reels',
      'Secured fests and student club videographer coverage'
    ]
  },
  {
    year: '2026',
    title: 'Dedicated Identity',
    milestones: [
      'Built a dedicated photography identity',
      'Established a signature color grading palette (warm orange & teal cinema)',
      'Partnered with student creators for visual branding and highlights'
    ]
  }
];
