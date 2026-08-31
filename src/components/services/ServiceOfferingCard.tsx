import React from "react";
import {
  Award,
  Code,
  ShieldCheck,
  TrendingUp,
  Clock,
  DollarSign,
  UserCheck,
  Briefcase,
  Rocket,
  Users,
  PieChart,
  Megaphone,
  BarChart3,
  Compass,
  Sliders,
  Target,
  CheckSquare,
  FileText,
  ShieldAlert,
  Layers,
  CheckCircle,
  Lock,
  Kanban,
  Building2,
  ArrowRight,
} from "lucide-react";
import { type SpecializedOffering } from "@/lib/services-store";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Code,
  ShieldCheck,
  TrendingUp,
  Clock,
  DollarSign,
  UserCheck,
  Briefcase,
  Rocket,
  Users,
  PieChart,
  Megaphone,
  BarChart3,
  Compass,
  Sliders,
  Target,
  CheckSquare,
  FileText,
  ShieldAlert,
  Layers,
  CheckCircle,
  Lock,
  Kanban,
  Building2,
};

interface ServiceOfferingCardProps {
  offering: SpecializedOffering;
  index: number;
}

export function ServiceOfferingCard({ offering, index }: ServiceOfferingCardProps) {
  const IconComp = ICON_MAP[offering.iconName] || Award;

  return (
    <div className="group w-[85vw] max-w-[340px] sm:w-full sm:min-w-[340px] sm:max-w-[390px] flex-shrink-0 snap-start rounded-3xl sm:rounded-[2rem] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand/40 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Minimalist Top Icon */}
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100/80 text-slate-900 group-hover:bg-brand group-hover:text-white transition-colors">
            <IconComp className="h-6 w-6 stroke-[1.75]" />
          </div>
          {offering.badge && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
              {offering.badge}
            </span>
          )}
        </div>

        {/* Offering Title */}
        <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-brand transition-colors">
          {offering.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          {offering.desc}
        </p>

        {/* Top Roles (Robert Half Reference Style) */}
        <div className="pt-5 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Top roles:
          </h4>
          <ul className="space-y-2">
            {offering.topRoles.map((role, rIdx) => (
              <li key={rIdx} className="flex items-start gap-2 text-xs font-bold text-slate-700">
                <span className="text-slate-900 font-black mt-0.5">•</span>
                <a
                  href="/contact"
                  className="underline underline-offset-4 decoration-slate-300 hover:decoration-brand hover:text-brand transition-colors"
                >
                  {role}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-black text-brand uppercase tracking-wider group-hover:underline"
        >
          <span>{offering.ctaText || "Explore Offering"}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
