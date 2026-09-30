import { VacantPosition } from '../types';

export const VACANT_POSITIONS_DATA: VacantPosition[] = [
  // School of Technology
  {
    id: 'pos-ai-ml',
    schoolId: 'school-of-technology',
    cadre: 'Assistant Professor / Associate Professor / Tutor Professor',
    area: 'Artificial Intelligence & Machine Learning',
    department: 'Department of Computer Science & Engineering',
    vacancyCount: 3,
    employmentType: 'Full Time • Regular Academic Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      "Bachelor's / Master's / Ph.D. in Computer Science & Engineering, Artificial Intelligence, or related computational field from recognized institution.",
    preferredSkills: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'Data Science',
      'Natural Language Processing',
      'Generative AI',
    ],
    description:
      'Applications are invited from distinguished academicians, scholars, and industry specialists for faculty positions in Artificial Intelligence & Machine Learning and related frontier computer science areas. Candidates should possess a passion for pedagogical excellence and high-impact scholarship.',
    isFeatured: true,
  },
  {
    id: 'pos-cyber',
    schoolId: 'school-of-technology',
    cadre: 'Associate Professor / Assistant Professor',
    area: 'Cyber Security & Cloud Infrastructure',
    department: 'Department of Computer Science & Engineering',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Academic Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'Ph.D. or M.Tech in Cyber Security, Cryptography, Information Assurance, or Network Engineering with strong publication record.',
    preferredSkills: [
      'Cryptography',
      'Cloud Architecture',
      'Threat Intelligence',
      'Network Defense',
      'Ethical Hacking',
      'Kubernetes',
    ],
    description:
      'Seeking experienced scholars and practitioners to lead academic instruction and sponsored research in zero-trust cybersecurity, cryptographic protocols, cloud security, and digital forensics.',
  },
  {
    id: 'pos-data-science',
    schoolId: 'school-of-technology',
    cadre: 'Chair Professor / Senior Professor',
    area: 'Data Science & Computational Intelligence',
    department: 'Centre for Advanced Computing & Data Science',
    vacancyCount: 1,
    employmentType: 'Full Time • Professorial Research Chair',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 15, 2026',
    qualificationsOverview:
      'Distinguished Ph.D. with minimum 10 years of post-doctoral collegiate teaching or advanced industrial research with eminent SCI/Scopus citation record.',
    preferredSkills: [
      'Predictive Analytics',
      'Large Language Models',
      'Distributed Systems',
      'Apache Spark',
      'Big Data Engineering',
      'Bioinformatics',
    ],
    description:
      'Endowed professorial chair position for an eminent researcher to steer the Centre for Advanced Computing, mentor doctoral candidates, and anchor national research projects.',
  },
  {
    id: 'pos-robotics',
    schoolId: 'school-of-technology',
    cadre: 'Professor / Associate Professor',
    area: 'Robotics, Automation & Internet of Things (IoT)',
    department: 'Department of Engineering & Applied Technology',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Academic Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'Ph.D. or Master’s in Robotics, Mechatronics, Embedded Electronics, or Instrumentation Engineering with demonstrative lab design credentials.',
    preferredSkills: [
      'Embedded C/C++',
      'ROS 2',
      'Autonomous Systems',
      'Sensors & Actuators',
      'Drone Tech',
      'Industrial IoT',
    ],
    description:
      'Inviting visionary academicians to foster translational pedagogy in autonomous robotic navigation, industrial IoT automation, cyber-physical systems, and collaborative robotics.',
  },

  // School of Humanities, Management & Social Sciences
  {
    id: 'pos-mba-analytics',
    schoolId: 'school-of-humanities',
    cadre: 'Associate Professor / Assistant Professor',
    area: 'Business Analytics & Strategic Management',
    department: 'Department of Management Studies',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Academic Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'Ph.D. in Management / Business Administration or First Class MBA with minimum 5 years teaching/industry analytics experience.',
    preferredSkills: ['R / Python for Business', 'Predictive Modeling', 'Tableau / PowerBI', 'Fintech', 'Supply Chain Analytics'],
    description:
      'Lead MBA coursework and executive workshops in big data decision models, customer analytics, and digital business transformation.',
  },
  {
    id: 'pos-psychology',
    schoolId: 'school-of-humanities',
    cadre: 'Assistant Professor / Clinical Lecturer',
    area: 'Applied & Clinical Psychology',
    department: 'Department of Applied Psychology',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Academic Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 10, 2026',
    qualificationsOverview:
      'Ph.D. or M.Phil / M.Sc. in Clinical / Applied Psychology with RCI registration preferred.',
    preferredSkills: ['Cognitive Assessment', 'Psychometric Testing', 'Behavioural Therapy', 'Research Methodologies'],
    description:
      'Teach undergraduate and postgraduate courses in cognitive psychology and supervise student clinical internships in the university counselling unit.',
  },
  {
    id: 'pos-finance',
    schoolId: 'school-of-humanities',
    cadre: 'Professor / Chair',
    area: 'Corporate Finance & Banking Technology',
    department: 'Department of Commerce & Economics',
    vacancyCount: 1,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'Ph.D. in Commerce / Economics with documented research output in empirical finance or econometric modelling.',
    preferredSkills: ['Financial Econometrics', 'Banking Regulations', 'Investment Analysis', 'Corporate Governance'],
    description:
      'Guide postgraduate researchers and steer industry collaborations in capital markets, financial technology, and international banking.',
  },

  // School of Health Science
  {
    id: 'pos-bpt',
    schoolId: 'school-of-health-science',
    cadre: 'Associate Professor / Assistant Professor',
    area: 'Physiotherapy (Orthopaedics / Sports / Neuro)',
    department: 'Department of Physiotherapy & Rehabilitation',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'MPT (Master of Physiotherapy) in Orthopaedics or Neurology with min 3 years clinical/teaching experience. Ph.D. preferred.',
    preferredSkills: ['Kinesiology', 'Manual Therapy', 'Gait Analysis', 'Sports Rehabilitation', 'Electrophysiology'],
    description:
      'Instruct BPT and MPT students and oversee patient clinical training in the university rehabilitation centre.',
  },
  {
    id: 'pos-bmlt',
    schoolId: 'school-of-health-science',
    cadre: 'Assistant Professor / Lab Director',
    area: 'Medical Laboratory Technology (Biochemistry/Microbiology)',
    department: 'Department of Medical Laboratory Technology',
    vacancyCount: 1,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 05, 2026',
    qualificationsOverview:
      'M.Sc. in MLT or Medical Biochemistry/Microbiology with relevant clinical laboratory supervision experience.',
    preferredSkills: ['Clinical Diagnostics', 'Histopathology', 'Molecular Biology Tests', 'Quality Assurance (NABL)'],
    description:
      'Lead laboratory classes, maintain diagnostic instrument calibration, and mentor students on hospital rotations.',
  },
  {
    id: 'pos-optom',
    schoolId: 'school-of-health-science',
    cadre: 'Assistant Professor / Senior Optometrist',
    area: 'Optometry & Low Vision Care',
    department: 'Department of Optometry',
    vacancyCount: 1,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 15, 2026',
    qualificationsOverview:
      'Master of Optometry (M.Optom) from a recognized university with clinical refraction experience.',
    preferredSkills: ['Contact Lens Fitting', 'Low Vision Aids', 'Ocular Diagnostics', 'Binocular Vision'],
    description:
      'Educate future optometrists and manage community vision screening programs.',
  },

  // School of Agriculture
  {
    id: 'pos-agronomy',
    schoolId: 'school-of-agriculture',
    cadre: 'Professor / Associate Professor',
    area: 'Agronomy & Precision Crop Management',
    department: 'Department of Agronomy',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'Ph.D. in Agronomy with ICAR NET qualified. Proven research in sustainable cropping systems.',
    preferredSkills: ['Precision Agriculture', 'Water Management', 'Crop Modeling', 'Farm Mechanization'],
    description:
      'Oversee field trials on the 30-acre instructional farm, teach B.Sc./M.Sc. Agriculture, and publish in NAAS-rated journals.',
  },
  {
    id: 'pos-horticulture',
    schoolId: 'school-of-agriculture',
    cadre: 'Assistant Professor',
    area: 'Horticulture (Floriculture / Vegetable Science)',
    department: 'Department of Horticulture',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 15, 2026',
    qualificationsOverview:
      'M.Sc. / Ph.D. in Horticulture with ICAR NET.',
    preferredSkills: ['Protected Cultivation', 'Tissue Culture', 'Post-Harvest Technology', 'Landscape Gardening'],
    description:
      'Manage polyhouse crop production and guide practical field modules for undergraduate students.',
  },

  // School of Pharmacy
  {
    id: 'pos-pharmaceutics',
    schoolId: 'school-of-pharmacy',
    cadre: 'Professor / Associate Professor',
    area: 'Pharmaceutics & Novel Drug Delivery',
    department: 'Department of Pharmaceutics',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'Ph.D. in Pharmaceutical Sciences (Pharmaceutics) with minimum 5 years teaching/research and PCI recognized degrees.',
    preferredSkills: ['Nanoparticle Delivery', 'Formulation Design', 'Pharmacokinetics', 'Pilot Plant Operations'],
    description:
      'Spearhead formulation research, mentor M.Pharm/Ph.D. scholars, and maintain PCI compliance in pilot laboratories.',
  },
  {
    id: 'pos-pharmacology',
    schoolId: 'school-of-pharmacy',
    cadre: 'Assistant Professor',
    area: 'Pharmacology & Toxicology',
    department: 'Department of Pharmacology',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 10, 2026',
    qualificationsOverview:
      'M.Pharm / Ph.D. in Pharmacology with animal handling credentials.',
    preferredSkills: ['Preclinical Screening', 'In-Vitro Assays', 'CPCSEA Guidelines', 'Molecular Pharmacology'],
    description:
      'Teach pharmacology and toxicology to B.Pharm and M.Pharm classes and manage animal lab experiments.',
  },

  // School of Marine Science
  {
    id: 'pos-marine-eng',
    schoolId: 'school-of-marine-science',
    cadre: 'Professor / Chief Engineer',
    area: 'Marine Engineering & Heavy Propulsion',
    department: 'Department of Marine Engineering',
    vacancyCount: 2,
    employmentType: 'Full Time • DGS Approved Faculty',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'MEO Class I (Motor) Certificate of Competency with sailing experience as Chief Engineer, plus TSTA / VICT certificate.',
    preferredSkills: ['Marine Diesel Engines', 'Boilers & Steam Systems', 'Auxiliary Machinery', 'DGS Compliance'],
    description:
      'Direct cadet workshop training, operate the Ship-in-Campus facility, and lecture on marine machinery maintenance.',
  },
  {
    id: 'pos-nautical',
    schoolId: 'school-of-marine-science',
    cadre: 'Associate Professor / Master Mariner',
    area: 'Nautical Science & Celestial Navigation',
    department: 'Department of Nautical Science',
    vacancyCount: 1,
    employmentType: 'Full Time • DGS Approved Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 10, 2026',
    qualificationsOverview:
      'Master Mariner (FG) Certificate of Competency with command experience and DGS teaching approval.',
    preferredSkills: ['Bridge Simulation', 'COLREGs', 'Passage Planning', 'Cargo Work & Seamanship'],
    description:
      'Train navigational deck cadets on bridge simulators, ship stability, and global seafaring maritime safety standards.',
  },

  // School of Fisheries Science
  {
    id: 'pos-aquaculture',
    schoolId: 'school-of-fisheries',
    cadre: 'Assistant Professor / Farm Supervisor',
    area: 'Aquaculture & Fish Nutrition',
    department: 'Department of Aquaculture',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 15, 2026',
    qualificationsOverview:
      'M.F.Sc. / Ph.D. in Aquaculture with ICAR NET qualified.',
    preferredSkills: ['Hatchery Management', 'Live Feed Culture', 'Feed Formulation', 'Water Quality Management'],
    description:
      'Manage campus fish breeding ponds and teach seed production technology to undergraduate students.',
  },

  // School of Hospitality & Culinary Arts
  {
    id: 'pos-culinary',
    schoolId: 'school-of-hospitality',
    cadre: 'Chef Instructor / Assistant Professor',
    area: 'Culinary Arts & International Gastronomy',
    department: 'Department of Culinary Arts',
    vacancyCount: 2,
    employmentType: 'Full Time • Regular Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'Degree in Hotel Management / Culinary Arts with minimum 5 years culinary production experience in 5-star properties.',
    preferredSkills: ['Continental & Asian Cuisine', 'Garde Manger', 'Food Hygiene (HACCP)', 'Kitchen Operations'],
    description:
      'Instruct hands-on masterclasses in professional culinary studios and mentor students for national chef competitions.',
  },

  // Institute of Nursing
  {
    id: 'pos-nursing-lecturer',
    schoolId: 'institute-of-nursing',
    cadre: 'Associate Professor / Assistant Professor',
    area: 'Medical-Surgical & Critical Care Nursing',
    department: 'Department of Medical-Surgical Nursing',
    vacancyCount: 3,
    employmentType: 'Full Time • INC Recognized Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'M.Sc. Nursing in Medical-Surgical Nursing with minimum 3 years collegiate teaching experience and WBNC registration.',
    preferredSkills: ['ICU Protocols', 'Clinical Mentorship', 'Simulation Training', 'Nursing Informatics'],
    description:
      'Conduct classroom lectures, clinical simulation drills, and supervise ward postings in affiliated hospitals.',
  },

  // Skill Development
  {
    id: 'pos-skill-trainer',
    schoolId: 'skill-development',
    cadre: 'Technical Specialist / Trainer',
    area: 'Electric Vehicles & Smart Automation',
    department: 'Department of Industrial Automation',
    vacancyCount: 2,
    employmentType: 'Full Time • Technical Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 30, 2026',
    qualificationsOverview:
      'B.Tech / Diploma with certification in EV Powertrain / Industrial Automation and 3+ years workshop experience.',
    preferredSkills: ['Battery Management Systems', 'PLC/SCADA', 'EV Diagnostics', 'Safety Systems'],
    description:
      'Lead apprentice hands-on training for B.Voc students and support industry skill projects.',
  },

  // Administration
  {
    id: 'pos-admin-officer',
    schoolId: 'administration-student-affairs',
    cadre: 'Assistant Registrar / Section Officer',
    area: 'Academic Affairs & Statutory Compliance',
    department: 'Office of the Registrar',
    vacancyCount: 2,
    employmentType: 'Full Time • Administrative Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'March 31, 2026',
    qualificationsOverview:
      'Master’s Degree with at least 55% marks and 5 years administrative experience in a university or higher education institution.',
    preferredSkills: ['University Administration', 'ERP Management', 'Statutory Liaison', 'Drafting & Regulations'],
    description:
      'Support academic council documentation, faculty records, and student affairs administrative workflows.',
  },

  // Marketing & Admissions
  {
    id: 'pos-outreach-mgr',
    schoolId: 'marketing-admissions',
    cadre: 'Manager / Outreach Officer',
    area: 'Institutional Outreach & Academic Counseling',
    department: 'Directorate of Admissions',
    vacancyCount: 1,
    employmentType: 'Full Time • Executive Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 15, 2026',
    qualificationsOverview:
      'MBA or Master’s degree with 4+ years of proven track record in university admissions and student recruitment.',
    preferredSkills: ['Counseling', 'CRM Analytics', 'School Tie-ups', 'Public Relations'],
    description:
      'Lead student engagement drives, school seminars, and academic scholarship counseling across the region.',
    positionType: 'Non-Faculty',
    experienceRequired: '4+ Years',
    minQualification: "Master's Degree / MBA",
    salaryScale: 'Competitive University Scale + Performance Incentives',
  },

  // Technical & Laboratory Cadre
  {
    id: 'pos-lab-tech-ai',
    schoolId: 'school-of-technology',
    cadre: 'Senior Lab Technician / System Administrator',
    area: 'AI GPU Computing & Robotics Lab',
    department: 'Department of Computer Science & Engineering',
    vacancyCount: 2,
    employmentType: 'Full Time • Technical Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 20, 2026',
    qualificationsOverview:
      'B.Tech / BCA / 3-Year Diploma in Computer Science or IT with certifications in Linux administration and GPU cluster maintenance.',
    preferredSkills: ['Linux System Admin', 'NVIDIA CUDA Cluster', 'ROS Environment', 'Network Troubleshooting', 'Lab Equipment Safety'],
    description:
      'Manage high-performance NVIDIA GPU clusters, robotics testbeds, student hardware lab allocations, and software licenses.',
    positionType: 'Lab Technician',
    experienceRequired: '2–5 Years',
    minQualification: "B.Tech / BCA / 3-Year Diploma",
    salaryScale: '7th CPC Technical Grade: Level 6',
    responsibilities: [
      'Supervise daily lab setups for CSE, AI, and Cybersecurity practical sessions.',
      'Maintain cluster hardware, GPU accelerators, and virtual machines for doctoral scholars.',
      'Ensure ISO/NABL safety standards and manage procurement of consumable electronic components.',
    ],
  },
  {
    id: 'pos-lab-tech-pharm',
    schoolId: 'school-of-pharmacy',
    cadre: 'Senior Laboratory Technician',
    area: 'Pharmaceutics & Analytical Chemistry Instrumentation',
    department: 'School of Pharmacy',
    vacancyCount: 2,
    employmentType: 'Full Time • Technical Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 25, 2026',
    qualificationsOverview:
      'D.Pharm / B.Pharm or B.Sc. in Chemistry with experience in HPLC, UV-Spectrophotometer, and dissolution apparatus handling.',
    preferredSkills: ['HPLC Operation', 'Spectroscopy', 'Chemical Inventory', 'PCI Compliance', 'GLP Standards'],
    description:
      'Operate advanced analytical instruments, oversee chemical inventories, and assist faculty in undergraduate pharmaceutical formulations.',
    positionType: 'Lab Technician',
    experienceRequired: '2+ Years',
    minQualification: "D.Pharm / B.Pharm / B.Sc.",
    salaryScale: '7th CPC Technical Grade: Level 5',
    responsibilities: [
      'Calibrate analytical spectrophotometers and chromatography systems regularly.',
      'Maintain hazardous chemical registry and ensure PCI lab inspections compliance.',
      'Prepare reagents and assist students during scheduled laboratory hours.',
    ],
  },
  {
    id: 'pos-lab-tech-marine',
    schoolId: 'school-of-marine-science',
    cadre: 'Workshop Instructor / Simulator Technician',
    area: 'Marine Engine & Ship Simulator Operations',
    department: 'School of Maritime Studies',
    vacancyCount: 1,
    employmentType: 'Full Time • Technical Cadre',
    location: 'The Neotia University, Sarisha Campus',
    status: 'Applications Open',
    deadline: 'April 30, 2026',
    qualificationsOverview:
      'Diploma in Marine Engineering or Mechanical Engineering with Sea-time experience or Ship-in-Campus workshop training.',
    preferredSkills: ['Marine Diesel Engines', 'Pneumatic Controls', 'Lathe/Milling Machines', 'DG Shipping Safety', 'Bridge Simulator'],
    description:
      'Guide B.Tech Marine Engineering cadettes in the operational Ship-in-Campus facility, maintain marine aux engines and full-mission bridge simulator.',
    positionType: 'Lab Technician',
    experienceRequired: '3+ Years',
    minQualification: "Diploma in Marine / Mechanical",
    salaryScale: 'DG Shipping Certified Scale: Level 6',
  },
];
