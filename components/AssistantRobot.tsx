"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { PiRobotThin } from "react-icons/pi";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const initialAssistantMessage: ChatMessage = {
  id: 0,
  role: "assistant",
  content:
    "Hi, I’m AlbanAI — your on‑page assistant. You can ask me about this portfolio, architecture, security, DevOps, or anything you’re curious about.",
};

const SUGGESTED_QUESTIONS = [
  "How do you approach system design?",
  "What does security by design mean here?",
  "Walk me through a recent project.",
];

type ResponseMeta = {
  text: string;
  delayMs: number;
};

const generateResponse = (input: string): ResponseMeta => {
  const text = input.trim().toLowerCase();

  // Greetings
  if (
    /^(hi|hey|hello|yo|hiya)\b/.test(text) ||
    text.includes("good morning") ||
    text.includes("good afternoon") ||
    text.includes("good evening") ||
    text.includes("how are you")
  ) {
    return {
      text:
        "Hey there, I’m AlbanAI. I’m here to walk you through this portfolio, talk about engineering decisions, or help unpack anything you see on the page.",
      delayMs: 150,
    };
  }

  // Farewells
  if (
    text.includes("bye") ||
    text.includes("see you") ||
    text.includes("good night") ||
    text.includes("goodnight") ||
    text.includes("later")
  ) {
    return {
      text:
        "It was great chatting with you. Whenever you’re back, AlbanAI will still be here to help you explore the portfolio and ask deeper technical questions.",
      delayMs: 200,
    };
  }

  // Thanks
  if (text.includes("thank")) {
    return {
      text:
        "You’re welcome. If there’s anything else you’d like to dive into—architecture, security, DevOps, or career context—just ask.",
      delayMs: 150,
    };
  }

  if (text.includes("architecture") || text.includes("system design")) {
    return {
      text:
        "When I design systems, I start from constraints: who the users are, what reliability we need, and how the system will be operated. From there I define clear boundaries, data flows, and failure modes before choosing tools. You can see this reflected in the Architecture and Projects sections.",
      delayMs: 450,
    };
  }

  if (text.includes("security")) {
    return {
      text:
        "Security by design here means treating every boundary as untrusted: validating input, limiting privileges, and planning how to detect and respond to incidents. The Security page outlines the pillars I rely on most.",
      delayMs: 450,
    };
  }

  if (
    text.includes("devops") ||
    text.includes("deployment") ||
    text.includes("ci") ||
    text.includes("cd")
  ) {
    return {
      text:
        "My DevOps approach is about shortening safe feedback loops: automated tests, predictable pipelines, and good observability. The DevOps page explains how I think about CI/CD, monitoring, and post‑incident learning.",
      delayMs: 450,
    };
  }

  if (
    text.includes("skills") ||
    text.includes("stack") ||
    text.includes("tech stack")
  ) {
    return {
      text:
        "The Skills section breaks down my toolkit across backend, data, frontends, and intelligent systems. Each skill card explains not just what I use, but how and when I reach for it in real projects.",
      delayMs: 450,
    };
  }

  if (
    text.includes("projects") ||
    text.includes("experience") ||
    text.includes("portfolio")
  ) {
    return {
      text:
        "In Projects, I highlight work that shows how I think: from this portfolio itself to system‑design simulations and teaching artifacts. Each project focuses on trade‑offs, impact, and what I learned building it.",
      delayMs: 450,
    };
  }

  if (
    text.includes("contact") ||
    text.includes("reach") ||
    text.includes("hire") ||
    text.includes("work with you")
  ) {
    return {
      text:
        "If you’d like to collaborate or discuss an opportunity, the Contact page lists my preferred channels—email for detailed briefs, phone or WhatsApp for time‑sensitive coordination, and LinkedIn or GitHub for ongoing work.",
      delayMs: 450,
    };
  }

  // Generic technical / general question fallback
  return {
    text:
      "I’m AlbanAI, tuned to this portfolio. I don’t have access to live external data, but I can explain how I think about architecture, security, DevOps, AI fundamentals, and the kind of engineering work represented here. Try asking about one of those areas or something specific you see on the page.",
    delayMs: 550,
  };
};

const AssistantRobot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    initialAssistantMessage,
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [idCounter, setIdCounter] = useState(1);
  const [hasNewFromAssistant, setHasNewFromAssistant] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const lastAssistantIdRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll();
  const iconScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  // Restore chat history from localStorage if available
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("albanai-chat");
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        messages?: ChatMessage[];
        idCounter?: number;
      };
      if (parsed.messages && parsed.messages.length > 0) {
        setMessages(parsed.messages);
        if (typeof parsed.idCounter === "number") {
          setIdCounter(parsed.idCounter);
        } else {
          const maxId = parsed.messages.reduce(
            (max, m) => (m.id > max ? m.id : max),
            0,
          );
          setIdCounter(maxId + 1);
        }
      }
    } catch {
      // ignore parse errors and fall back to default
    }
  }, []);

  // Persist chat history
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "albanai-chat",
      JSON.stringify({ messages, idCounter }),
    );
  }, [messages, idCounter]);

  // Auto-scroll chat when messages update
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

  // Clear new-message highlight when opening the assistant
  useEffect(() => {
    if (open) {
      setHasNewFromAssistant(false);
    }
  }, [open]);

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
    setIdCounter((prev) => prev + 2);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    const { text: replyText, delayMs } = generateResponse(trimmed);
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: replyText,
    };

    // Simulate a short thinking delay so users can interact as it responds.
    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
      // Trigger icon notification pulse when a new assistant message arrives.
      lastAssistantIdRef.current = assistantId;
      setHasNewFromAssistant(true);
    }, delayMs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggested = (question: string) => {
    sendMessage(question);
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
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AlbanAI anything…"
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
        onClick={() => setOpen((v) => !v)}
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

