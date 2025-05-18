
import { Question } from "../types/quiz";

export const quizQuestions: Question[] = [
  {
    id: "q1",
    text: "When someone you care about seems upset with you, what's your first reaction?",
    type: "single-select",
    answers: [
      {
        id: "q1a1",
        text: "Ask them directly what's wrong",
        profileWeights: [
          { profile: "leader", weight: 3 },
          { profile: "explorer", weight: 2 }
        ]
      },
      {
        id: "q1a2",
        text: "Analyze their behavior to figure out the issue",
        profileWeights: [
          { profile: "intellectual", weight: 3 },
          { profile: "dreamer", weight: 1 }
        ]
      },
      {
        id: "q1a3",
        text: "Give them space and wait for them to come to you",
        profileWeights: [
          { profile: "peacemaker", weight: 3 },
          { profile: "traditionalist", weight: 2 }
        ]
      },
      {
        id: "q1a4",
        text: "Worry about what you might have done wrong",
        profileWeights: [
          { profile: "caregiver", weight: 3 },
          { profile: "dreamer", weight: 1 }
        ]
      },
      {
        id: "q1a5",
        text: "Focus on fixing the situation quickly",
        profileWeights: [
          { profile: "achiever", weight: 3 },
          { profile: "leader", weight: 1 }
        ]
      }
    ]
  },
  {
    id: "q2",
    text: "Which of these statements do you find yourself thinking most often in relationships? (Select all that apply)",
    type: "multi-select",
    answers: [
      {
        id: "q2a1",
        text: "\"I need to make sure they're happy.\"",
        profileWeights: [
          { profile: "caregiver", weight: 2 },
          { profile: "peacemaker", weight: 1 }
        ]
      },
      {
        id: "q2a2",
        text: "\"I wish they would understand my perspective.\"",
        profileWeights: [
          { profile: "intellectual", weight: 2 },
          { profile: "dreamer", weight: 1 }
        ]
      },
      {
        id: "q2a3",
        text: "\"I need more freedom in this relationship.\"",
        profileWeights: [
          { profile: "rebel", weight: 2 },
          { profile: "explorer", weight: 2 }
        ]
      },
      {
        id: "q2a4",
        text: "\"I know what's best for this situation.\"",
        profileWeights: [
          { profile: "leader", weight: 2 },
          { profile: "traditionalist", weight: 1 }
        ]
      },
      {
        id: "q2a5",
        text: "\"If I just work harder at this, everything will be fine.\"",
        profileWeights: [
          { profile: "achiever", weight: 3 },
          { profile: "peacemaker", weight: 1 }
        ]
      }
    ]
  },
  {
    id: "q3",
    text: "How often do you find yourself prioritizing others' needs over your own?",
    type: "slider",
    min: 0,
    max: 10,
    minLabel: "Rarely",
    maxLabel: "Almost always",
    profileWeights: [
      { profile: "caregiver", weight: 0.3 },
      { profile: "peacemaker", weight: 0.3 },
      { profile: "rebel", weight: -0.2 },
      { profile: "leader", weight: -0.2 }
    ]
  },
  {
    id: "q4",
    text: "Which image best represents how you feel in emotionally complex moments?",
    type: "image-select",
    answers: [
      {
        id: "q4a1",
        text: "A person standing on a mountaintop looking at the horizon",
        imageSrc: "/placeholder.svg",
        profileWeights: [
          { profile: "explorer", weight: 3 },
          { profile: "dreamer", weight: 2 }
        ]
      },
      {
        id: "q4a2",
        text: "A person organizing books on a shelf",
        imageSrc: "/placeholder.svg",
        profileWeights: [
          { profile: "intellectual", weight: 3 },
          { profile: "traditionalist", weight: 2 }
        ]
      },
      {
        id: "q4a3",
        text: "People holding hands in a circle",
        imageSrc: "/placeholder.svg",
        profileWeights: [
          { profile: "caregiver", weight: 3 },
          { profile: "peacemaker", weight: 2 }
        ]
      },
      {
        id: "q4a4",
        text: "A person climbing a ladder",
        imageSrc: "/placeholder.svg",
        profileWeights: [
          { profile: "achiever", weight: 3 },
          { profile: "leader", weight: 2 }
        ]
      }
    ]
  },
  {
    id: "q5",
    text: "When someone challenges your perspective, you typically:",
    type: "single-select",
    answers: [
      {
        id: "q5a1",
        text: "Listen and consider their viewpoint",
        profileWeights: [
          { profile: "peacemaker", weight: 3 },
          { profile: "intellectual", weight: 2 }
        ]
      },
      {
        id: "q5a2",
        text: "Defend your position with facts and logic",
        profileWeights: [
          { profile: "intellectual", weight: 3 },
          { profile: "leader", weight: 1 }
        ]
      },
      {
        id: "q5a3",
        text: "Feel hurt but avoid showing it",
        profileWeights: [
          { profile: "dreamer", weight: 3 },
          { profile: "caregiver", weight: 1 }
        ]
      },
      {
        id: "q5a4",
        text: "Push back strongly",
        profileWeights: [
          { profile: "rebel", weight: 3 },
          { profile: "achiever", weight: 1 }
        ]
      },
      {
        id: "q5a5",
        text: "Refer to what has worked in the past",
        profileWeights: [
          { profile: "traditionalist", weight: 3 },
          { profile: "caregiver", weight: 1 }
        ]
      }
    ]
  },
  {
    id: "q6",
    text: "Which of these patterns do you notice in your relationships? (Select all that apply)",
    type: "multi-select",
    answers: [
      {
        id: "q6a1",
        text: "You're often seen as the stable, reliable one",
        profileWeights: [
          { profile: "traditionalist", weight: 2 },
          { profile: "caregiver", weight: 2 }
        ]
      },
      {
        id: "q6a2",
        text: "You find yourself getting bored with routines",
        profileWeights: [
          { profile: "explorer", weight: 3 },
          { profile: "rebel", weight: 1 }
        ]
      },
      {
        id: "q6a3",
        text: "You often mediate conflicts",
        profileWeights: [
          { profile: "peacemaker", weight: 3 },
          { profile: "leader", weight: 1 }
        ]
      },
      {
        id: "q6a4",
        text: "You set high standards for yourself and others",
        profileWeights: [
          { profile: "achiever", weight: 3 },
          { profile: "intellectual", weight: 1 }
        ]
      },
      {
        id: "q6a5",
        text: "You spend a lot of time imagining ideal scenarios",
        profileWeights: [
          { profile: "dreamer", weight: 3 },
          { profile: "explorer", weight: 1 }
        ]
      }
    ]
  },
  {
    id: "q7",
    text: "How comfortable are you with expressing your needs directly?",
    type: "slider",
    min: 0,
    max: 10,
    minLabel: "Very uncomfortable",
    maxLabel: "Very comfortable",
    profileWeights: [
      { profile: "leader", weight: 0.3 },
      { profile: "rebel", weight: 0.2 },
      { profile: "caregiver", weight: -0.2 },
      { profile: "peacemaker", weight: -0.3 }
    ]
  },
  {
    id: "q8",
    text: "When making important decisions, you primarily rely on:",
    type: "single-select",
    answers: [
      {
        id: "q8a1",
        text: "Careful analysis of all information",
        profileWeights: [
          { profile: "intellectual", weight: 3 },
          { profile: "achiever", weight: 1 }
        ]
      },
      {
        id: "q8a2",
        text: "Your intuition and feelings about the situation",
        profileWeights: [
          { profile: "dreamer", weight: 3 },
          { profile: "explorer", weight: 1 }
        ]
      },
      {
        id: "q8a3",
        text: "Consideration of everyone involved",
        profileWeights: [
          { profile: "caregiver", weight: 3 },
          { profile: "peacemaker", weight: 2 }
        ]
      },
      {
        id: "q8a4",
        text: "What has proven successful in the past",
        profileWeights: [
          { profile: "traditionalist", weight: 3 },
          { profile: "achiever", weight: 1 }
        ]
      },
      {
        id: "q8a5",
        text: "Your own judgment and experience",
        profileWeights: [
          { profile: "leader", weight: 3 },
          { profile: "rebel", weight: 1 }
        ]
      }
    ]
  },
  {
    id: "q9",
    text: "What drains your emotional energy the most? (Select all that apply)",
    type: "multi-select",
    answers: [
      {
        id: "q9a1",
        text: "Conflict and confrontation",
        profileWeights: [
          { profile: "peacemaker", weight: 2 },
          { profile: "caregiver", weight: 1 }
        ]
      },
      {
        id: "q9a2",
        text: "Rigid rules and expectations",
        profileWeights: [
          { profile: "rebel", weight: 3 },
          { profile: "explorer", weight: 2 }
        ]
      },
      {
        id: "q9a3",
        text: "Disorder and uncertainty",
        profileWeights: [
          { profile: "traditionalist", weight: 3 },
          { profile: "intellectual", weight: 1 }
        ]
      },
      {
        id: "q9a4",
        text: "Not being heard or valued",
        profileWeights: [
          { profile: "leader", weight: 2 },
          { profile: "achiever", weight: 2 }
        ]
      },
      {
        id: "q9a5",
        text: "Practical demands interfering with your vision",
        profileWeights: [
          { profile: "dreamer", weight: 3 },
          { profile: "explorer", weight: 1 }
        ]
      }
    ]
  },
  {
    id: "q10",
    text: "How often do you find yourself adapting your behavior to maintain harmony?",
    type: "slider",
    min: 0,
    max: 10,
    minLabel: "Rarely",
    maxLabel: "Almost always",
    profileWeights: [
      { profile: "peacemaker", weight: 0.4 },
      { profile: "caregiver", weight: 0.3 },
      { profile: "rebel", weight: -0.3 },
      { profile: "leader", weight: -0.2 }
    ]
  }
];

export const ageRangeOptions = [
  { value: "18-24", label: "18-24" },
  { value: "25-34", label: "25-34" },
  { value: "35-44", label: "35-44" },
  { value: "45-54", label: "45-54" },
  { value: "55+", label: "55+" }
];

export const genderOptions = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "nonbinary", label: "Non-binary / Gender-expansive" },
  { value: "prefer-not-to-say", label: "Prefer not to say" }
];

export const relationshipOptions = [
  { value: "single", label: "Single" },
  { value: "in-relationship", label: "In a relationship" },
  { value: "married", label: "Married" },
  { value: "situationship", label: "Situationship" },
  { value: "divorced-separated", label: "Divorced/Separated" },
  { value: "its-complicated", label: "It's complicated" }
];

export const preTraitsOptions = [
  { value: "people-please", label: "I people-please" },
  { value: "avoid-conflict", label: "I avoid conflict" },
  { value: "dissociate", label: "I dissociate under stress" },
  { value: "replay-conversations", label: "I replay conversations" },
  { value: "guilty-boundaries", label: "I feel guilty setting boundaries" }
];
