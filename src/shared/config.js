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
  if (level < 10) {
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

export const getTimeBetweenTickets = (level) => {
  if (level < 5) {
    return 5000;
  } else if (level < 10) {
    return 4000;
  } else if (level < 15) {
    return 3000;
  } else if (level < 25) {
    return 2000;
  } else {
    return 1000;
  }
};

export const MANAGERS = {
  Lukasz: {
    difficulty: "easy",
  },
  Alice: {
    difficulty: "medium",
  },
  Matt: {
    difficulty: "hard",
  },
};
