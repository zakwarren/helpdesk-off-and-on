export const SKILLS = {
  password: "password",
  hardware: "hardware",
  software: "software",
  antivirus: "antivirus",
  network: "network",
  server: "server",
};

export const MAX_EXPERIENCE = 100;

export const LEVEL_BOUNDARIES = {
  5: [SKILLS.password, SKILLS.hardware],
  10: [SKILLS.password, SKILLS.hardware, SKILLS.software, SKILLS.antivirus],
  15: [
    SKILLS.password,
    SKILLS.hardware,
    SKILLS.software,
    SKILLS.antivirus,
    SKILLS.network,
    SKILLS.server,
  ],
};
