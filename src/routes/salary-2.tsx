import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Brain,
  Send,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  Bot,
  User,
  Loader2,
  Info,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  getSalaryAssistantContext,
  getSalaryAssistantResult,
  saveSalaryAssistantResult,
  saveAssistantResultForContext,
  buildContextPrompt,
  type SalaryAssistantResult,
} from "@/lib/salaryAssistantContext";

const TITLE = "AI Salary Assistant | Venus Hiring";
const DESCRIPTION =
  "Describe your job role and compensation situation to get a personalized market perspective and negotiation advice from Venus AI Salary Assistant.";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedQuestions?: string[];
  source?: "groq-ai" | "fallback-engine";
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-1",
  role: "assistant",
  content:
    "Hi! Tell me your exact job role, years of experience, location, skills, current compensation, and the salary question you want help with.",
  suggestedQuestions: [
    "I want to know my market salary",
    "Help me negotiate a raise",
    "Compare my current salary",
    "Review my job offer",
  ],
  source: "fallback-engine",
};

const PROMPT_CHIPS = [
  "I want to know my market salary",
  "Help me negotiate a raise",
  "Compare my current salary",
  "Review my job offer",
];

const SESSION_STORAGE_KEY = "venus_ai_salary_assistant_chat";

export const Route = createFileRoute("/salary-2")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AISalaryAssistantPage,
});

function AISalaryAssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn("[Session Storage Read Notice]: Initializing default chat state.", e);
      }
    }
    return [INITIAL_WELCOME_MESSAGE];
  });

  const [inputContent, setInputContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [aiSource, setAiSource] = useState<"pending" | "groq-ai" | "fallback-engine">("pending");
  const [activeContextId, setActiveContextId] = useState<string | null>(null);
  const [activeExactRole, setActiveExactRole] = useState<string | undefined>(undefined);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
      } catch (e) {
        console.warn("[Session Storage Write Notice]: Failed to save chat state.", e);
      }
    }
  }, [messages]);

  // Context Handoff from /salary-calculator via contextId & session storage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const contextId = urlParams.get("contextId");

      if (contextId) {
        const context = getSalaryAssistantContext(contextId);
        if (context) {
          setActiveContextId(contextId);
          setActiveExactRole(context.exactRoleInput);

          const autoSentKey = `venus_autosent_${contextId}`;
          const alreadySent = sessionStorage.getItem(autoSentKey);

          if (!alreadySent) {
            sessionStorage.setItem(autoSentKey, "1");
            setMessages([INITIAL_WELCOME_MESSAGE]);
            window.history.replaceState({}, document.title, "/salary-2");

            const promptText = buildContextPrompt(context);
            handleSendMessage(promptText, contextId, context.exactRoleInput);
          }
        }
      }
    } catch (e) {
      console.warn("[Context Handoff Read Notice]:", e);
    }
  }, []);

  const handleSendMessage = async (textToSend?: string, contextIdForSave?: string, exactRoleForSave?: string) => {
    const content = (textToSend || inputContent).trim();
    if (!content || loading) return;

    if (content.length > 3000) {
      alert("Message exceeds maximum character limit of 3000 characters.");
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInputContent("");
    setLoading(true);

    const ctxIdToUse = contextIdForSave || activeContextId;
    const exactRoleToUse = exactRoleForSave || activeExactRole;

    try {
      const payloadMessages = newMessages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/salary-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (res.ok) {
        const data = await res.json();
        const isGroq = data.source === "groq-ai";
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message || "I’m unable to generate a personalized AI response right now.",
          suggestedQuestions: Array.isArray(data.suggestedQuestions) ? data.suggestedQuestions : [],
          source: isGroq ? "groq-ai" : "fallback-engine",
        };

        setAiSource(isGroq ? "groq-ai" : "fallback-engine");
        setMessages((prev) => [...prev, assistantMsg]);

        // Save result for calculator return if context is active
        if (ctxIdToUse) {
          saveAssistantResultForContext(ctxIdToUse, exactRoleToUse, {
            source: isGroq ? "groq-ai" : "fallback-engine",
            message: assistantMsg.content,
            suggestedQuestions: assistantMsg.suggestedQuestions || [],
          });
        }
      } else {
        throw new Error(`HTTP error ${res.status}`);
      }
    } catch (err) {
      console.error("[Salary Assistant Client Error]:", err);
      const fallbackContent =
        "I’m unable to generate a personalized AI response right now. Please share your exact role, experience, country/city, current annual compensation, and target salary, and a recruitment specialist can help you assess it.";
      const fallbackQuestions = [
        "How should I describe my role for salary benchmarking?",
        "What information helps assess my market salary?",
        "How can I prepare for a salary negotiation?",
      ];
      const errorMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: fallbackContent,
        suggestedQuestions: fallbackQuestions,
        source: "fallback-engine",
      };
      setAiSource("fallback-engine");
      setMessages((prev) => [...prev, errorMsg]);

      // Always save fallback result on API failure / network error / non-OK response
      if (ctxIdToUse) {
        saveAssistantResultForContext(ctxIdToUse, exactRoleToUse, {
          source: "fallback-engine",
          message: fallbackContent,
          suggestedQuestions: fallbackQuestions,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearConversation = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setAiSource("pending");
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch (e) {
        console.warn("[Session Storage Clear Notice]:", e);
      }
    }
  };

  const handleBackToCalculator = () => {
    if (activeContextId) {
      const savedResult = getSalaryAssistantResult(activeContextId);
      if (savedResult) {
        navigate({
          to: "/salary-calculator",
          search: { contextId: activeContextId, assistantResult: "1" },
        });
        return;
      }
    }
    navigate({ to: "/salary-calculator" });
  };

  // Safe Markdown Formatting Helper (No dangerouslySetInnerHTML)
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-2" />;

      if (trimmed.endsWith(":") && trimmed.length < 40) {
        return (
          <h5 key={idx} className="font-extrabold text-amber-400 text-xs tracking-wider uppercase mt-3 mb-1">
            {trimmed}
          </h5>
        );
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const bulletText = trimmed.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-slate-200 my-0.5">
            {parseBoldText(bulletText)}
          </li>
        );
      }

      return (
        <p key={idx} className="my-1 text-slate-200">
          {parseBoldText(trimmed)}
        </p>
      );
    });
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <SiteNav />

      {/* Hero Sub-Header & Breadcrumbs */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/salary-calculator" className="hover:text-white transition-colors">
              Salary Calculator
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-red-400 font-extrabold">AI Salary Assistant</span>
          </div>

          <button
            onClick={handleBackToCalculator}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Salary Calculator</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side Column: Information & Disclaimers */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-extrabold uppercase tracking-wider mb-3">
                <Brain className="w-4 h-4 animate-pulse" />
                Natural Language Compensation AI
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Salary Assistant
              </h1>
              <p className="text-sm text-slate-300 font-medium leading-relaxed mt-2">
                Describe your role and compensation situation to get a personalized market perspective.
              </p>
            </div>

            {/* Prompt Chips Box */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Quick Prompts to Try:
              </h3>
              <div className="flex flex-wrap gap-2">
                {PROMPT_CHIPS.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => setInputContent(chip)}
                    className="text-xs font-semibold text-slate-300 bg-slate-800/90 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40 border border-slate-700/80 px-3 py-1.5 rounded-xl transition-all text-left cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Informational Guidance & Safeguards Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3.5 text-xs text-slate-300">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Important Assistant Notes & Safeguards:
              </h4>

              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Personalized Guidance:</strong> AI responses provide guidance and negotiation planning, not guaranteed salary offers.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Exact Role Fidelity:</strong> The assistant preserves your exact specialization (e.g. React Native, ML Infra) without substituting generic titles.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Privacy First:</strong> The AI evaluates only the details provided. It does not access private payroll databases.
                  </span>
                </li>
              </ul>
            </div>

            {/* Back to Calculator Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/30 to-slate-900 border border-red-900/30 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-white">Prefer structured salary benchmarks?</span>
                <span className="block text-[11px] text-slate-400">Return to our deterministic calculator.</span>
              </div>
              <button
                onClick={handleBackToCalculator}
                className="text-xs font-extrabold text-red-400 hover:text-red-300 flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>Calculator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side Column: Interactive AI Chatbot Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl flex flex-col h-[650px] overflow-hidden relative">
              {/* Chat Card Header Bar */}
              <div className="px-5 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                    <Brain className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">Venus AI Salary Assistant</h3>
                    <span className="text-[10px] text-slate-400 font-medium">Real-Time Natural Language Advice</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
                    {aiSource === "groq-ai" ? "Groq AI Powered" : "Venus HR Intelligence"}
                  </span>

                  <button
                    onClick={handleClearConversation}
                    title="Clear Conversation"
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Scrollable Box */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-red-400 shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className="max-w-[85%] space-y-2">
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-tr-none shadow-md"
                            : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm"
                        }`}
                      >
                        {msg.role === "assistant" ? renderFormattedContent(msg.content) : msg.content}
                      </div>

                      {/* Suggested Follow-up Question Chips */}
                      {msg.role === "assistant" &&
                        msg.suggestedQuestions &&
                        msg.suggestedQuestions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {msg.suggestedQuestions.map((q, qIdx) => (
                              <button
                                key={qIdx}
                                onClick={() => handleSendMessage(q)}
                                disabled={loading}
                                className="text-[11px] font-semibold text-slate-300 bg-slate-800/80 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/40 border border-slate-700/80 px-2.5 py-1 rounded-lg transition-all text-left cursor-pointer"
                              >
                                💬 {q}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>

                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading State Indicator */}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-red-400 shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                      <span className="animate-pulse font-medium">Venus AI Assistant is analyzing compensation market context...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2 items-end"
                >
                  <textarea
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Describe your role, experience, location, and salary question... (Press Enter to send)"
                    rows={2}
                    maxLength={3000}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  />

                  <button
                    type="submit"
                    disabled={!inputContent.trim() || loading}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 h-[42px] cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Send</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="flex justify-between items-center text-[10px] text-slate-500 px-1 font-medium">
                  <span>Shift + Enter for new line</span>
                  <span className={inputContent.length > 2500 ? "text-amber-400 font-bold" : ""}>
                    {inputContent.length} / 3000 chars
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
