export interface GalleryItem {
  id: number;
  image: string;
  eventName: string;
  location: string;
  description: string;
  attendees: string;
  orientation: "landscape" | "portrait";
  category?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
}

const BASE_REMOTE_URL = "https://venushiring.com/Gallery";

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 5,
    image: `${BASE_REMOTE_URL}/With%20Consulate%20General%20of%20US.jpg`,
    eventName: "With Consulate General of the U.S.",
    location: "United States",
    description:
      "Important diplomatic meeting with the U.S. Consulate General to discuss talent mobility and business relations.",
    attendees: "Venus Consultancy team met with the Consulate General of the U.S.",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-top",
  },
  {
    id: 6,
    image: `${BASE_REMOTE_URL}/With%20The%20U.S%20Ambassador%20David%20Cohen.jpg`,
    eventName: "With David Cohen - U.S. Ambassador",
    location: "United States",
    description:
      "Prestigious meeting with U.S. Ambassador David Cohen to discuss international talent solutions and diplomatic partnerships.",
    attendees: "Venus Consultancy team met with David Cohen, U.S. Ambassador",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 9,
    image: `${BASE_REMOTE_URL}/Meeting%20with%20Governor%20of%20Michigan%20Gretchen%20Whitmer.jpg`,
    eventName: "With Gretchen Whitmer - Governor of Michigan",
    location: "Michigan, USA",
    description:
      "Important meeting with Governor Gretchen Whitmer to discuss talent solutions for Michigan's growing economy and business development initiatives.",
    attendees: "Venus Consultancy team met with Gretchen Whitmer, Governor of Michigan",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-top",
  },
  {
    id: 10,
    image: `${BASE_REMOTE_URL}/Great%20meeting%20with%20Governor%20of%20Arizona,%20Katie%20Hobbs.jpg`,
    eventName: "With Katie Hobbs - Governor of Arizona",
    location: "Arizona, USA",
    description:
      "Productive meeting with Governor Katie Hobbs to explore talent acquisition strategies for Arizona's expanding business landscape.",
    attendees: "Venus Consultancy team met with Katie Hobbs, Governor of Arizona",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 11,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20Governor%20of%20Indiana,%20Eric%20Holcomb.jpg`,
    eventName: "With Eric Holcomb - Governor of Indiana",
    location: "Indiana, USA",
    description:
      "Strategic discussion with Governor Eric Holcomb about supporting Indiana's workforce development and talent recruitment initiatives.",
    attendees: "Venus Consultancy team met with Eric Holcomb, Governor of Indiana",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_8%]",
  },
  {
    id: 12,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20Governor%20of%20Maryland%20Wes%20Moore.jpg`,
    eventName: "With Wes Moore - Governor of Maryland",
    location: "Maryland, USA",
    description:
      "Engaging meeting with Governor Wes Moore to discuss innovative talent solutions for Maryland's diverse business ecosystem.",
    attendees: "Venus Consultancy team met with Wes Moore, Governor of Maryland",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-[center_10%]",
  },
  {
    id: 13,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20Governor%20of%20Nevada%20Lombardo.jpg`,
    eventName: "With Joe Lombardo - Governor of Nevada",
    location: "Nevada, USA",
    description:
      "Strategic meeting with Governor Joe Lombardo to explore talent acquisition opportunities in Nevada's dynamic economy.",
    attendees: "Venus Consultancy team met with Joe Lombardo, Governor of Nevada",
    orientation: "landscape",
    category: "Diplomatic & Government",
    objectPosition: "object-top",
  },
  {
    id: 14,
    image: `${BASE_REMOTE_URL}/Great%20meeting%20with%20President%20Ying%20McGuire%20of%20NMSDC%20at%20Baltimore.jpg`,
    eventName: "With Ying McGuire - President of NMSDC",
    location: "Baltimore, Maryland, USA",
    description:
      "Significant meeting with President Ying McGuire of the National Minority Supplier Development Council to discuss supplier diversity and talent inclusion initiatives.",
    attendees: "Venus Consultancy team met with Ying McGuire, President of NMSDC",
    orientation: "landscape",
    category: "Executive Leadership",
    objectPosition: "object-[center_20%]",
  },
  {
    id: 15,
    image: `${BASE_REMOTE_URL}/Conference%20at%20Harvard%20Business%20School.jpg`,
    eventName: "Conference at Harvard Business School",
    location: "Cambridge, Massachusetts, USA",
    description:
      "Participating in a prestigious conference at Harvard Business School, engaging with thought leaders and industry experts on talent management strategies.",
    attendees: "Venus Consultancy team at Harvard Business School Conference",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 16,
    image: `${BASE_REMOTE_URL}/Great%20Meeting%20with%20the%20entrepreneaurs%20at%20Harvard%20Business%20School.jpg`,
    eventName: "With Entrepreneurs at Harvard Business School",
    location: "Cambridge, Massachusetts, USA",
    description:
      "Networking and collaboration with innovative entrepreneurs at Harvard Business School, exploring talent solutions for startups and growing businesses.",
    attendees: "Venus Consultancy team met with entrepreneurs at Harvard Business School",
    orientation: "landscape",
    category: "Executive Leadership",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 17,
    image: `${BASE_REMOTE_URL}/Venus%20consultancy%20at%20CES%20Las%20Vegas%20Nevada.jpg`,
    eventName: "Venus Consultancy at CES Las Vegas",
    location: "Las Vegas, Nevada, USA",
    description:
      "Active participation at CES Las Vegas, engaging with technology leaders and exploring talent needs in the consumer electronics industry.",
    attendees: "Venus Consultancy team at CES Las Vegas",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_20%]",
  },
  {
    id: 19,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20Baltimore%20US%20for%20NMSDC%20Conference.jpg`,
    eventName: "Venus Consultancy at NMSDC Conference in Baltimore",
    location: "Baltimore, Maryland, USA",
    description:
      "Participating in the National Minority Supplier Development Council Conference, promoting diversity and inclusion in talent acquisition.",
    attendees: "Venus Consultancy team at NMSDC Conference in Baltimore",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-center",
  },
  {
    id: 20,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20Sponsor%20at%20SELECT%20USA.jpg`,
    eventName: "Venus Consultancy Sponsor at SelectUSA",
    location: "United States",
    description:
      "Proud sponsorship of SelectUSA, supporting international business investment and connecting global talent with U.S. opportunities.",
    attendees: "Venus Consultancy as sponsor at SelectUSA event",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_20%]",
  },
  {
    id: 22,
    image: `${BASE_REMOTE_URL}/Supplier%20Diversity%20event%20at%20Stellantis.jpg`,
    eventName: "Supplier Diversity Event at Stellantis",
    location: "United States",
    description:
      "Participating in Stellantis' Supplier Diversity event, promoting inclusive talent solutions and supporting diverse supplier networks.",
    attendees: "Venus Consultancy team at Stellantis Supplier Diversity event",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-top",
  },
  {
    id: 23,
    image: `${BASE_REMOTE_URL}/Supplier%20Diversity%20event%20at%20Stellantis'%20headquarters%20in%20Auburn%20Hills,%20Michigan.jpg`,
    eventName: "Supplier Diversity Event at Stellantis Headquarters",
    location: "Auburn Hills, Michigan, USA",
    description:
      "Engaging with Stellantis at their headquarters in Auburn Hills, discussing supplier diversity initiatives and talent acquisition partnerships.",
    attendees: "Venus Consultancy team at Stellantis headquarters in Auburn Hills, Michigan",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 24,
    image: `${BASE_REMOTE_URL}/Hero%20of%20the%20Day%20-%20Venus%20Consultancy%20at%20Supplier%20Diversity%20event%20of%20Toyota.jpg`,
    eventName: "Venus Consultancy at Toyota Supplier Diversity Event",
    location: "United States",
    description:
      "Recognized as Hero of the Day at Toyota's Supplier Diversity event, celebrating excellence in diverse talent solutions and supplier partnerships.",
    attendees: "Venus Consultancy team honored at Toyota Supplier Diversity event",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-top",
  },
  {
    id: 25,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20MMSDC%20Michigan.jpg`,
    eventName: "Venus Consultancy at MMSDC Michigan",
    location: "Michigan, USA",
    description:
      "Active participation in the Michigan Minority Supplier Development Council event, promoting diversity and inclusion in talent acquisition.",
    attendees: "Venus Consultancy team at MMSDC Michigan event",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_20%]",
  },
  {
    id: 26,
    image: `${BASE_REMOTE_URL}/Venus%20Consultancy%20at%20Job-fair%20event.jpg`,
    eventName: "Venus Consultancy at Job Fair Event",
    location: "United States",
    description:
      "Connecting job seekers with opportunities at a community job fair, showcasing our commitment to talent placement and career development.",
    attendees: "Venus Consultancy team at job fair event",
    orientation: "landscape",
    category: "Community & Recruitment",
    objectPosition: "object-[center_15%]",
  },
  {
    id: 27,
    image: `${BASE_REMOTE_URL}/Team%20Venus%20helping%20at%20Community%20Job%20fair.jpg`,
    eventName: "Team Venus at Community Job Fair",
    location: "United States",
    description:
      "Team Venus actively supporting the community job fair, helping connect talented individuals with career opportunities and providing recruitment guidance.",
    attendees: "Team Venus Consultancy at community job fair",
    orientation: "landscape",
    category: "Community & Recruitment",
    objectPosition: "object-top",
  },
  {
    id: 28,
    image: `${BASE_REMOTE_URL}/Team%20Venus%20at%20US%20thanks%20giving%20dinner%20at%20AMCHAM%20Gala%20Event.jpg`,
    eventName: "Team Venus at AMCHAM Gala Event",
    location: "United States",
    description:
      "Celebrating at the American Chamber of Commerce Gala Event, networking with business leaders and strengthening international business relationships.",
    attendees: "Team Venus Consultancy at AMCHAM Thanksgiving Gala",
    orientation: "landscape",
    category: "Industry Events",
    objectPosition: "object-[center_10%]",
  },
];
