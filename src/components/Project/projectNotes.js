export const NOTES_MARKER = "[Project Notes]";

export const NOTE_SECTION_TITLES = [
  "Role",
  "Tech Stack",
  "Core Features",
  "Technical Challenge",
  "Result / Status"
];

export const TECH_OPTIONS = [
  "Full-stack",
  "Frontend",
  "Backend",
  "React",
  "Java",
  "Spring Boot",
  "Supabase",
  "AI",
  "GraphRAG",
  "Computer Vision",
  "UX",
  "Health Tech",
  "Design Tool",
  "Architecture",
  "Data Visualization"
];

export const BADGE_ICONS = {
  "Full-stack": "FS",
  "Frontend": "FE",
  "Backend": "BE",
  "React": "RX",
  "Java": "JV",
  "Spring Boot": "SB",
  "Supabase": "DB",
  "AI": "AI",
  "Computer Vision": "CV",
  "GraphRAG": "GR",
  "Health Tech": "HT",
  "Design Tool": "DT",
  "Architecture": "AR",
  "UX": "UX",
  "Data Visualization": "DV"
};

const BADGES_BY_PROJECT = [
  {
    match: "Focus Mate Berry",
    badges: ["Full-stack", "AI", "Computer Vision", "UX"]
  },
  {
    match: "Cof/fee",
    badges: ["Full-stack", "AI", "GraphRAG", "Health Tech"]
  },
  {
    match: "Mood-DNA",
    badges: ["Full-stack", "AI", "Computer Vision", "Design Tool"]
  },
  {
    match: "Y-Insight",
    badges: ["Backend", "AI", "GraphRAG", "Architecture"]
  }
];

export const EMPTY_PROJECT_NOTES = {
  role: "",
  techStack: [],
  coreFeatures: "",
  challenge: "",
  result: ""
};

export const splitDescription = (description = "") => {
  const markerIndex = description.indexOf(NOTES_MARKER);

  if (markerIndex < 0) {
    return {
      storyText: description,
      notesText: ""
    };
  }

  return {
    storyText: description.slice(0, markerIndex).trim(),
    notesText: description.slice(markerIndex + NOTES_MARKER.length).trim()
  };
};

export const parseProjectNotes = (notesText) => {
  if (!notesText) return [];

  const lines = notesText.split(/\r?\n/);
  const sections = [];
  let current = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (NOTE_SECTION_TITLES.includes(trimmed)) {
      current = { title: trimmed, lines: [] };
      sections.push(current);
      return;
    }

    if (current) {
      current.lines.push(trimmed);
    }
  });

  return sections;
};

export const parseTechStack = (lines = []) => {
  return lines
    .join(",")
    .split(/[,/|]/)
    .map((item) => item.replace(/^-+\s*/, "").trim())
    .filter(Boolean);
};

export const getProjectBadges = (project, sections = []) => {
  const techSection = sections.find((section) => section.title === "Tech Stack");
  const techBadges = parseTechStack(techSection?.lines || []);
  if (techBadges.length > 0) return techBadges;

  const matched = BADGES_BY_PROJECT.find(({ match }) => project.title?.includes(match));
  if (matched) return matched.badges;

  if (project.category === "Data Visualization") return ["Data Visualization", "Frontend"];
  if (project.category === "Team Project") return ["Frontend", "UX"];
  return ["Full-stack"];
};

const cleanLines = (text = "") => {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
};

export const buildProjectDescription = (storyText = "", notes = EMPTY_PROJECT_NOTES) => {
  const sections = [];

  if (notes.role?.trim()) {
    sections.push(["Role", notes.role.trim()]);
  }

  if (notes.techStack?.length) {
    sections.push(["Tech Stack", notes.techStack.join(", ")]);
  }

  const featureLines = cleanLines(notes.coreFeatures).map((line) =>
    line.startsWith("-") ? line : `- ${line}`
  );
  if (featureLines.length) {
    sections.push(["Core Features", featureLines.join("\n")]);
  }

  if (notes.challenge?.trim()) {
    sections.push(["Technical Challenge", notes.challenge.trim()]);
  }

  if (notes.result?.trim()) {
    sections.push(["Result / Status", notes.result.trim()]);
  }

  const story = storyText.trim();
  if (!sections.length) return story;

  const notesText = sections
    .map(([title, body]) => `${title}\n${body}`)
    .join("\n\n");

  return `${story}\n\n${NOTES_MARKER}\n\n${notesText}`.trim();
};

export const extractProjectDraft = (description = "") => {
  const { storyText, notesText } = splitDescription(description);
  const sections = parseProjectNotes(notesText);
  const notes = { ...EMPTY_PROJECT_NOTES };

  sections.forEach((section) => {
    if (section.title === "Role") notes.role = section.lines.join("\n");
    if (section.title === "Tech Stack") notes.techStack = parseTechStack(section.lines);
    if (section.title === "Core Features") {
      notes.coreFeatures = section.lines
        .map((line) => line.replace(/^-+\s*/, ""))
        .join("\n");
    }
    if (section.title === "Technical Challenge") notes.challenge = section.lines.join("\n");
    if (section.title === "Result / Status") notes.result = section.lines.join("\n");
  });

  return { storyText, notes };
};
