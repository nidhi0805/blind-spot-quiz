
import { ProfileResult } from "../types/quiz";

export const resultProfiles: Omit<ProfileResult, "score" | "percentage">[] = [
  {
    id: "explorer",
    name: "The Explorer",
    summary: "As an Explorer, you value freedom and new experiences above all else. You're naturally curious, adaptable, and quick-thinking, which helps you navigate complex emotional territory with versatility. However, your desire for autonomy and novelty can sometimes lead to difficulty with commitment or following through when relationships become challenging. You may unconsciously create distance when intimacy feels threatening, or seek stimulation outside your relationships when they become predictable.",
    manipulativeTactics: "Be aware of people who use your need for freedom against you by making you feel trapped or guilty about your independence. Some may intentionally withhold clarity to keep you engaged in their 'mystery,' or create artificial crises that demand your immediate attention and disruption of your plans.",
    defenseStrategies: "Build relationships with those who respect your autonomy while still encouraging healthy commitment. Create clear agreements about space and togetherness. When feeling restless, distinguish between genuine need for space and avoidant tendencies. Practice staying present with difficult emotions rather than seeking distraction.",
    tools: [
      {
        name: "Commitment Compass",
        url: "#commitment-compass"
      },
      {
        name: "Presence Practice",
        url: "#presence-practice"
      }
    ]
  },
  {
    id: "dreamer",
    name: "The Dreamer",
    summary: "As a Dreamer, you possess a rich inner world and remarkable emotional depth. You're intuitive, empathetic, and able to see possibilities others miss. You bring creativity and meaning to your relationships. However, you may sometimes struggle with practical realities, becoming disappointed when people or situations don't match your idealized vision. You might withdraw into fantasy when relationships become difficult, or project qualities onto others that aren't actually there.",
    manipulativeTactics: "Watch for those who exploit your idealism by presenting false or exaggerated personas, making empty promises about the future, or using your empathy to avoid accountability for their actions. Some may strategically deliver just enough to keep your hope alive while never fully committing.",
    defenseStrategies: "Practice grounding yourself in present reality while maintaining your beautiful vision. Develop discernment between potential and consistent patterns. Create a support system of people who appreciate your depth while helping you stay anchored in what's real. Give yourself permission to revise your expectations as you gather new information.",
    tools: [
      {
        name: "Reality Anchoring",
        url: "#reality-anchoring"
      },
      {
        name: "Vision Integration",
        url: "#vision-integration"
      }
    ]
  },
  {
    id: "traditionalist",
    name: "The Traditionalist",
    summary: "As a Traditionalist, you value stability, clear structures, and proven approaches. You're loyal, dependable, and provide a sense of security in relationships. Your attention to established systems and protocols helps create reliable foundations. However, you may sometimes resist necessary changes or become rigid when faced with approaches that challenge your sense of order. You might prioritize rules over emotional needs or judge yourself and others harshly when expectations aren't met.",
    manipulativeTactics: "Be cautious of those who exploit your sense of duty by creating arbitrary rules or expectations they claim you must follow, using appeals to authority or tradition to control your choices, or making you feel deviant for questioning established norms that may actually be unhealthy.",
    defenseStrategies: "Distinguish between principled values and rigid rules. Practice flexibility with non-essential matters while maintaining your core principles. Surround yourself with people who respect tradition but remain open to growth and adaptation. Remember that healthy relationships evolve while preserving their foundation.",
    tools: [
      {
        name: "Flexible Boundaries",
        url: "#flexible-boundaries"
      },
      {
        name: "Value Clarification",
        url: "#value-clarification"
      }
    ]
  },
  {
    id: "intellectual",
    name: "The Intellectual",
    summary: "As an Intellectual, you approach relationships with thoughtful analysis and a desire for clarity. You're perceptive, articulate, and excellent at identifying patterns and solving problems. Your rational approach helps navigate complexity with precision. However, you may sometimes over-analyze emotions or retreat into theoretical understanding when feelings become overwhelming. You might prioritize being right over emotional connection or use knowledge to create distance.",
    manipulativeTactics: "Watch for those who weaponize intellectualism through techniques like gaslighting your perceptions, using circular arguments that exhaust you into submission, overwhelming you with irrelevant information, or making you feel intellectually inferior for having normal emotional responses.",
    defenseStrategies: "Practice integrating your analytical gifts with emotional intelligence. Recognize when thinking becomes a defense against feeling. Cultivate relationships with those who appreciate your insights while helping you stay connected to emotional wisdom. Remember that understanding is only part of relating—presence and empathy are equally important.",
    tools: [
      {
        name: "Emotion Recognition",
        url: "#emotion-recognition"
      },
      {
        name: "Integrated Intelligence",
        url: "#integrated-intelligence"
      }
    ]
  },
  {
    id: "achiever",
    name: "The Achiever",
    summary: "As an Achiever, you approach relationships with dedication, focus, and a drive for growth. You're responsible, goal-oriented, and committed to improvement. Your ambition and work ethic can inspire those around you to reach higher. However, you may sometimes measure relationship success by external benchmarks or become frustrated when outcomes aren't easily quantifiable. You might inadvertently create pressure through high expectations or struggle to simply be present without working on something.",
    manipulativeTactics: "Be alert to those who exploit your performance orientation by constantly moving goalposts, comparing you unfavorably to others to motivate greater effort, creating artificial competitions for their attention, or only showing approval when you're achieving for them.",
    defenseStrategies: "Practice valuing presence and connection as achievements in themselves. Distinguish between healthy growth and perfectionistic striving in relationships. Build connections with those who appreciate your ambition while helping you embrace rest and acceptance. Remember that your worth isn't determined by your output or continuous improvement.",
    tools: [
      {
        name: "Presence Practice",
        url: "#presence-practice"
      },
      {
        name: "Worth Reclamation",
        url: "#worth-reclamation"
      }
    ]
  },
  {
    id: "peacemaker",
    name: "The Peacemaker",
    summary: "As a Peacemaker, you bring harmony, consideration, and diplomacy to your relationships. You're naturally empathetic, patient, and skilled at seeing multiple perspectives. Your inclusive approach helps create environments where everyone feels valued. However, you may sometimes avoid necessary conflict or silence your own needs to maintain external peace. You might struggle to take definitive positions when required or become passive-aggressive when unexpressed needs build up.",
    manipulativeTactics: "Watch for those who exploit your harmony-seeking nature by creating false emergencies that require your mediation, threatening withdrawal or conflict if you don't comply with their wishes, or positioning normal boundary-setting as selfish or disruptive to group harmony.",
    defenseStrategies: "Recognize that true peace includes honoring your own needs and sometimes engaging in necessary conflict. Practice expressing disagreement in small, low-stakes situations to build your capacity. Surround yourself with those who value harmony but also encourage your authentic voice. Remember that healthy relationships can withstand temporary discord.",
    tools: [
      {
        name: "Boundary Builder",
        url: "#boundary-builder"
      },
      {
        name: "Authentic Voice",
        url: "#authentic-voice"
      }
    ]
  },
  {
    id: "caregiver",
    name: "The Caregiver",
    summary: "As a Caregiver, you bring nurturing attention, emotional support, and practical assistance to your relationships. You're naturally attuned to others' needs, compassionate, and skilled at creating safety. Your generous spirit helps people feel valued and cared for. However, you may sometimes neglect your own needs or derive too much of your identity from helping others. You might struggle with receiving care or inadvertently enable unhealthy dynamics by over-functioning.",
    manipulativeTactics: "Be cautious of those who exploit your nurturing tendencies through exaggerated helplessness, manufactured crises that only you can solve, subtle guilt trips when you practice self-care, or positioning their emotional regulation as your responsibility.",
    defenseStrategies: "Practice applying your remarkable care to yourself with the same dedication you offer others. Learn to distinguish between genuine needs and manipulation. Build reciprocal relationships where care flows both ways. Remember that true caregiving empowers others rather than creating dependency.",
    tools: [
      {
        name: "Self-Nurturing",
        url: "#self-nurturing"
      },
      {
        name: "Reciprocity Reset",
        url: "#reciprocity-reset"
      }
    ]
  },
  {
    id: "leader",
    name: "The Leader",
    summary: "As a Leader, you bring direction, confidence, and protection to your relationships. You're naturally decisive, responsible, and skilled at taking charge when needed. Your strength helps create clarity and safety for those around you. However, you may sometimes take control in situations where collaboration would be more effective, or struggle when you need to show vulnerability. You might find it difficult to receive feedback or inadvertently overpower quieter voices.",
    manipulativeTactics: "Watch for those who exploit your protective nature by presenting artificial threats they'll save you from, creating unnecessary power struggles to drain your energy, using flattery to bypass your critical thinking, or making you feel weak for normal human limitations or emotions.",
    defenseStrategies: "Practice the strength that comes through vulnerability and shared power. Distinguish between situations requiring your direction and those calling for support from the sidelines. Build relationships with those who respect your strength while helping you make space for softness. Remember that influence flows from connection, not just direction.",
    tools: [
      {
        name: "Vulnerable Strength",
        url: "#vulnerable-strength"
      },
      {
        name: "Collaborative Power",
        url: "#collaborative-power"
      }
    ]
  },
  {
    id: "rebel",
    name: "The Rebel",
    summary: "As a Rebel, you bring authenticity, courage, and transformation to your relationships. You're naturally honest, energetic, and skilled at challenging stagnant patterns. Your questioning spirit helps prevent complacency and promotes growth. However, you may sometimes resist even healthy structures or oppose others reflexively. You might struggle with sustained compromise or create unnecessary conflict when feeling constrained.",
    manipulativeTactics: "Be alert to those who exploit your independence through false claims of persecution needing your defense, creating 'us-against-them' narratives that isolate you, using reverse psychology to control your choices, or making you feel conformist for seeking stability or peace.",
    defenseStrategies: "Practice distinguishing between authentic resistance and habitual opposition. Channel your transformative energy into creating alternatives rather than just rejecting what exists. Build relationships with those who appreciate your honesty while helping you discern which battles truly matter. Remember that true freedom includes the ability to commit and cooperate.",
    tools: [
      {
        name: "Constructive Challenge",
        url: "#constructive-challenge"
      },
      {
        name: "Discernment Development",
        url: "#discernment-development"
      }
    ]
  }
];

// Initialize profiles with zero scores
export const initializeProfileResults = (): ProfileResult[] => {
  return resultProfiles.map(profile => ({
    ...profile,
    score: 0,
    percentage: 0
  }));
};

// Find top profiles based on scores
export const getDominantProfiles = (profiles: ProfileResult[], count: number = 2): ProfileResult[] => {
  return [...profiles].sort((a, b) => b.score - a.score).slice(0, count);
};
