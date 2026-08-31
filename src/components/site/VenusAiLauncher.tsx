import React, { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Building2,
  Zap,
  Globe,
  Brain,
  CheckCircle2,
  Loader2,
  Bot,
  User
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestedLinks?: Array<{ label: string; url: string }>;
}

const QUICK_QUESTIONS = [
  "What services does Venus provide?",
  "How does Executive Search work?",
  "What industries do you specialize in?",
  "Show me current job openings",
  "How can I contact Venus?",
  "Tell me about SOW Project Pods"
];

/**
 * Safe, robust Markdown Component to render bold, italic, bullet lists, and links.
 * Prevents raw asterisks (**text**) from ever being displayed to the user.
 */
function FormattedMarkdown({ content, isUser }: { content: string; isUser?: boolean }) {
  if (!content) return null;

  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div className="space-y-2">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);

        const isBulletList = lines.every((l) => /^[-*•]\s+/.test(l));
        if (isBulletList) {
          return (
            <ul key={pIdx} className="list-disc pl-4 space-y-1 my-1 text-xs">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^[-*•]\s+/, "");
                return <li key={lIdx}>{parseInlineFormatting(cleanLine, isUser)}</li>;
              })}
            </ul>
          );
        }

        const isNumberedList = lines.every((l) => /^\d+\.\s+/.test(l));
        if (isNumberedList) {
          return (
            <ol key={pIdx} className="list-decimal pl-4 space-y-1 my-1 text-xs">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^\d+\.\s+/, "");
                return <li key={lIdx}>{parseInlineFormatting(cleanLine, isUser)}</li>;
              })}
            </ol>
          );
        }

        return (
          <p key={pIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <span key={lIdx} className="block font-normal">
                {parseInlineFormatting(line, isUser)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function parseInlineFormatting(text: string, isUser?: boolean): React.ReactNode[] {
  const regex = /(\*\*(.*?)\*\*|\*(.*?)\*|\[(.*?)\]\((.*?)\))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const fullMatch = match[0];
    if (fullMatch.startsWith("**") && fullMatch.endsWith("**")) {
      const boldText = match[2];
      parts.push(
        <strong
          key={match.index}
          className={isUser ? "font-extrabold text-white" : "font-extrabold text-slate-900"}
        >
          {boldText}
        </strong>
      );
    } else if (fullMatch.startsWith("*") && fullMatch.endsWith("*")) {
      const italicText = match[3];
      parts.push(
        <em key={match.index} className="italic opacity-90">
          {italicText}
        </em>
      );
    } else if (fullMatch.startsWith("[")) {
      const linkLabel = match[4];
      const linkUrl = match[5];
      const cleanUrl = linkUrl.startsWith("/") ? linkUrl : `/${linkUrl}`;
      parts.push(
        <Link
          key={match.index}
          to={cleanUrl as any}
          className={
            isUser
              ? "text-white underline font-extrabold"
              : "text-red-600 font-extrabold hover:underline inline-flex items-center gap-0.5"
          }
        >
          <span>{linkLabel}</span>
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export function VenusAiLauncher() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.sender,
        content: m.text,
      }));

      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`API status ${res.status}`);
      }

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: "assistant",
        text: data.answer || "I couldn't process your question at the moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedLinks: data.suggestedLinks || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Chatbot query error:", err);
      const errorMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: "assistant",
        text: "I couldn't find verified information about that on the Venus Consultancy website. You can contact our team directly for assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedLinks: [
          { label: "Explore Services", url: "/services" },
          { label: "Contact Venus", url: "/contact" },
        ],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setInputQuery("");
    inputRef.current?.focus();
  };

  return (
    <>
      {/* ── FLOATING CHAT POPUP WINDOW ── */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[410px] h-[560px] max-h-[82vh] z-50 bg-white text-slate-900 shadow-2xl rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans">
          
          {/* POPUP HEADER */}
          <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-[#090b10] border border-slate-700/80 p-1 flex items-center justify-center shadow-md">
                  <img
                    src="/images/venus_logo.png"
                    alt="Venus Consultancy Logo"
                    className="w-full h-full object-contain filter brightness-110"
                  />
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -bottom-0.5 -right-0.5 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-white tracking-tight">
                    Venus AI Assistant
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 text-[9px] font-extrabold uppercase border border-emerald-800/80">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Verified Website Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES BODY */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/60">
            
            {/* WELCOME MESSAGE & QUICK QUESTIONS (Shown when empty) */}
            {messages.length === 0 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👋</span>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Hi! Welcome to Venus Consultancy.
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    I'm your AI Assistant. How can I help you explore our recruitment services, executive search, careers, or hiring solutions?
                  </p>
                </div>

                {/* QUICK QUESTIONS CHIPS */}
                <div className="space-y-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
                    QUICK QUESTIONS:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-red-50/60 border border-slate-200/80 hover:border-red-300 text-xs font-bold text-slate-800 hover:text-red-700 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                      >
                        <span>{q}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CHAT THREAD */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in duration-250`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-[#090b10] border border-slate-700/80 p-0.5 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <img
                      src="/images/venus_logo.png"
                      alt="Venus Logo"
                      className="w-full h-full object-contain filter brightness-110"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                    msg.sender === "user"
                      ? "bg-red-600 text-white font-medium rounded-tr-none shadow-sm"
                      : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-sm"
                  }`}
                >
                  <FormattedMarkdown content={msg.text} isUser={msg.sender === "user"} />

                  {/* Recommended Navigation Link Pills */}
                  {msg.sender === "assistant" && msg.suggestedLinks && msg.suggestedLinks.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.suggestedLinks.map((link) => (
                        <Link
                          key={link.url}
                          to={link.url as any}
                          onClick={() => setIsOpen(false)}
                          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer border border-slate-200/80"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    U
                  </div>
                )}
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isThinking && (
              <div className="flex items-center gap-2.5 justify-start animate-in fade-in duration-200">
                <div className="w-7 h-7 rounded-xl bg-[#090b10] border border-slate-700/80 p-0.5 flex items-center justify-center shrink-0 shadow-sm">
                  <img
                    src="/images/venus_logo.png"
                    alt="Venus Logo"
                    className="w-full h-full object-contain filter brightness-110"
                  />
                </div>
                <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-sm flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <span>Searching verified Venus data</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping delay-300" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM */}
          <div className="p-3 bg-white border-t border-slate-200/90 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask me anything about Venus Consultancy..."
                className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-slate-100/80 border border-slate-300/80 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                disabled={isThinking}
              />

              <button
                type="submit"
                disabled={!inputQuery.trim() || isThinking}
                className="absolute right-1.5 p-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              >
                {isThinking ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>

            <p className="text-[10px] text-slate-400 text-center pt-2 font-medium">
              Grounded in verified Venus website knowledge
            </p>
          </div>

        </div>
      )}

      {/* ── FLOATING LAUNCHER BUTTON (ENLARGED BY ~15-20% FOR GLOBAL PERSISTENCE) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5">
        
        {/* Helper Prompt Card next to button (if closed) */}
        {!isOpen && (
          <div className="hidden sm:flex flex-col bg-white text-slate-900 px-5 py-3 rounded-2xl border border-slate-200 shadow-2xl text-left animate-in fade-in slide-in-from-right-4 duration-500">
            <span className="text-xs sm:text-[13px] font-black text-slate-800 leading-tight">
              Need help exploring Venus?
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-red-600 pt-0.5">
              Tap to chat!
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative group p-4 sm:p-4.5 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shadow-2xl ${
            isOpen
              ? "bg-slate-900 hover:bg-black text-white border-2 border-white"
              : "bg-white text-slate-900 border-2 border-slate-200/90 hover:bg-slate-50"
          }`}
          title={isOpen ? "Close Venus AI Assistant" : "Open Venus AI Assistant"}
        >
          {/* Subtle Neutral Glow Halo */}
          <div className="absolute inset-0 rounded-full bg-slate-900/5 blur-md group-hover:bg-slate-900/10 transition-all pointer-events-none" />

          {isOpen ? (
            <X className="w-7 h-7 text-white relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10">
              <img
                src="/images/venus_logo.png"
                alt="Venus Consultancy Logo"
                className="w-full h-full object-contain"
              />
              <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-white absolute -bottom-0.5 -right-0.5 animate-pulse" />
            </div>
          )}
        </button>

      </div>
    </>
  );
}
