import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]",
        tone === "light"
          ? "border-border bg-brand-soft text-brand"
          : "border-ink-line bg-ink-foreground/5 text-ink-foreground/75",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-[2.9rem]",
          tone === "dark" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "text-base leading-relaxed",
            tone === "dark" ? "text-ink-foreground/70" : "text-muted-foreground",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: "brand" | "outline" | "ghostLight" | "outlineLight";
  size?: "md" | "lg";
  className?: string;
};

export function CtaLink({ children, href = "#", onClick, variant = "brand", size = "md", className }: BtnProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        size === "lg" ? "px-7 py-3.5 text-[0.95rem]" : "px-5 py-2.5 text-sm",
        variant === "brand" &&
          "bg-primary text-primary-foreground shadow-brand hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0",
        variant === "outline" &&
          "border border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-brand/45 hover:shadow-soft",
        variant === "outlineLight" &&
          "border border-ink-line bg-ink-foreground/5 text-ink-foreground backdrop-blur hover:-translate-y-0.5 hover:bg-ink-foreground/12",
        variant === "ghostLight" && "text-ink-foreground/80 hover:text-ink-foreground",
        className,
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
        →
      </span>
    </a>
  );
}
