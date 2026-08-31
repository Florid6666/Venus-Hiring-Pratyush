import { useState, useEffect } from "react";

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  category: "Employers" | "Candidates" | "Recruitment Process" | "Services" | "General";
  orderIndex?: number;
}

export const INITIAL_FAQS: FaqItem[] = [
  // ── EMPLOYERS ──
  {
    id: "faq-emp-1",
    q: "How does Venus Hiring help employers find qualified candidates?",
    a: "Venus Hiring combines deep market mapping, technical pre-screening, background checks, and active headhunting across Canada and the US. We present a calibrated shortlist of pre-vetted candidates within 5 business days, managing recruitment from initial outreach through offer negotiation.",
    category: "Employers",
    orderIndex: 1,
  },
  {
    id: "faq-emp-2",
    q: "What industries does Venus specialize in?",
    a: "We specialize in Technology & Software Engineering, Finance & Accounting, Automotive & EV Manufacturing, Aerospace, Advanced Manufacturing, Skilled Trades, and Executive Leadership placement across Canada and the US.",
    category: "Employers",
    orderIndex: 2,
  },
  {
    id: "faq-emp-3",
    q: "How long does the recruitment process typically take?",
    a: "For direct-hire staffing and specialized technical positions, employers receive calibrated candidate shortlists within 3 to 5 business days. Niche executive search engagements generally take 2 to 3 weeks for headhunting and evaluation.",
    category: "Employers",
    orderIndex: 3,
  },
  {
    id: "faq-emp-4",
    q: "Do you provide pre-screened candidates?",
    a: "Yes. Every candidate presented by Venus Hiring undergoes multi-stage screening, including technical skill assessments, experience verification, culture-fit interviews, and reference checks prior to client introduction.",
    category: "Employers",
    orderIndex: 4,
  },
  {
    id: "faq-emp-5",
    q: "Can you help with hard-to-fill positions?",
    a: "Yes. Our executive search and specialized technical practices excel at sourcing passive candidates who are not actively browsing job boards, leveraging discreet headhunting and international talent networks.",
    category: "Employers",
    orderIndex: 5,
  },
  {
    id: "faq-emp-6",
    q: "Do you provide recruitment support after placement?",
    a: "All permanent placements include a written replacement guarantee and 90-day post-placement onboarding check-ins to ensure long-term retention and mutual satisfaction.",
    category: "Employers",
    orderIndex: 6,
  },

  // ── CANDIDATES ──
  {
    id: "faq-cand-1",
    q: "How can I apply for a job through Venus Hiring?",
    a: "Candidates can apply directly through our active job listings or submit an open resume on our Contact page. Our talent partners review every submission and connect you with matching career opportunities.",
    category: "Candidates",
    orderIndex: 7,
  },
  {
    id: "faq-cand-2",
    q: "Is there a cost for candidates?",
    a: "No. Venus Hiring services are 100% free for candidates. We are retained directly by employers to source and place top talent across North America.",
    category: "Candidates",
    orderIndex: 8,
  },
  {
    id: "faq-cand-3",
    q: "What types of positions do you recruit for?",
    a: "We recruit across permanent full-time roles, contract opportunities, project-based SOW pods, and executive leadership positions (CTO, VP of Engineering, Plant Directors, CFOs, Controllers).",
    category: "Candidates",
    orderIndex: 9,
  },
  {
    id: "faq-cand-4",
    q: "Can Venus help candidates relocating to Canada?",
    a: "Yes. We assist candidates and employers with work-permit transitions, LMIA applications, Express Entry pathways, and relocation onboarding across major Canadian tech and industrial hubs.",
    category: "Candidates",
    orderIndex: 10,
  },
  {
    id: "faq-cand-5",
    q: "How does the candidate screening process work?",
    a: "After reviewing your application, a talent partner conducts a 30-minute discovery call to discuss your career goals, technical background, compensation expectations, and role preferences before submitting you to hiring managers.",
    category: "Candidates",
    orderIndex: 11,
  },

  // ── RECRUITMENT PROCESS ──
  {
    id: "faq-proc-1",
    q: "What does your recruitment process look like?",
    a: "Our structured process consists of 5 key phases: 1) Role Discovery & Specification, 2) Talent Mapping & Sourcing, 3) Pre-Screening & Evaluation, 4) Candidate Presentation & Client Interviews, and 5) Offer Finalization & Post-Hire Support.",
    category: "Recruitment Process",
    orderIndex: 12,
  },
  {
    id: "faq-proc-2",
    q: "How do you screen candidates?",
    a: "We evaluate candidates through structured technical interviews, work history verification, behavioral assessments, soft skills evaluation, and direct professional reference checks.",
    category: "Recruitment Process",
    orderIndex: 13,
  },
  {
    id: "faq-proc-3",
    q: "How do you match candidates with employers?",
    a: "We analyze hard technical skills, domain expertise, team culture alignment, compensation expectations, and long-term career aspirations to ensure a high-retention match for both employer and candidate.",
    category: "Recruitment Process",
    orderIndex: 14,
  },
  {
    id: "faq-proc-4",
    q: "How do you handle interviews and reference checks?",
    a: "Venus Hiring coordinates interview schedules, provides prep briefs for candidates, gathers post-interview feedback from hiring managers, and conducts thorough professional reference verification.",
    category: "Recruitment Process",
    orderIndex: 15,
  },
  {
    id: "faq-proc-5",
    q: "What happens after a candidate is placed?",
    a: "We maintain ongoing communication with both the candidate and hiring manager during 30, 60, and 90-day onboarding milestones to support smooth integration and performance.",
    category: "Recruitment Process",
    orderIndex: 16,
  },

  // ── SERVICES ──
  {
    id: "faq-serv-1",
    q: "What recruitment services does Venus provide?",
    a: "We offer Permanent Direct-Hire Placement, Executive Search, Contract Staffing, SOW Managed Project Pods, Cross-Border EOR Compliance Advisory, and Fractional HR Consulting.",
    category: "Services",
    orderIndex: 17,
  },
  {
    id: "faq-serv-2",
    q: "Do you provide temporary and permanent staffing?",
    a: "Yes. We provide flexible staffing models including permanent direct hire, contract-to-hire, temporary project staffing, and dedicated engineering pods.",
    category: "Services",
    orderIndex: 18,
  },
  {
    id: "faq-serv-3",
    q: "Do you offer executive search?",
    a: "Yes. Our executive search division specializes in recruiting C-suite executives, Vice Presidents, Directors, and senior technical leaders for high-growth tech firms and manufacturing plants.",
    category: "Services",
    orderIndex: 19,
  },
  {
    id: "faq-serv-4",
    q: "Can you support international talent sourcing?",
    a: "Yes. We leverage global talent pipelines to source specialized international talent and assist US companies expanding into Canada with Employer of Record (EOR) structures.",
    category: "Services",
    orderIndex: 20,
  },
  {
    id: "faq-serv-5",
    q: "Do you provide workforce consulting?",
    a: "Our HR advisory practice assists organizations with compensation benchmarking, workforce planning, employment compliance, policy formulation, and organizational design.",
    category: "Services",
    orderIndex: 21,
  },

  // ── GENERAL ──
  {
    id: "faq-gen-1",
    q: "Where is Venus Hiring located?",
    a: "Our head office is located in Toronto, Ontario, with regional coverage across Vancouver, Montreal, Calgary, and major US tech/manufacturing corridors in Michigan, Illinois, and New York.",
    category: "General",
    orderIndex: 22,
  },
  {
    id: "faq-gen-2",
    q: "How do I get started with Venus Hiring?",
    a: "You can schedule a consultation call on our Contact page or call our team directly at +1 (647) 616-2677. A senior talent partner will respond within 12 business hours.",
    category: "General",
    orderIndex: 23,
  },
];

const STORAGE_KEY_FAQS = "venus_faqs_data_v2";

export function getStoredFaqs(): FaqItem[] {
  if (typeof window === "undefined") return INITIAL_FAQS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FAQS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_FAQS, JSON.stringify(INITIAL_FAQS));
      return INITIAL_FAQS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < INITIAL_FAQS.length) {
      localStorage.setItem(STORAGE_KEY_FAQS, JSON.stringify(INITIAL_FAQS));
      return INITIAL_FAQS;
    }
    return parsed;
  } catch {
    return INITIAL_FAQS;
  }
}

export function saveStoredFaqs(faqs: FaqItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_FAQS, JSON.stringify(faqs));
  window.dispatchEvent(new Event("venus_faqs_updated"));
}

export function useFaqs() {
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);

  const fetchFromDb = async () => {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      if (data.success && data.faqs && data.faqs.length > 0) {
        setFaqs(data.faqs);
        saveStoredFaqs(data.faqs);
      }
    } catch (_err) {
      // Quiet fallback to local store
    }
  };

  useEffect(() => {
    // Sync local storage on client mount to prevent SSR hydration mismatch
    setFaqs(getStoredFaqs());
    fetchFromDb();

    const handleUpdate = () => {
      setFaqs(getStoredFaqs());
    };
    window.addEventListener("venus_faqs_updated", handleUpdate);
    return () => window.removeEventListener("venus_faqs_updated", handleUpdate);
  }, []);

  return { faqs, loading: false };
}
