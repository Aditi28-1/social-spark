export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortTag: string;
  summary: string;
  whatItIncludes: string[];
  whyBusinessesNeedIt: string;
  valueDelivered: string;
}

export interface IndustryHub {
  id: string;
  name: string;
  corridorType: string;
  audienceMix: string;
  contentAngle: string;
  recommendedFormat: string;
}

export interface IndustrySector {
  id: string;
  name: string;
  focusNote: string;
  isBeachhead?: boolean;
}

export type PortfolioCategory =
  | 'All'
  | 'Reels'
  | 'Social Media Posts'
  | 'Campaigns'
  | 'Branding'
  | 'Promotional Content';

export interface PortfolioSlide {
  label: string;
  headline: string;
  subline: string;
  image?: string;
  accentTone?: 'purple' | 'orange' | 'navy' | 'lavender';
}

export interface PortfolioConcept {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  sector: string;
  formatLabel: string;
  aspect: 'reel' | 'square' | 'landscape';
  image: string;
  imageAlt: string;
  conceptHandle: string;
  hookLine: string;
  objective: string;
  creativeDirection: string;
  sampleCaption: string;
  deliverableBreakdown: string[];
  slides?: PortfolioSlide[];
  reelBeats?: { time: string; scene: string; audioNote: string }[];
}

export interface ProcessStage {
  step: string;
  title: string;
  summary: string;
  focusDetail: string;
  outputs: string[];
}

export const AGENCY_IMAGES = {
  reelCafePour: '/src/assets/images/reel_cafe_pour_1795013516749.jpg',
  reelBrunchTable: '/src/assets/images/reel_brunch_table_1795013517284.jpg',
  campaignBoutique: '/src/assets/images/campaign_boutique_lookbook_1795013518327.jpg',
  campaignSalon: '/src/assets/images/campaign_salon_glow_1795013518319.jpg',
  agencyShoot: '/src/assets/images/agency_creative_shoot_1795013519007.jpg',
} as const;

export const BUSINESS_CHALLENGES = [
  {
    index: '01',
    title: 'Inconsistent Posting Cadence',
    detail:
      'Accounts go quiet during busy service weeks, making active cafés and storefronts appear inactive to local customers checking Instagram before visiting.',
  },
  {
    index: '02',
    title: 'Limited Marketing Bandwidth',
    detail:
      'Founders and managers focus on hospitality, inventory, and operations—leaving little time to track short-form hooks, editing rhythms, or format shifts.',
  },
  {
    index: '03',
    title: 'Generic DIY Templates',
    detail:
      'One-off mobile snapshots and repetitive stock graphics rarely capture the warmth, craft, or atmosphere that makes a local brand memorable.',
  },
  {
    index: '04',
    title: 'Attention Without Enquiries',
    detail:
      'Casual likes alone do not fill tables or book appointments unless content pairs storytelling with clear local calls-to-action and consistent tracking.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'social-media-management',
    index: '01',
    title: 'Social Media Management',
    shortTag: 'End-to-End Retainer',
    summary:
      'Complete monthly ownership of your brand presence—aligning visual storytelling, publishing schedules, and community touchpoints.',
    whatItIncludes: [
      'Monthly editorial calendar aligned with store offers and seasonal menus',
      'Consistent weekly publishing across Reels, carousels, and Stories',
      'Coordinated caption writing, hashtag structuring, and location tagging',
    ],
    whyBusinessesNeedIt:
      'Running a café, salon, or retail floor leaves owners little time to shoot, edit, and publish consistently week after week.',
    valueDelivered:
      'A reliable, active brand storefront online that reflects the quality of your physical space without adding to your daily workload.',
  },
  {
    id: 'strategy-planning',
    index: '02',
    title: 'Social Media Strategy & Planning',
    shortTag: 'Audience Roadmap',
    summary:
      'Customized content pillars tailored to your neighbourhood audience instead of recycled one-size-fits-all templates.',
    whatItIncludes: [
      'Instagram profile audit covering bio clarity, Highlights, and grid cohesion',
      'Custom content pillars balancing product craft, behind-the-scenes, and offers',
      'Structured 30-day rollout mapped around local footfall windows',
    ],
    whyBusinessesNeedIt:
      'Posting without clear pillars creates mixed messaging and makes it difficult to build recognition among nearby customers.',
    valueDelivered:
      'Every Reel, post, and Story serves a defined purpose—moving audiences from local discovery to profile visits and enquiries.',
  },
  {
    id: 'instagram-content-creation',
    index: '03',
    title: 'Instagram Content Creation',
    shortTag: 'Visual Grid Craft',
    summary:
      'Crisp photo compositions, menu spotlights, and editorial carousels designed to make your feed look intentional and inviting.',
    whatItIncludes: [
      'On-brand static posts, multi-slide carousels, and Story frames',
      'Menu, product, and ambience visual framing tailored to Instagram',
      'Cohesive colour and typography treatment across the grid',
    ],
    whyBusinessesNeedIt:
      'Local diners and shoppers often inspect an Instagram grid before deciding where to spend an evening or book a service.',
    valueDelivered:
      'A curated visual first impression that builds immediate credibility with new visitors searching local spots.',
  },
  {
    id: 'reels-production',
    index: '04',
    title: 'Reels & Short-Form Video Production',
    shortTag: '8–10 Custom Reels / Mo',
    summary:
      'High-retention vertical videos built around strong opening hooks, crisp pacing, and authentic brand moments.',
    whatItIncludes: [
      'Pre-scripted Reel concepts and shot lists tailored to your space',
      'On-location capture, rhythmic editing, colour grading, and clean captions',
      'Audio selection matched to brand personality rather than awkward trends',
    ],
    whyBusinessesNeedIt:
      'Short-form vertical video is the primary organic discovery surface on Instagram, yet filming and editing demand dedicated craft.',
    valueDelivered:
      'Scroll-stopping Reels that showcase your atmosphere, dishes, or craft dynamically and invite local sharing.',
  },
  {
    id: 'creative-design-copywriting',
    index: '05',
    title: 'Creative Design & Copywriting',
    shortTag: 'Brand Storytelling',
    summary:
      'Thoughtful graphic layouts and conversational captions written in a voice your local audience genuinely enjoys reading.',
    whatItIncludes: [
      'Custom typography-led launch graphics, festive creatives, and offers',
      'Hook-first captions with clear action prompts (reserve, DM, visit)',
      'Story highlight covers and branded visual templates',
    ],
    whyBusinessesNeedIt:
      'Cluttered flyers and generic captions get scrolled past; clean design and clear words earn a second look.',
    valueDelivered:
      'Sharp, modern visual identity across every post so customers recognize your brand instantly in their feed.',
  },
  {
    id: 'campaign-planning',
    index: '06',
    title: 'Social Media Campaign Planning',
    shortTag: 'Launches & Seasons',
    summary:
      'Focused multi-post promotional arcs for new menu drops, seasonal collections, student offers, and festive calendars.',
    whatItIncludes: [
      'Campaign theme development, teaser sequence, and launch rollout',
      'Coordinated Reels + Story countdowns + offer reminders',
      'Event and seasonal promotion calendars (monsoon, winter, festive weeks)',
    ],
    whyBusinessesNeedIt:
      'Announcing a new launch with a single last-minute post rarely creates momentum or sustained customer recall.',
    valueDelivered:
      'Structured storytelling around key revenue moments that gives regulars and new customers a clear reason to drop in.',
  },
  {
    id: 'instagram-account-management',
    index: '07',
    title: 'Instagram Account Management',
    shortTag: 'Profile Hygiene & Care',
    summary:
      'Consistent day-to-day stewardship of your Instagram handle—keeping scheduling, bio links, Highlights, and interaction tidy.',
    whatItIncludes: [
      'Scheduled weekly publishing at consistent audience-active hours',
      'Bio, link-in-bio, and Story Highlight structure updates',
      'Comment and DM enquiry routing guidelines for faster customer replies',
    ],
    whyBusinessesNeedIt:
      'Even great content loses enquiries if bio directions are outdated or Story Highlights bury menus and timings.',
    valueDelivered:
      'A clean, responsive Instagram storefront where visitors find your menu, address, and enquiry path in seconds.',
  },
  {
    id: 'performance-analytics',
    index: '08',
    title: 'Performance Analytics & Reporting',
    shortTag: 'Monthly Insights',
    summary:
      'Plain-English monthly reviews tracking which formats earned attention, saves, shares, and profile actions.',
    whatItIncludes: [
      'Monthly content performance summary across Reels, carousels, and Stories',
      'Format-level breakdown of reach, saves, shares, and profile visits',
      'Next-month creative adjustments informed by what resonated',
    ],
    whyBusinessesNeedIt:
      'Without reviewing real data, businesses keep repeating low-impact posts without knowing what actually connects.',
    valueDelivered:
      'Clear visibility into your monthly creative output and data-informed refinements that sharpen each cycle.',
  },
  {
    id: 'local-brand-promotions',
    index: '09',
    title: 'Local Brand Promotions',
    shortTag: 'Dehradun Discovery',
    summary:
      'Hyper-local campaign recommendations tailored to Dehradun neighbourhoods, college crowds, and weekend dining habits.',
    whatItIncludes: [
      'Neighbourhood-specific content angles and geo-tagged Story prompts',
      'Creator and micro-community collaboration suggestions',
      'Walk-in offer mechanics suited to café, retail, and campus footfall',
    ],
    whyBusinessesNeedIt:
      'Broad national trends miss the local rhythm of Dehradun—from evening Rajpur Road drives to campus hangout routines.',
    valueDelivered:
      'Culturally grounded storytelling crafted specifically for the customers who can actually walk through your door.',
  },
];

export const DEHRADUN_HUBS: IndustryHub[] = [
  {
    id: 'rajpur-road',
    name: 'Rajpur Road',
    corridorType: 'Flagship Café & Lifestyle Strip',
    audienceMix: 'Evening diners, weekend travellers, remote workers, and boutique shoppers.',
    contentAngle:
      'Atmosphere-led Reels showcasing golden-hour seating, specialty brews, and plated specials that turn weekend drives into table bookings.',
    recommendedFormat: '9:16 Sensory Pour Reels + Carousel Menu Guides',
  },
  {
    id: 'jakhan',
    name: 'Jakhan',
    corridorType: 'Neighbourhood Dining & Wellness Hub',
    audienceMix: 'Local residents, young professionals, families, and fitness-studio regulars.',
    contentAngle:
      'Consistent weekday ritual storytelling—morning coffee drops, salon care routines, and neighbourhood community highlights.',
    recommendedFormat: 'Founder Voiceover Reels + Before/After Editorial Grids',
  },
  {
    id: 'pacific-mall',
    name: 'Pacific Mall Area',
    corridorType: 'High-Footfall Retail & Dining Cluster',
    audienceMix: 'Weekend shoppers, young groups, and lifestyle consumers comparing options nearby.',
    contentAngle:
      'Crisp offer-led visual hooks, new-collection lookbooks, and "what to order / try this weekend" bite-sized Reels.',
    recommendedFormat: 'Fast-Cut Lookbook Reels + Offer Story Sequences',
  },
  {
    id: 'clock-tower',
    name: 'Clock Tower',
    corridorType: 'Central Commercial Core',
    audienceMix: 'City-wide shoppers, students, and daily commuters looking for trusted local brands.',
    contentAngle:
      'Clear value communication, heritage-meets-modern brand storytelling, and unmistakable storefront wayfinding in Reels.',
    recommendedFormat: 'Storefront Tour Reels + Promotional Carousels',
  },
  {
    id: 'dgu-campus',
    name: 'DGU Campus Commercial Clusters',
    corridorType: 'Student & Emerging Brand Ecosystem',
    audienceMix: 'University students, campus hangouts, student-led ventures, and budget-friendly eateries.',
    contentAngle:
      'Relatable campus-hangout edits, group combo campaigns, and crisp short-form storytelling built for peer-to-peer sharing.',
    recommendedFormat: 'Hangout POV Reels + Shareable Offer Graphics',
  },
];

export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    id: 'cafes-restaurants',
    name: 'Cafés & Casual Restaurants',
    focusNote: 'Our primary beachhead focus—1 to 3 outlets with active feeds ready for consistent Reels and table-driving storytelling.',
    isBeachhead: true,
  },
  {
    id: 'salons-beauty',
    name: 'Salons & Beauty Studios',
    focusNote: 'Transformation reels, treatment explainers, hygiene/space showcases, and seasonal grooming campaigns.',
  },
  {
    id: 'fashion-boutiques',
    name: 'Fashion Boutiques',
    focusNote: 'Lookbook reels, fabric-detail carousels, festive collection drops, and styling stories.',
  },
  {
    id: 'fitness-studios',
    name: 'Fitness Studios',
    focusNote: 'Coach spotlights, class energy clips, member routine storytelling, and trial-pass promotions.',
  },
  {
    id: 'local-retail',
    name: 'Local Retail Businesses',
    focusNote: 'In-store arrival highlights, gifting edits, and neighbourhood storefront discovery posts.',
  },
  {
    id: 'student-entrepreneurs',
    name: 'Student Entrepreneurs',
    focusNote: 'Founder-story reels, product validation campaigns, and sharp visual branding on a lean retainer.',
  },
  {
    id: 'startups-brands',
    name: 'Startups & Emerging Brands',
    focusNote: 'Launch identity kits, consistent social cadence, and audience-building storytelling from day one.',
  },
];

export const PORTFOLIO_CONCEPTS: PortfolioConcept[] = [
  {
    id: 'roast-ritual-reel',
    title: 'Morning Pour & Patio Ambience',
    category: 'Reels',
    sector: 'Independent Café Concept',
    formatLabel: 'Instagram Reel · 9:16 Vertical',
    aspect: 'reel',
    image: AGENCY_IMAGES.reelCafePour,
    imageAlt: 'Barista pouring latte art into ceramic stoneware cup in sunlit mountain-town cafe',
    conceptHandle: '@cedarroast.demo',
    hookLine: 'Why 8:30 AM hits different on Rajpur Road.',
    objective: 'Demonstrate sensory short-form café storytelling designed to capture morning coffee commuters and remote workers.',
    creativeDirection:
      'Natural window light, ambient espresso-bar audio synced to rhythmic 0.8s cuts, and subtle location-anchored text overlay in the opening two seconds.',
    sampleCaption:
      'Fresh single-origin pour, warm stoneware, and quiet morning light before the city wakes up. Save this spot for your next work-from-café morning in Dehradun.',
    deliverableBreakdown: [
      '18-second vertical Reel storyboard & shot list',
      'Ambient audio mix + clean kinetic hook typography',
      'Location-tagged Story follow-up with seating highlights',
    ],
    reelBeats: [
      { time: '00:00–00:03', scene: 'Close-up steam rising off stoneware espresso cup', audioNote: 'Crisp grinder & pour ASMR' },
      { time: '00:03–00:10', scene: 'Barista free-pour latte art + sunlit oak counter', audioNote: 'Warm acoustic beat drop' },
      { time: '00:10–00:18', scene: 'Window table reveal with open journal & cafe timings', audioNote: 'Soft fade + CTA card' },
    ],
  },
  {
    id: 'sunday-brunch-carousel',
    title: 'Weekend Table: Seasonal Brunch Edit',
    category: 'Social Media Posts',
    sector: 'Casual Dining Concept',
    formatLabel: '4-Slide Editorial Carousel',
    aspect: 'square',
    image: AGENCY_IMAGES.reelBrunchTable,
    imageAlt: 'Artisan sourdough toast, croissants, and iced matcha on sunlit travertine cafe table',
    conceptHandle: '@courtyardtable.demo',
    hookLine: 'Four plates worth waking up early for this Sunday.',
    objective: 'Showcase how structured multi-slide menu carousels earn saves and group-chat shares ahead of weekend dining.',
    creativeDirection:
      'Overhead dappled-light photography paired with clean editorial menu callouts, keeping text legible without obscuring food textures.',
    sampleCaption:
      'Swipe through our weekend brunch pairing—flaky butter croissants, poached-egg sourdough tartine, and ceremonial iced matcha. Which table combo are you ordering first?',
    deliverableBreakdown: [
      '4-slide cohesive carousel grid layout',
      'Dish-by-dish tasting copy & dietary notes',
      'Weekend Story poll sticker sequence',
    ],
    slides: [
      {
        label: 'Slide 01 · Hook',
        headline: 'The Sunday Brunch Edit',
        subline: 'Swipe to build your weekend table',
        image: AGENCY_IMAGES.reelBrunchTable,
      },
      {
        label: 'Slide 02 · Signature Plate',
        headline: 'Sourdough Avocado Tartine',
        subline: 'Poached farm egg · chilli flakes · microgreens',
        accentTone: 'orange',
      },
      {
        label: 'Slide 03 · Pairing',
        headline: 'Iced Botanical Matcha',
        subline: 'Ceremonial grade · oat or dairy milk',
        accentTone: 'purple',
      },
      {
        label: 'Slide 04 · Visit CTA',
        headline: 'Served Sat–Sun · 9 AM to 2 PM',
        subline: 'Tap location tag for directions',
        accentTone: 'navy',
      },
    ],
  },
  {
    id: 'autumn-linen-campaign',
    title: 'Linen & Craft — Seasonal Drop Campaign',
    category: 'Campaigns',
    sector: 'Fashion Boutique Concept',
    formatLabel: '3-Week Launch Campaign',
    aspect: 'landscape',
    image: AGENCY_IMAGES.campaignBoutique,
    imageAlt: 'Curated linen garments on minimalist brushed brass rack in sunlit concrete showroom',
    conceptHandle: '@loomandstone.demo',
    hookLine: 'Three textures. Six silhouettes. Zero fast-fashion noise.',
    objective: 'Illustrate a full teaser-to-launch campaign arc for an independent Dehradun apparel boutique.',
    creativeDirection:
      'Architectural showroom daylight, muted earth-and-terracotta palette paired with restrained editorial typography and clean garment care storytelling.',
    sampleCaption:
      'Meet our breathable linen edit—tailored for crisp mornings and effortless evenings. Drop into our Jakhan studio or DM "LINEN" for sizing assistance.',
    deliverableBreakdown: [
      'Teaser Reel + 2 lookbook carousels + launch Stories',
      'DM keyword prompt ("LINEN") for direct enquiries',
      'Behind-the-rack fabric detail close-ups',
    ],
  },
  {
    id: 'calm-ritual-salon',
    title: 'The Quiet Reset — Studio Ambience Series',
    category: 'Branding',
    sector: 'Salon & Beauty Studio Concept',
    formatLabel: 'Brand Storytelling Grid',
    aspect: 'landscape',
    image: AGENCY_IMAGES.campaignSalon,
    imageAlt: 'Minimalist luxury salon interior with sculpted plaster arches and amber apothecary bottles',
    conceptHandle: '@ateliercalm.demo',
    hookLine: 'Before the treatment begins, the space sets the tone.',
    objective: 'Position an independent beauty and scalp-care studio as refined, hygienic, and unhurried through visual brand consistency.',
    creativeDirection:
      'Warm travertine tones, uncluttered framing, and educational skin/hair care carousels that build trust before a first-time booking.',
    sampleCaption:
      'Good self-care never feels rushed. Step inside our calm treatment suite for botanical hair rituals and unhurried consultations. Appointment link in bio.',
    deliverableBreakdown: [
      '9-tile grid aesthetic blueprint & tone guide',
      'Treatment breakdown highlight covers',
      'Consultation-booking Story flow',
    ],
  },
  {
    id: 'monsoon-coffee-promo',
    title: 'Rainy Day Pour — Local Promotional Arc',
    category: 'Promotional Content',
    sector: 'Café & Bakery Concept',
    formatLabel: 'Promotional Reel + Offer Card',
    aspect: 'reel',
    image: AGENCY_IMAGES.reelBrunchTable,
    imageAlt: 'Cafe pastries and iced drink arranged in warm natural light for promotional campaign',
    conceptHandle: '@hillsidebake.demo',
    hookLine: 'Dehradun rains + warm laminated pastry = your afternoon plan.',
    objective: 'Demonstrate timely, weather-responsive local promotional content crafted to nudge weekday afternoon walk-ins.',
    creativeDirection:
      'Bold conversational headline over crisp overhead table imagery, paired with a straightforward weekday afternoon pairing prompt.',
    sampleCaption:
      'When the clouds roll over Mussoorie ridge, we keep the ovens warm. Pair any pour-over with a fresh butter croissant between 3 PM and 6 PM on weekdays.',
    deliverableBreakdown: [
      'Weather-triggered Story & Reel template',
      'Weekday off-peak offer framing',
      'Clear geo-tag & map pin prompt',
    ],
    reelBeats: [
      { time: '00:00–00:03', scene: 'Raindrops on café glass window looking toward street', audioNote: 'Soft rain ambience' },
      { time: '00:03–00:09', scene: 'Fresh flaky croissant tear + coffee pour', audioNote: 'Warm lo-fi groove' },
      { time: '00:09–00:15', scene: 'Weekday 3–6 PM pairing card + storefront pin', audioNote: 'Clean subtle chime' },
    ],
  },
  {
    id: 'behind-the-lens-story',
    title: 'Meet the Makers — Founder & Craft Reel',
    category: 'Reels',
    sector: 'Startup / Emerging Brand Concept',
    formatLabel: 'Storytelling Reel · 9:16',
    aspect: 'landscape',
    image: AGENCY_IMAGES.agencyShoot,
    imageAlt: 'Creative marketing producer filming an artisan cafe setup on a smartphone gimbal rig',
    conceptHandle: '@socialspark.concept',
    hookLine: 'The story behind every plate builds deeper loyalty than any discount.',
    objective: 'Show how founder-led and behind-the-scenes production humanizes local brands without awkward scripted acting.',
    creativeDirection:
      'Documentary gimbal movement, candid prep moments, and crisp 1-sentence interview subtitles that audiences watch to the end.',
    sampleCaption:
      'Every neighbourhood brand has a story customers rarely get to see. Here is how a 60-minute on-site shoot turns daily craft into a full week of vertical storytelling.',
    deliverableBreakdown: [
      '15-minute founder interview prompt sheet',
      'B-roll craft capture + clean burned-in subtitles',
      'Pin-to-top profile introduction Reel',
    ],
    reelBeats: [
      { time: '00:00–00:04', scene: 'Founder prepping morning batch in natural light', audioNote: 'Candid founder voiceover' },
      { time: '00:04–00:12', scene: 'Quick cuts of craft details & customer handover', audioNote: 'Upbeat rhythmic underscore' },
      { time: '00:12–00:20', scene: 'Smiling storefront welcome & brand tagline', audioNote: 'Warm resolve' },
    ],
  },
  {
    id: 'festive-diwali-hamper',
    title: 'Festive Gifting Edit — Multi-Format Drop',
    category: 'Campaigns',
    sector: 'Local Retail & Bakery Concept',
    formatLabel: 'Festive Campaign System',
    aspect: 'square',
    image: AGENCY_IMAGES.campaignBoutique,
    imageAlt: 'Curated neutral and warm tones showcase suited for festive gifting campaign direction',
    conceptHandle: '@crafteddehradun.demo',
    hookLine: 'Thoughtful local gifting boxes curated without last-minute panic.',
    objective: 'Present a seasonal festive pre-order campaign built for small retail and artisanal food brands.',
    creativeDirection:
      'Rich deep-navy and warm-amber visual framing (replacing loud generic clipart) with clear pre-order cutoffs and gift-tier clarity.',
    sampleCaption:
      'Festive gifting made personal. Curated small-batch boxes ready for family visits and corporate thank-yous across Dehradun. Pre-orders open via DM.',
    deliverableBreakdown: [
      'Pre-order countdown Story pack',
      'Gift box breakdown carousel',
      'DM order-confirmation prompt script',
    ],
    slides: [
      {
        label: 'Slide 01 · Campaign Cover',
        headline: 'The Festive Gifting Edit',
        subline: 'Curated locally in Dehradun',
        accentTone: 'navy',
      },
      {
        label: 'Slide 02 · Inside the Box',
        headline: 'Small-Batch Artisanal Picks',
        subline: 'Hand-packed · Custom ribbon note included',
        accentTone: 'orange',
      },
      {
        label: 'Slide 03 · Pre-Order Flow',
        headline: 'DM "GIFT" to Reserve',
        subline: 'Pickup & local city coordination',
        accentTone: 'purple',
      },
    ],
  },
  {
    id: 'campus-student-pass',
    title: 'Campus Break Combo — Student Promo',
    category: 'Promotional Content',
    sector: 'Student Hangout Café Concept',
    formatLabel: 'Story + Post Promo Kit',
    aspect: 'square',
    image: AGENCY_IMAGES.reelCafePour,
    imageAlt: 'Specialty coffee barista serving fresh brew for student campus promo concept',
    conceptHandle: '@campusbrew.demo',
    hookLine: 'Between lectures? Your afternoon cold brew & toast sorted.',
    objective: 'Illustrate hyper-targeted promotional creatives tailored to DGU and Dehradun student commercial clusters.',
    creativeDirection:
      'Crisp, high-contrast typography paired with authentic coffee-bar visuals designed to be forwarded in student group chats.',
    sampleCaption:
      'Post-lecture energy check. Flash your student ID between 1 PM and 4 PM for our signature iced brew + sourdough snack pairing.',
    deliverableBreakdown: [
      'Share-optimized Story offer graphic',
      'Feed announcement post with clear timings',
      'Campus-cluster geo-tag checklist',
    ],
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Discover',
    summary: 'Understand the business, target audience and marketing objectives.',
    focusDetail:
      'We audit your current Instagram presence, visit your space or review your menu/catalogue, and align on who your ideal local customers are.',
    outputs: ['Profile & grid audit', 'Audience & neighbourhood mapping', 'Tone & visual benchmark'],
  },
  {
    step: '02',
    title: 'Strategize',
    summary: 'Create a customized content strategy and monthly calendar.',
    focusDetail:
      'We translate business priorities—new dishes, seasonal services, weekday footfall—into a structured 30-day calendar before a single camera rolls.',
    outputs: ['Content pillars & hook angles', 'Monthly publishing calendar', '8–10 Reel concept scripts'],
  },
  {
    step: '03',
    title: 'Create',
    summary: 'Produce engaging Reels, creative designs and campaign content.',
    focusDetail:
      'Focused on-site capture and studio editing turn everyday brand craft into crisp Reels, carousels, graphics, and conversational captions.',
    outputs: ['On-location short-form shoots', 'Color-graded Reels & captions', 'Custom graphic & carousel posts'],
  },
  {
    step: '04',
    title: 'Publish',
    summary: 'Manage content scheduling, publishing and audience engagement.',
    focusDetail:
      'Consistent weekly publishing, clean Story Highlights, location tagging, and responsive profile upkeep—without pulling you away from customers.',
    outputs: ['Scheduled weekly posting', 'Geo-tagged Story cadence', 'Profile & Highlight hygiene'],
  },
  {
    step: '05',
    title: 'Analyze',
    summary: 'Review performance metrics and optimize the strategy.',
    focusDetail:
      'At month-end, we review what earned saves, shares, reach, and enquiries so next month’s creative slate doubles down on what works.',
    outputs: ['Monthly performance report', 'Format-by-format insights', 'Next-month creative refinements'],
  },
];

export const GROWTH_PACKAGE = {
  name: 'SocialSpark Growth Package',
  price: '₹12,000',
  cadence: '/ month',
  tagline: 'All-in-one monthly creative production & social media management for growing local brands.',
  inclusions: [
    '8–10 customized Reels',
    'Monthly content calendar',
    'Content strategy and planning',
    'Creative design and captions',
    'Weekly content posting',
    'Instagram account management',
    'Monthly performance analytics',
    'Local campaign recommendations',
  ],
  customNote: "Need something customized? Let's discuss a package that matches your business goals.",
};

// Internal venture planning data (never displayed on public-facing marketing sections)
export const INTERNAL_VENTURE_MODEL = {
  revenueModel: 'Subscription',
  monthlySubscriptionPrice: '₹12,000',
  expectedBaseCustomers: 6,
  expectedMonthlyRevenue: '₹72,000',
  variableCostPerCustomer: '₹3,500',
  monthlyFixedCost: '₹20,000',
  expectedMonthlyOperatingSurplus: '₹31,000',
  contributionPerCustomer: '₹8,500',
  breakEvenCustomers: 3,
  initialBeachhead:
    'Independent cafés and casual restaurants in Dehradun (1–3 outlets) around Rajpur Road, Jakhan, Pacific Mall area, Clock Tower, and DGU campus clusters.',
};
