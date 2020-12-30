export const STAGES = {
  setup: "setup",
  tutorial: "tutorial",
  helpdesk: "helpdesk",
  review: "review",
};

export const MAX_EXPERIENCE = 100;
export const DAY_LENGTH = 120000; // 2 minutes
export const YEAR_LENGTH = 10;

const SKILLS = {
  password: "password",
  hardware: "hardware",
  software: "software",
  antivirus: "antivirus",
  network: "network",
  server: "server",
};

export const getSkills = (level) => {
  if (level < 2) {
    return [SKILLS.password];
  } else if (level < 10) {
    return [SKILLS.password, SKILLS.hardware];
  } else if (level < 15) {
    return [
      SKILLS.password,
      SKILLS.hardware,
      SKILLS.software,
      SKILLS.antivirus,
    ];
  } else {
    return [
      SKILLS.password,
      SKILLS.hardware,
      SKILLS.software,
      SKILLS.antivirus,
      SKILLS.network,
      SKILLS.server,
    ];
  }
};

export const getTimeBetweenTickets = (level, manager) => {
  const timeModifier = MANAGERS[manager]?.timeModifier;

  let time = 1000;
  if (level < 5) {
    time = 5000;
  } else if (level < 10) {
    time = 4000;
  } else if (level < 15) {
    time = 3000;
  } else if (level < 25) {
    time = 2000;
  }

  if (timeModifier) {
    time = time / timeModifier;
  }

  return time;
};

export const MANAGERS = {
  Lukasz: {
    difficulty: "easy",
    charismaDie: 4,
    skillMax: 20,
    skillDie: 4,
    timeModifier: 1,
  },
  Alice: {
    difficulty: "medium",
    charismaDie: 2,
    skillMax: 20,
    skillDie: 2,
    timeModifier: 2,
  },
  Matt: {
    difficulty: "hard",
    charismaDie: 1,
    skillMax: 10,
    skillDie: 2,
    timeModifier: 4,
  },
};
