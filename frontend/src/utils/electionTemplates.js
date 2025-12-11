// Election Templates for Quick Setup

export const electionTemplates = [
  {
    id: 'presidential',
    name: 'Presidential Election',
    description: 'Template for presidential or national leadership elections',
    icon: '🏛️',
    type: 'national',
    settings: {
      title: 'Presidential Election 2024',
      description: 'National presidential election to elect the next president',
      type: 'national',
      votingMethod: 'single-choice',
      allowsAbstain: false,
      requiresVerification: true,
      minCandidates: 2,
      suggestedDuration: 30, // days
    },
    candidateFields: [
      { name: 'name', label: 'Candidate Name', required: true },
      { name: 'party', label: 'Political Party', required: true },
      { name: 'runningMate', label: 'Running Mate', required: false },
      { name: 'manifesto', label: 'Campaign Manifesto', required: true },
    ],
  },
  {
    id: 'parliamentary',
    name: 'Parliamentary Election',
    description: 'Template for parliamentary or legislative elections',
    icon: '🏢',
    type: 'national',
    settings: {
      title: 'Parliamentary Election 2024',
      description: 'Election for parliamentary representatives',
      type: 'national',
      votingMethod: 'single-choice',
      allowsAbstain: true,
      requiresVerification: true,
      minCandidates: 3,
      suggestedDuration: 30,
    },
    candidateFields: [
      { name: 'name', label: 'Candidate Name', required: true },
      { name: 'party', label: 'Political Party', required: true },
      { name: 'constituency', label: 'Constituency', required: true },
      { name: 'manifesto', label: 'Manifesto', required: true },
    ],
  },
  {
    id: 'local',
    name: 'Local Election',
    description: 'Template for city, county, or municipal elections',
    icon: '🏘️',
    type: 'local',
    settings: {
      title: 'City Council Election',
      description: 'Election for local city council representatives',
      type: 'local',
      votingMethod: 'single-choice',
      allowsAbstain: true,
      requiresVerification: true,
      minCandidates: 2,
      suggestedDuration: 14,
    },
    candidateFields: [
      { name: 'name', label: 'Candidate Name', required: true },
      { name: 'ward', label: 'Ward/District', required: true },
      { name: 'platform', label: 'Campaign Platform', required: true },
    ],
  },
  {
    id: 'organizational',
    name: 'Organizational Election',
    description: 'Template for company, club, or organization elections',
    icon: '🏢',
    type: 'organizational',
    settings: {
      title: 'Board of Directors Election',
      description: 'Annual election for board of directors',
      type: 'organizational',
      votingMethod: 'multiple-choice',
      allowsAbstain: true,
      requiresVerification: false,
      minCandidates: 3,
      suggestedDuration: 7,
    },
    candidateFields: [
      { name: 'name', label: 'Candidate Name', required: true },
      { name: 'position', label: 'Position', required: true },
      { name: 'bio', label: 'Biography', required: true },
    ],
  },
  {
    id: 'referendum',
    name: 'Referendum/Poll',
    description: 'Template for yes/no questions or policy decisions',
    icon: '📊',
    type: 'referendum',
    settings: {
      title: 'Policy Referendum',
      description: 'Vote on proposed policy change',
      type: 'referendum',
      votingMethod: 'yes-no',
      allowsAbstain: true,
      requiresVerification: false,
      minCandidates: 2, // Yes/No options
      suggestedDuration: 14,
    },
    candidateFields: [
      { name: 'option', label: 'Option', required: true },
      { name: 'description', label: 'Description', required: true },
    ],
  },
  {
    id: 'student',
    name: 'Student Election',
    description: 'Template for student government or class elections',
    icon: '🎓',
    type: 'educational',
    settings: {
      title: 'Student Council Election',
      description: 'Annual student council election',
      type: 'educational',
      votingMethod: 'single-choice',
      allowsAbstain: false,
      requiresVerification: true,
      minCandidates: 2,
      suggestedDuration: 3,
    },
    candidateFields: [
      { name: 'name', label: 'Student Name', required: true },
      { name: 'grade', label: 'Grade/Year', required: true },
      { name: 'platform', label: 'Campaign Platform', required: true },
    ],
  },
  {
    id: 'community',
    name: 'Community Poll',
    description: 'Template for community decisions or surveys',
    icon: '👥',
    type: 'community',
    settings: {
      title: 'Community Decision Poll',
      description: 'Community vote on local issue',
      type: 'community',
      votingMethod: 'single-choice',
      allowsAbstain: true,
      requiresVerification: false,
      minCandidates: 2,
      suggestedDuration: 7,
    },
    candidateFields: [
      { name: 'option', label: 'Option', required: true },
      { name: 'details', label: 'Details', required: true },
    ],
  },
  {
    id: 'custom',
    name: 'Custom Election',
    description: 'Start from scratch with a blank template',
    icon: '⚙️',
    type: 'custom',
    settings: {
      title: '',
      description: '',
      type: 'custom',
      votingMethod: 'single-choice',
      allowsAbstain: false,
      requiresVerification: false,
      minCandidates: 2,
      suggestedDuration: 7,
    },
    candidateFields: [
      { name: 'name', label: 'Candidate Name', required: true },
      { name: 'description', label: 'Description', required: true },
    ],
  },
];

export const getTemplateById = (id) => {
  return electionTemplates.find(template => template.id === id);
};

export const getTemplatesByType = (type) => {
  return electionTemplates.filter(template => template.type === type);
};
