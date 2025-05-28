
// MBTI to FIA Victim Clusters mapping based on the Excel data
export interface MBTIProfile {
  code: string;
  nickname: string;
  caregiver: number;
  peacemaker: number;
  achiever: number;
  rebel: number;
  intellectual: number;
  dreamer: number;
  leader: number;
  explorer: number;
  traditionalist: number;
  reasoning: string;
}

export const mbtiProfiles: MBTIProfile[] = [
  {
    code: "INFJ",
    nickname: "The Advocate: Idealistic, insightful, and principled.",
    caregiver: 0.2,
    peacemaker: 0.2,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0.6,
    leader: 0,
    explorer: 0,
    traditionalist: 0,
    reasoning: "INFJs are deeply idealistic and emotionally intense, aligning them most strongly with the Dreamer (60%). Like Dreamers, they're guided by meaning, vulnerable to disillusionment, and often targeted through moral or visionary manipulation. They share the empathy and guilt-proneness of the Caregiver (20%) but help selectively, not compulsively—making them less easily entrapped through dependency loops. They resemble Peacemakers (20%) in their conflict avoidance and desire for harmony, but unlike Peacemakers, INFJs will eventually assert themselves when core values are violated."
  },
  {
    code: "INFP",
    nickname: "The Mediator: Empathetic, imaginative, and guided by values.",
    caregiver: 0.1,
    peacemaker: 0.1,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0.8,
    leader: 0,
    explorer: 0,
    traditionalist: 0,
    reasoning: "INFPs are not weak—they're vulnerable because they trust too deeply and symbolize too fast. Their inner world is emotionally sacred, and if someone breaches it, they get stuck in the meaning of the pain. They are high-trust, low-boundary, high-symbolic reasoning, not people-pleasing or guilt response (which is more Caregiver)."
  },
  {
    code: "ENFJ",
    nickname: "The Protagonist: Charismatic, inspiring, and altruistic.",
    caregiver: 0.5,
    peacemaker: 0.2,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0,
    leader: 0.3,
    explorer: 0,
    traditionalist: 0,
    reasoning: "ENFJs are emotionally intelligent visionaries, with a core vulnerability to over-functioning for others' emotional needs. They seek purpose through people, need to feel emotionally impactful, and are susceptible to being groomed into leadership, trapped in toxic mentorships, or emotionally manipulated via responsibility and praise."
  },
  {
    code: "ENFP",
    nickname: "The Campaigner: Enthusiastic, creative, and people-oriented.",
    caregiver: 0.1,
    peacemaker: 0,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0.6,
    leader: 0,
    explorer: 0.3,
    traditionalist: 0,
    reasoning: "Emotionally impulsive, trusting, and symbolic thinkers. Vulnerable to fast emotional entanglements, charismatic manipulators, and meaning-bait. Not passive or submissive—but emotionally combustible, which makes them emotionally exploitable. They will see the warning signs, but override them for the feeling of resonance."
  },
  {
    code: "INTJ",
    nickname: "The Architect: Strategic, logical, and independent.",
    caregiver: 0.05,
    peacemaker: 0,
    achiever: 0.25,
    rebel: 0.1,
    intellectual: 0.6,
    dreamer: 0,
    leader: 0,
    explorer: 0,
    traditionalist: 0,
    reasoning: "INTJs are primarily Intellectuals—not because they're emotionless, but because they interpret the world through abstract systems and reason rather than through relational or emotional cues. They are part Achiever, especially in work and purpose. They are minimally Rebel, and rarely Caregiver, unless overcorrecting for a perceived emotional gap."
  },
  {
    code: "INTP",
    nickname: "The Logician: Analytical, curious, and inventive.",
    caregiver: 0,
    peacemaker: 0,
    achiever: 0,
    rebel: 0.2,
    intellectual: 0.65,
    dreamer: 0,
    leader: 0,
    explorer: 0.15,
    traditionalist: 0,
    reasoning: "INTPs are archetypal Intellectuals, drawn to complexity, novelty, and contradiction. They are closet Rebels—not because they need to fight, but because they innately distrust hierarchy, tradition, and groupthink. They are not driven by caregiving, nor motivated by performance."
  },
  {
    code: "ENTJ",
    nickname: "The Commander: Bold, efficient, and leadership-oriented.",
    caregiver: 0,
    peacemaker: 0,
    achiever: 0.2,
    rebel: 0,
    intellectual: 0.1,
    dreamer: 0,
    leader: 0.7,
    explorer: 0,
    traditionalist: 0,
    reasoning: "ENTJs are Achievers first, Strategists second. They live in the world of execution and power, and they expect others to keep up or get out of the way. Their greatest vulnerabilities are around control, pride, and overextension. When unhealthy, they may dominate, overstep, or manipulate for outcomes—not emotional cruelty, but agenda-pushing."
  },
  {
    code: "ENTP",
    nickname: "The Debater: Energetic, curious, and love to argue ideas.",
    caregiver: 0,
    peacemaker: 0,
    achiever: 0,
    rebel: 0.6,
    intellectual: 0,
    dreamer: 0,
    leader: 0.1,
    explorer: 0.3,
    traditionalist: 0,
    reasoning: "ENTPs are dynamic, unorthodox idea-movers who use charm, novelty, and argument to shape the world. They are most vulnerable to manipulation through praise, flattery, or mystery, and can become manipulative when emotionally bored or opportunistic. They are not grounded caregivers or consistent builders—they're energetic starters, charismatic rebels, and idea-storming forces of nature."
  },
  {
    code: "ISTJ",
    nickname: "The Logistician: Responsible, orderly, and dutiful.",
    caregiver: 0,
    peacemaker: 0,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0,
    leader: 0.15,
    explorer: 0.05,
    traditionalist: 0.8,
    reasoning: "The ISTJ is the Guardian of Structure—principled, precise, and quietly self-sufficient. Their greatest vulnerability lies in rigidity, emotional repression, and discomfort with ambiguity, which can make them susceptible to burnout or moral injury in unstable or manipulative environments. They thrive where rules are clear, roles are defined, and effort is rewarded with respect."
  },
  {
    code: "ISFJ",
    nickname: "The Defender: Loyal, warm, and detail-focused.",
    caregiver: 0.5,
    peacemaker: 0.1,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0,
    leader: 0,
    explorer: 0,
    traditionalist: 0.4,
    reasoning: "ISFJs are almost entirely Caregiver types, with a deep vulnerability to enmeshment and guilt-traps, over-functioning in systems, and conflict avoidance that keeps them in harm. They show minor Achiever traits through overwork and moral striving, but rarely value status or visibility. Their Intellectual and Rebel traits are minimal—present only in defense of others or internal reflection, not in dominant motivation or self-concept."
  },
  {
    code: "ESTJ",
    nickname: "The Executive: Organized, traditional, and managerial.",
    caregiver: 0,
    peacemaker: 0,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0,
    leader: 0.6,
    explorer: 0.5,
    traditionalist: 0.35,
    reasoning: "ESTJs are structure-first, control-oriented performers who thrive in environments that reward stability, loyalty, and results. They are reliable and principled—but often rigid, emotionally unavailable, and dismissive of nuance. Their main risks are coercion through hierarchy, emotional invalidation, and inflexibility that harms relationships."
  },
  {
    code: "ESFJ",
    nickname: "The Consul: Caring, sociable, and status-conscious.",
    caregiver: 0.5,
    peacemaker: 0.15,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0,
    leader: 0,
    explorer: 0,
    traditionalist: 0.35,
    reasoning: "ESFJs are socially sensitive, emotionally attuned caretakers who thrive when harmony is high and roles are clear. Their vulnerability lies in over-giving, guilt-traps, and emotional burnout—especially if their care is not appreciated or reciprocated. When unhealthy, they may become emotionally manipulative through guilt, pressure to conform, or subtle social control."
  },
  {
    code: "ISTP",
    nickname: "The Virtuoso: Hands-on, independent, and adventurous.",
    caregiver: 0.15,
    peacemaker: 0,
    achiever: 0.2,
    rebel: 0.4,
    intellectual: 0.25,
    dreamer: 0,
    leader: 0,
    explorer: 0,
    traditionalist: 0,
    reasoning: "ISTPs are autonomous, action-driven, and emotionally minimal. When healthy, they are competent, calm, and protective. When unhealthy, they become emotionally absent, impulsive, and boundary-indifferent, often leaving partners confused or lonely. Vulnerable not to charm-based manipulation, but to emotional misattunement and avoidance of responsibility."
  },
  {
    code: "ISFP",
    nickname: "The Adventurer: Quiet, artistic, and flexible.",
    caregiver: 0.4,
    peacemaker: 0,
    achiever: 0.2,
    rebel: 0.2,
    intellectual: 0.2,
    dreamer: 0,
    leader: 0,
    explorer: 0,
    traditionalist: 0,
    reasoning: "ISFPs are gentle, emotionally rich individuals with deep empathy and strong personal values. When healthy, they are loving, loyal, and quietly expressive. When unhealthy, they are prone to self-erasure, emotional collapse, or enabling harmful dynamics in the name of harmony or belonging. Vulnerable to manipulators who frame coercion as intimacy or exploit their guilt, empathy, or yearning to be seen."
  },
  {
    code: "ESTP",
    nickname: "The Entrepreneur: Bold, direct, and action-driven.",
    caregiver: 0,
    peacemaker: 0,
    achiever: 0,
    rebel: 0,
    intellectual: 0,
    dreamer: 0,
    leader: 0.4,
    explorer: 0.5,
    traditionalist: 0.1,
    reasoning: "ESTPs are fast, charismatic, and risk-tolerant players. When healthy, they are grounded, decisive, and fiercely loyal through action. When unhealthy, they are impulsive, dominating, and prone to boundary-pushing and emotional avoidance. They are most vulnerable to overconfidence, stimulation addiction, and exploiting others to maintain momentum or image."
  },
  {
    code: "ESFP",
    nickname: "The Entertainer: Energetic, spontaneous, and fun-loving.",
    caregiver: 0.35,
    peacemaker: 0,
    achiever: 0.2,
    rebel: 0.25,
    intellectual: 0.2,
    dreamer: 0,
    leader: 0,
    explorer: 0,
    traditionalist: 0,
    reasoning: "ESFPs are emotionally rich, highly expressive, and people-focused. When healthy, they are vibrant, loving, and deeply present. When unhealthy, they are impulsive, over-attached, emotionally intense, and vulnerable to being used—or using others—through emotional expression. They are most at risk in fast-moving, emotionally immersive relationships, where boundaries erode and emotional chaos is mistaken for connection."
  }
];

export interface VictimProfile {
  id: string;
  name: string;
  percentage: number;
}

// Function to map MBTI type to top 2 victim profiles
export const mapMBTIToVictimProfiles = (mbtiCode: string): VictimProfile[] => {
  const profile = mbtiProfiles.find(p => p.code === mbtiCode);
  
  if (!profile) {
    throw new Error(`MBTI type ${mbtiCode} not found`);
  }

  // Create array of victim types with their percentages
  const victimTypes = [
    { id: 'caregiver', name: 'The Caregiver', percentage: Math.round(profile.caregiver * 100) },
    { id: 'peacemaker', name: 'The Peacemaker', percentage: Math.round(profile.peacemaker * 100) },
    { id: 'achiever', name: 'The Achiever', percentage: Math.round(profile.achiever * 100) },
    { id: 'rebel', name: 'The Rebel', percentage: Math.round(profile.rebel * 100) },
    { id: 'intellectual', name: 'The Intellectual', percentage: Math.round(profile.intellectual * 100) },
    { id: 'dreamer', name: 'The Dreamer', percentage: Math.round(profile.dreamer * 100) },
    { id: 'leader', name: 'The Leader', percentage: Math.round(profile.leader * 100) },
    { id: 'explorer', name: 'The Explorer', percentage: Math.round(profile.explorer * 100) },
    { id: 'traditionalist', name: 'The Traditionalist', percentage: Math.round(profile.traditionalist * 100) }
  ];

  // Sort by percentage (descending) and return top 2
  return victimTypes
    .filter(vt => vt.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 2);
};

// Function to get MBTI options for dropdown
export const getMBTIOptions = () => {
  return mbtiProfiles.map(profile => ({
    value: profile.code,
    label: `${profile.code} - ${profile.nickname.split(':')[0]}`
  }));
};

// Function to get MBTI reasoning
export const getMBTIReasoning = (mbtiCode: string): string => {
  const profile = mbtiProfiles.find(p => p.code === mbtiCode);
  return profile ? profile.reasoning : '';
};
