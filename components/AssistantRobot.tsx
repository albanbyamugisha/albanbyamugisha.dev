"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { PiRobotThin } from "react-icons/pi";
import { PROFILE, SKILLS } from "@/lib/constants";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

type ResponseMeta = {
  text: string;
  delayMs: number;
};

type KnowledgeTopic = {
  id: string;
  route: string;
  keywords: string[];
  summary: string;
  facts: string[];
};

type StoredChatState = {
  messages: ChatMessage[];
  idCounter: number;
};

const STORAGE_KEY = "albanai-chat";

const initialAssistantMessage: ChatMessage = {
  id: 0,
  role: "assistant",
  content:
    "Hi, I am AlbanAI, your on-page assistant. Ask me about anything on this website and I will point you to the right details.",
};

const SUGGESTED_QUESTIONS = [
  "How can I contact Alban?",
  "Summarize the architecture section.",
  "What projects are highlighted?",
];

const NAV_SECTIONS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Blog",
  "Architecture",
  "Security",
  "DevOps",
  "Open Source",
  "Contact",
];

const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: "home",
    route: "/",
    keywords: ["home", "overview", "mission", "philosophy", "core values", "focus"],
    summary:
      "The home page introduces Alban's engineering mission: scalable architecture, secure design, and high-fidelity user experience.",
    facts: [
      "Mission emphasizes maintainability, observability, and reliable behavior under load.",
      "Includes engineering philosophy, core values, testimonials, and FAQ highlights.",
      "Focus areas include architecture, security, and polished frontend delivery.",
    ],
  },
  {
    id: "about",
    route: "/about",
    keywords: ["about", "bio", "background", "profile", "who is alban", "location"],
    summary:
      "The About section explains Alban's profile, engineering mindset, and education history.",
    facts: [
      "Name: Byamugisha Alban, based in Western Region, Uganda.",
      "Focuses on scalable architectures, secure-by-design systems, and strong developer experience.",
      "Shows academic path from primary school through software engineering studies.",
    ],
  },
  {
    id: "skills",
    route: "/skills",
    keywords: ["skills", "stack", "tech stack", "technologies", "toolkit", "languages"],
    summary:
      "The Skills page organizes capabilities by practical engineering domains, not just tool names.",
    facts: [
      "Core technologies include Java, Python, C, SQL, Git/GitHub, AI fundamentals, and system design.",
      "Each skill entry includes narrative, real-world usage, and implementation mindset.",
      "Categories cover backend systems, automation, data, architecture, and intelligent systems.",
    ],
  },
  {
    id: "projects",
    route: "/projects",
    keywords: ["projects", "work", "portfolio projects", "recent project", "experience"],
    summary:
      "Projects highlight end-to-end system thinking, practical architecture decisions, and learning artifacts.",
    facts: [
      "Includes a Next.js plus TypeScript engineering portfolio build.",
      "Covers system design simulations using Java, Python, SQL, Docker, and GitHub.",
      "Includes teaching artifacts with architecture notes, checklists, and diagrams.",
    ],
  },
  {
    id: "architecture",
    route: "/architecture",
    keywords: ["architecture", "system design", "boundaries", "contracts", "data flow"],
    summary:
      "Architecture content focuses on explicit trade-offs, clear boundaries, and design for failure.",
    facts: [
      "Principles include failure-first thinking, explicit contracts, and observability.",
      "Patterns include layered design, event-driven workflows, and practical caching.",
      "Emphasis is on documenting why decisions were made, not only the final diagrams.",
    ],
  },
  {
    id: "security",
    route: "/security",
    keywords: ["security", "secure", "threat", "least privilege", "defense in depth", "secrets"],
    summary:
      "Security is presented as a design mindset integrated from the start of each system.",
    facts: [
      "Core pillars: secure defaults, least privilege, defense in depth, visibility and response.",
      "Practices include validation at boundaries, threat modeling, and dependency and access reviews.",
      "Focus is on designing safe behavior before incidents happen.",
    ],
  },
  {
    id: "devops",
    route: "/devops",
    keywords: ["devops", "ci", "cd", "pipeline", "deployment", "observability", "infra"],
    summary:
      "DevOps content emphasizes faster and safer delivery through automation and feedback loops.",
    facts: [
      "Covers CI/CD pipelines, infrastructure-as-code, and post-incident learning.",
      "Highlights monitoring, logging, and tracing as non-optional operations practices.",
      "Promotes multi-layer testing and containerized consistency from dev to prod.",
    ],
  },
  {
    id: "open-source",
    route: "/open-source",
    keywords: ["open source", "oss", "community", "pull request", "issues", "maintainers"],
    summary:
      "Open Source describes contribution philosophy and how Alban collaborates in public.",
    facts: [
      "Themes include learning in public and writing thoughtful pull requests and issues.",
      "Documentation improvements are treated as first-class contributions.",
      "Section is set up to showcase repositories and merged contributions over time.",
    ],
  },
  {
    id: "blog",
    route: "/blog",
    keywords: ["blog", "writing", "articles", "posts", "topics"],
    summary:
      "The Blog section is for reusable engineering write-ups and lessons from real work.",
    facts: [
      "Topic streams include architecture, frontend engineering, security and reliability, and developer experience.",
      "Content is meant to convert experiments into practical checklists and templates.",
      "Posts are intended to reduce repeated mistakes through documented patterns.",
    ],
  },
  {
    id: "contact",
    route: "/contact",
    keywords: ["contact", "hire", "reach", "email", "phone", "linkedin", "github"],
    summary:
      "The Contact page provides collaboration channels and typical engagement types.",
    facts: [
      "Email: albanbyaugisha@gmail.com",
      `Phone / WhatsApp: ${PROFILE.phone}`,
      "GitHub and LinkedIn links are provided for technical and professional collaboration.",
    ],
  },
];

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((token) => token.length > 2);

const isValidMessage = (message: unknown): message is ChatMessage => {
  if (!message || typeof message !== "object") return false;
  const candidate = message as Partial<ChatMessage>;
  return (
    typeof candidate.id === "number" &&
    (candidate.role === "assistant" || candidate.role === "user") &&
    typeof candidate.content === "string"
  );
};

const getInitialChatState = (): StoredChatState => {
  if (typeof window === "undefined") {
    return { messages: [initialAssistantMessage], idCounter: 1 };
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { messages: [initialAssistantMessage], idCounter: 1 };
    }

    const parsed = JSON.parse(raw) as {
      messages?: unknown;
      idCounter?: unknown;
    };

    const messages = Array.isArray(parsed.messages)
      ? parsed.messages.filter(isValidMessage)
      : [];

    if (messages.length === 0) {
      return { messages: [initialAssistantMessage], idCounter: 1 };
    }

    const maxId = messages.reduce((max, message) =>
      message.id > max ? message.id : max,
    0);

    const idCounter =
      typeof parsed.idCounter === "number" && parsed.idCounter > maxId
        ? parsed.idCounter
        : maxId + 1;

    return { messages, idCounter };
  } catch {
    return { messages: [initialAssistantMessage], idCounter: 1 };
  }
};

const findBestTopic = (input: string): KnowledgeTopic | null => {
  const normalized = normalize(input);
  const tokens = tokenize(input);

  let best: KnowledgeTopic | null = null;
  let bestScore = 0;

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0;

    for (const keyword of topic.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.includes(" ") ? 4 : 2;
      }
    }

    for (const token of tokens) {
      if (topic.keywords.some((keyword) => keyword.includes(token))) {
        score += 1;
      }
      if (topic.facts.some((fact) => normalize(fact).includes(token))) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }

  return bestScore >= 3 ? best : null;
};

const generateResponse = (input: string): ResponseMeta => {
  const text = normalize(input);

  if (
    /^(hi|hey|hello|yo|hiya)\b/.test(text) ||
    text.includes("good morning") ||
    text.includes("good afternoon") ||
    text.includes("good evening") ||
    text.includes("how are you")
  ) {
    return {
      text:
        "Hey there, I am AlbanAI. Ask me about any page on this website: Home, About, Skills, Projects, Blog, Architecture, Security, DevOps, Open Source, or Contact.",
      delayMs: 150,
    };
  }

  if (
    text.includes("bye") ||
    text.includes("see you") ||
    text.includes("good night") ||
    text.includes("goodnight") ||
    text.includes("later")
  ) {
    return {
      text:
        "Great chatting with you. When you come back, I can still help with any section of the website.",
      delayMs: 180,
    };
  }

  if (text.includes("thank")) {
    return {
      text:
        "You are welcome. Ask me about any page, skill, project, contact channel, or architecture, security, and DevOps details from this site.",
      delayMs: 140,
    };
  }

  if (
    text.includes("everything") ||
    text.includes("anything on this website") ||
    text.includes("what can i ask") ||
    text.includes("what is on this site") ||
    text.includes("what pages are on this website") ||
    text.includes("what pages are on this site") ||
    text.includes("what pages") ||
    text.includes("list pages") ||
    text.includes("pages on this website") ||
    text.includes("all sections") ||
    text.includes("which pages")
  ) {
    return {
      text: `I can answer questions across the full website: ${NAV_SECTIONS.join(", ")}. You can ask for summaries, specific details, or where to find something.`,
      delayMs: 360,
    };
  }

  if (
    text.includes("who are you") ||
    text.includes("about alban") ||
    text.includes("profile")
  ) {
    return {
      text: `${PROFILE.name} is a software engineer focused on scalable architecture, secure-by-design systems, and high-fidelity frontend experiences. Location: ${PROFILE.location}.`,
      delayMs: 320,
    };
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("phone") ||
    text.includes("whatsapp") ||
    text.includes("linkedin")
  ) {
    return {
      text: `You can reach Alban via email at albanbyaugisha@gmail.com, phone/WhatsApp at ${PROFILE.phone}, GitHub at github.com/albanbyaugisha, and LinkedIn at linkedin.com/in/byamugisha-alban-3140bb37a.`,
      delayMs: 320,
    };
  }

  if (
    text.includes("all skills") ||
    text.includes("list skills") ||
    text.includes("tech skills")
  ) {
    const skillNames = SKILLS.map((skill) => skill.name).join(", ");
    return {
      text: `Skills covered on the website include: ${skillNames}. I can also explain any one of them in detail.`,
      delayMs: 320,
    };
  }

  const matchedSkill = SKILLS.find((skill) => {
    const skillName = normalize(skill.name);
    const skillCategory = normalize(skill.category);
    return text.includes(skillName) || text.includes(skillCategory);
  });

  if (matchedSkill) {
    return {
      text: `${matchedSkill.name}: ${matchedSkill.narrative} In practice: ${matchedSkill.usage}`,
      delayMs: 420,
    };
  }

  const topicMatch = findBestTopic(input);
  if (topicMatch) {
    const highlights = topicMatch.facts.slice(0, 3).join(" ");
    return {
      text: `${topicMatch.summary} ${highlights} You can find this on ${topicMatch.route}.`,
      delayMs: 440,
    };
  }

  return {
    text: `I can answer from this website's content across ${NAV_SECTIONS.join(", ")}. Ask about any page, skill, project, architecture, security, DevOps topic, or contact details.`,
    delayMs: 500,
  };
};

const AssistantRobot = () => {
  const [open, setOpen] = useState(false);
  const [chatState, setChatState] = useState<StoredChatState>(() =>
    getInitialChatState(),
  );
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [hasNewFromAssistant, setHasNewFromAssistant] = useState(false);
  const messages = chatState.messages;
  const idCounter = chatState.idCounter;

  const listRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll();
  const iconScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  // Cleanup old persistent storage from previous versions.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Persist chat history only for the current tab session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(chatState),
    );
  }, [chatState]);

  // Auto-scroll chat when messages update.
  useEffect(() => {
    if (!listRef.current) return;
    const container = listRef.current;
    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages.length, isThinking]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    const userId = idCounter;
    const assistantId = idCounter + 1;

    const userMessage: ChatMessage = {
      id: userId,
      role: "user",
      content: trimmed,
    };

    setChatState((prev) => ({
      messages: [...prev.messages, userMessage],
      idCounter: prev.idCounter + 2,
    }));
    setInput("");
    setIsThinking(true);

    const { text: replyText, delayMs } = generateResponse(trimmed);
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: replyText,
    };

    setTimeout(() => {
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
      }));
      setIsThinking(false);
      setHasNewFromAssistant(true);
    }, delayMs);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleSuggested = (question: string) => {
    sendMessage(question);
  };

  const handleToggleAssistant = () => {
    setOpen((previous) => {
      const next = !previous;
      if (next) {
        setHasNewFromAssistant(false);
      }
      return next;
    });
  };

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-2 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="assistant-panel"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="glass-panel albanai-panel relative flex w-[20rem] max-w-[90vw] flex-col rounded-2xl px-3.5 py-3 text-xs text-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.9)] sm:px-4 sm:py-4"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-amber-100/80">
                AlbanAI
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[0.65rem] text-slate-400 hover:text-slate-200"
              >
                Minimize
              </button>
            </div>

            <div
              ref={listRef}
              className="mb-2 max-h-52 space-y-2 overflow-y-auto pr-1.5"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{
                    opacity: 0,
                    x: message.role === "user" ? 25 : -25,
                    scale: 0.96,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <div
                    className={`rounded-2xl px-3 py-2 leading-relaxed ${
                      message.role === "user"
                        ? "bg-amber-300/90 text-slate-950"
                        : "bg-slate-900/85 text-slate-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-slate-900/70 px-3 py-2 text-[0.7rem] text-slate-200">
                    <div className="albanai-typing">
                      <span className="albanai-typing-dot" />
                      <span className="albanai-typing-dot" />
                      <span className="albanai-typing-dot" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-2 flex flex-wrap gap-1">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSuggested(question)}
                  className="rounded-full border border-amber-300/30 bg-slate-900/70 px-2 py-0.5 text-[0.65rem] text-amber-100 hover:border-amber-200 hover:text-amber-50"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-1.5">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask AlbanAI anything..."
                className="h-7 flex-1 rounded-full border border-slate-700/70 bg-slate-950/80 px-3 text-[0.7rem] text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300/80"
              />
              <button
                type="submit"
                className="h-7 rounded-full bg-amber-300 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-950 hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-slate-600/70 disabled:text-slate-200/80"
                disabled={!input.trim() || isThinking}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleToggleAssistant}
        className={`assistant-icon relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-black text-amber-200 shadow-[0_18px_40px_rgba(0,0,0,0.9)] ring-1 ring-amber-300/40 ${
          hasNewFromAssistant ? "assistant-icon--notify" : ""
        }`}
        animate={{
          y: [0, -4, 0],
          rotateX: [0, 8, 0],
          rotateY: [0, -8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ scale: iconScale }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        aria-label="AlbanAI assistant"
      >
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.5),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.45),transparent_55%)] opacity-60 mix-blend-screen" />
        <span className="pointer-events-none absolute inset-3 rounded-xl bg-[radial-gradient(circle_at_30%_0%,rgba(251,191,36,0.7),transparent_55%),radial-gradient(circle_at_70%_100%,rgba(34,197,94,0.7),transparent_55%)] opacity-40 blur-[2px] mix-blend-screen" />
        <PiRobotThin className="relative z-10 h-7 w-7" />
      </motion.button>
    </div>
  );
};

export default AssistantRobot;
