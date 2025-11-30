"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  FileText,
  Gauge,
  Link as LinkIcon,
  Mail,
  Shield,
  Sparkles,
  TerminalSquare,
  Users,
  Zap,
  LineChart,
  BriefcaseBusiness,
  HeartPulse,
  GanttChartSquare,
} from "lucide-react";

// One-page portfolio focused on: turnarounds, ownership, execution+risk.
// - Next.js (App Router): use this as app/page.tsx
// - Tailwind enabled (no import needed)
// - framer-motion + lucide-react

type CaseStudy = {
  title: string;
  summary: string;
  situation: string;
  actions: string[];
  outcome: string[];
  tags: string[];
  note?: string;
};

type Turnaround = {
  icon: React.ReactNode;
  title: string;
  when: string;
  bullets: string[];
};

type Mode = {
  title: string;
  subtitle: string;
  bullets: string[];
  cta: string;
};

function clsx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function Anchor({ id }: { id: string }) {
  return <div id={id} className="absolute -top-24" aria-hidden="true" />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 text-sm text-white/70">
        <Sparkles className="h-4 w-4" />
        <span className="tracking-wide">{eyebrow}</span>
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {desc ? (
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">{desc}</p>
      ) : null}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90">
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="mt-1 text-xs text-white/60">{label}</div>
        </div>
      </div>
      <div className="mt-4 text-xs leading-5 text-white/60">{hint ?? "Details available under NDA."}</div>
    </div>
  );
}

function PrimaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:translate-y-[-1px] hover:bg-white/90 active:translate-y-[0px]"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function SecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/0 px-4 py-2 text-sm font-semibold text-white/90 shadow-sm transition hover:bg-white/5"
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </a>
  );
}

function TagsRow({ tags }: { tags: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((t) => (
        <Pill key={t}>{t}</Pill>
      ))}
    </div>
  );
}

function Nav() {
  const items = [
    { label: "Focus", href: "#focus" },
    { label: "Turnarounds", href: "#turnarounds" },
    { label: "Case studies", href: "#case-studies" },
    { label: "Engagement", href: "#engagement" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2 text-white">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <TerminalSquare className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Artem Samundzhyan</div>
            <div className="text-xs text-white/60">Trading Technology (Fractional)</div>
          </div>
        </a>

        <div className="hidden items-center gap-6 sm:flex">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="text-sm text-white/70 transition hover:text-white">
              {it.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-black"
          >
            <Mail className="h-4 w-4" />
            Reach out
          </a>
        </div>
      </div>
    </div>
  );
}

function GradientBg() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-[10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-[5%] top-[15%] h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute left-[25%] bottom-[-10%] h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
    </div>
  );
}

export default function TradingTechPortfolioTurnarounds() {
  const [copied, setCopied] = useState<"" | "email" | "tg">("");

  // Update these
  const email = "thejobofmylife1@gmail.com";
  const telegram = "@artem_tradingtech"; // update
  const linkedin = "https://www.linkedin.com/in/samujan";
  const companySite = "https://fintechalgo.tech";

  const stats = useMemo(
    () => [
      {
        icon: <LineChart className="h-5 w-5" />,
        label: "Active users reached",
        value: "22k",
        hint: "Trading API platform (crypto + equities).",
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: "Team led",
        value: "Up to 12",
        hint: "Hiring, performance, delivery ownership.",
      },
      {
        icon: <Shield className="h-5 w-5" />,
        label: "Trading surfaces",
        value: "3",
        hint: "2 desktop terminals + 1 web terminal (plus risk tooling).",
      },
      {
        icon: <Gauge className="h-5 w-5" />,
        label: "Domain depth",
        value: "10+ yrs",
        hint: "Fintech / exchange stack / prop trading tech.",
      },
    ],
    []
  );

  const focus = useMemo(
    () => [
      {
        icon: <Zap className="h-5 w-5" />,
        title: "Direct Market Access & execution",
        desc: "DMA patterns, FIX connectivity, order lifecycle, latency-sensitive pipelines.",
      },
      {
        icon: <GanttChartSquare className="h-5 w-5" />,
        title: "Algorithmic trading systems",
        desc: "High-speed strategies/robots, production hardening, safe deployment practices.",
      },
      {
        icon: <HeartPulse className="h-5 w-5" />,
        title: "Real-time risk controls",
        desc: "Limits, exposure monitoring, kill-switch workflows, operational safety.",
      },
      {
        icon: <TerminalSquare className="h-5 w-5" />,
        title: "Trader experience (Pro UI)",
        desc: "Fast workflows, hotkeys, DOM/ladder, positions & risk panels.",
      },
      {
        icon: <BriefcaseBusiness className="h-5 w-5" />,
        title: "Leadership & turnarounds",
        desc: "Hiring/firing, incident recovery, scope control, delivery under pressure.",
      },
    ],
    []
  );

  const turnarounds: Turnaround[] = useMemo(
    () => [
      {
        icon: <Shield className="h-5 w-5" />,
        title: "Stabilize production under volatility",
        when: "Incidents / market spikes",
        bullets: [
          "Tighten limits & kill-switch paths so failures become safe.",
          "Add observability and runbooks so the team stops firefighting blindly.",
          "Make the execution chain measurable: latency, rejects, risk blocks.",
        ],
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: "Get a team back into delivery mode",
        when: "When execution stalls",
        bullets: [
          "Clarify ownership, remove blockers, reset priorities to measurable outcomes.",
          "Handle tough people decisions fast and respectfully.",
          "Turn chaos into a weekly cadence: milestones, risk list, release discipline.",
        ],
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: "Ship complex trading modules safely",
        when: "Execution / risk / UI",
        bullets: [
          "Break big work into shippable slices — without breaking trading safety.",
          "Design internal APIs so product speed doesn’t kill reliability.",
          "Deliver pilots that can scale into production features.",
        ],
      },
    ],
    []
  );

  const turnarounds72h = useMemo(
    () => [
      {
        title: "72-hour turnaround: from firefighting to control",
        problem:
          "Production instability under market spikes: unclear ownership, noisy alerts, recurring incident patterns affecting trading workflows.",
        actions: [
          "Took ownership of incident response and set a single decision-maker loop.",
          "Mapped the market data → orders → risk → venue chain and made failures measurable (latency, rejects, risk blocks).",
          "Introduced a minimal runbook: top failure modes, safe fallback actions, escalation rules.",
          "Prioritized a small set of fixes with maximum stability impact (guardrails + observability, not big refactors).",
        ],
        result: [
          "Incidents became predictable and faster to resolve.",
          "Team switched from chaos to a weekly shipping cadence.",
          "Clearer risk/safety posture under volatility.",
        ],
        note: "Deeper metrics and diagrams available under NDA.",
      },
      {
        title: "72-hour turnaround: execution chain hardened",
        problem:
          "High-stakes trading where edge cases (rejects, partial fills, disconnects, throttling) created operational risk and unpredictable behaviour.",
        actions: [
          "Audited the order lifecycle end-to-end and defined explicit states + reconciliation rules.",
          "Added safety gates: limits/exposure checks + an operational kill-switch path.",
          "Implemented recovery-first connector behaviour: retries, idempotency patterns, state re-sync after reconnect.",
          "Set a production checklist for releases in a latency-sensitive environment.",
        ],
        result: [
          "More predictable execution behaviour under stress.",
          "Reduced operational surprises and faster recovery when venues misbehave.",
          "Safer automation without sacrificing speed.",
        ],
        note: "Venue/strategy details discussed under NDA.",
      },
    ],
    []
  );

  const caseStudies: CaseStudy[] = useMemo(
    () => [
      {
        title: "High-load trading API platform (crypto + equities)",
        summary: "Led delivery of a production trading API product used by ~22k active users.",
        situation:
          "The platform had to stay reliable under bursty market conditions while supporting fast order workflows and integrations.",
        actions: [
          "Owned architecture decisions across execution flows and trading safety.",
          "Improved reliability/monitoring so issues were detectable before they became incidents.",
          "Delivered features in production cadence while managing a growing team.",
        ],
        outcome: [
          "Stable high-load operation for active trading workflows.",
          "Clear ownership and delivery rhythm for the engineering team.",
        ],
        tags: ["Trading APIs", "High-load", "Execution", "Reliability"],
        note: "Company / exact details available under NDA.",
      },
      {
        title: "Prop trading terminal + risk workflows (large exposure)",
        summary:
          "Owned execution and risk-oriented workflows for a prop trading terminal used in a high-stakes environment.",
        situation:
          "Traders needed extremely fast interaction (orders, hotkeys, positions) while keeping strict limits and operational controls.",
        actions: [
          "Owned execution workflow design (order lifecycle, states, safety gates).",
          "Designed risk-focused UX: limits, exposure view, emergency actions.",
          "Introduced incident-oriented discipline: monitoring, runbooks, measurable system behaviour.",
        ],
        outcome: [
          "Faster trader workflows without sacrificing risk controls.",
          "More predictable production operations under stress.",
        ],
        tags: ["Prop trading", "Execution", "Risk controls", "Trader UX"],
        note: "Details (venues/notional/latency) discussed under NDA.",
      },
      {
        title: "Complex venue connectors + API collaboration (BitMart)",
        summary:
          "Built and hardened integrations for real-world exchange behaviour and collaborated with BitMart on API/integration needs.",
        situation:
          "Connectivity failures in production are expensive: disconnects, throttling, inconsistent edge cases, rejects/partials.",
        actions: [
          "Designed connector architecture (market data + order routing) with recovery paths.",
          "Hardened lifecycle handling (idempotency patterns, retries, state reconciliation).",
          "Closed the feedback loop between real trading usage and API behaviour (NDA-safe summary).",
        ],
        outcome: [
          "Fewer production surprises; faster incident resolution.",
          "Clearer integration behaviour under load and volatility.",
        ],
        tags: ["Connectors", "Execution", "Resilience", "BitMart"],
        note: "Scope and artifacts are discussed under NDA.",
      },
    ],
    []
  );

  const modes: Mode[] = useMemo(
    () => [
      {
        title: "Fractional / part-time (recommended)",
        subtitle: "10–20 hours/week · remote · CET overlap",
        bullets: [
          "Own a clear outcome: execution chain, risk controls, or trader UX.",
          "Work with your CTO/Head of Trading Tech; unblock teams; ship safely.",
          "Convert to longer engagement if it’s a fit.",
        ],
        cta: "Start with a pilot",
      },
      {
        title: "Remote full-time",
        subtitle: "If you need an owner for a critical stream",
        bullets: [
          "Take responsibility for architecture + delivery + crisis response.",
          "Build/reshape team, improve release discipline, stabilize production.",
          "Operate like an internal leader, not an external vendor.",
        ],
        cta: "Discuss availability",
      },
      {
        title: "Architecture / turnaround advisory",
        subtitle: "1–2 week assessment",
        bullets: [
          "Execution/risk review + measurable action plan.",
          "Incident playbook + observability plan.",
          "Roadmap for “active trader” capabilities.",
        ],
        cta: "Get an action plan",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      { q: "Are you available to start now?", a: "Yes — I’m currently available and can start immediately (remote)." },
      {
        q: "Employee or contractor?",
        a: "Either. Many teams start with a small paid pilot, then convert to longer engagement or hire.",
      },
      { q: "Time zone overlap with NL?", a: "I work with CET overlap daily. Short feedback loops are a priority." },
      {
        q: "Can you share exact venues/strategy details?",
        a: "Only under NDA. The public page stays intentionally high-level to respect confidentiality.",
      },
    ],
    []
  );

  async function copyToClipboard(text: string, kind: "email" | "tg") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(""), 1400);
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen text-white">
      <GradientBg />
      <Nav />

      {/* HERO */}
      <header className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="grid gap-10 sm:grid-cols-12 sm:items-end">
          <div className="sm:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2"
            >
              <Pill>
                <BadgeCheck className="mr-2 h-4 w-4" />
                Fractional / Part-time · Remote · CET overlap
              </Pill>
              <Pill>
                <Shield className="mr-2 h-4 w-4" />
                Execution + Risk + Delivery
              </Pill>
              <Pill>
                <Zap className="mr-2 h-4 w-4" />
                Algo/DMA experience (NDA)
              </Pill>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-5xl"
            >
              Trading Technology leader who
              <span className="text-white/80"> turns chaos into shipping.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base"
            >
              I help exchanges, brokers, and prop teams stabilise production and ship prop-grade
              capabilities: execution flows, real-time risk controls, and fast trader UX.
              Selected work includes a prop terminal used in a high-stakes environment, complex venue
              connectors, and API collaboration with BitMart (details under NDA).
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <PrimaryButton href="#contact">Talk to me</PrimaryButton>
              <SecondaryButton href={linkedin}>LinkedIn</SecondaryButton>
              <SecondaryButton href={companySite}>Company site</SecondaryButton>
            </motion.div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/60">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Fast response · CET overlap
              </span>
              <span className="inline-flex items-center gap-2">
                <FileText className="h-4 w-4" />
                NDA-friendly
              </span>
              <span className="inline-flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Remote-first
              </span>
            </div>
          </div>

          <div className="sm:col-span-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((s) => (
                <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} hint={s.hint} />
              ))}
            </div>
            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-semibold text-white">How we start</div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                Start with a small paid pilot: risk controls/kill-switch + monitoring, or a pro
                trader UX module. Ship something real, then expand.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FOCUS */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Anchor id="focus" />
        <SectionTitle
          eyebrow="What I do"
          title="End-to-end trading tech, plus leadership under pressure"
          desc="Built for teams that need someone to own the outcome — execution, risk, and delivery — not just write code."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {focus.map((f) => (
            <Card key={f.title}>
              <div className="flex items-start gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  {f.icon}
                </div>
                <div>
                  <div className="text-base font-semibold text-white">{f.title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/70">{f.desc}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* TURNAROUNDS */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Anchor id="turnarounds" />
        <SectionTitle
          eyebrow="Turnarounds"
          title="How I pull projects back on track"
          desc="When things break (incidents, delivery problems, unclear ownership), I bring structure, measurable controls, and shipping rhythm."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {turnarounds.map((t) => (
            <Card key={t.title}>
              <div className="flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  {t.icon}
                </div>
                <div className="text-xs text-white/60">{t.when}</div>
              </div>
              <div className="mt-4 text-base font-semibold text-white">{t.title}</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                    <span className="leading-6">{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* 72-HOUR TURNAROUNDS */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="72-hour turnarounds"
          title="When it’s on fire, I make it controllable — fast"
          desc="Two examples of what I do in the first 72 hours to stop chaos and restore delivery."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {turnarounds72h.map((t) => (
            <Card key={t.title}>
              <div className="text-base font-semibold text-white">{t.title}</div>

              <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/60">Problem</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{t.problem}</div>

              <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-white/60">What I did</div>
              <ul className="mt-2 space-y-2 text-sm text-white/70">
                {t.actions.map((a: string) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                    <span className="leading-6">{a}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-white/60">Result</div>
              <ul className="mt-2 space-y-2 text-sm text-white/70">
                {t.result.map((r: string) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                    <span className="leading-6">{r}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-xs leading-5 text-white/55">{t.note}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Anchor id="case-studies" />
        <SectionTitle
          eyebrow="Proof"
          title="Selected case studies (high-level, NDA-friendly)"
          desc="I keep public details intentionally high-level. On a call, I can share deeper metrics under NDA."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Card key={cs.title} className="flex flex-col">
              <div className="text-base font-semibold text-white">{cs.title}</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{cs.summary}</div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Situation</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{cs.situation}</div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-white/60">What I owned</div>
                <ul className="mt-2 space-y-2 text-sm text-white/70">
                  {cs.actions.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                      <span className="leading-6">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Outcome</div>
                <ul className="mt-2 space-y-2 text-sm text-white/70">
                  {cs.outcome.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                      <span className="leading-6">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <TagsRow tags={cs.tags} />
              {cs.note ? <div className="mt-4 text-xs leading-5 text-white/55">{cs.note}</div> : null}
            </Card>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Want a one-pager?</div>
              <div className="mt-1 text-sm text-white/70">
                I can send a short capability sheet (focus areas, engagement modes, pilot scopes).
              </div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/0 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/5"
            >
              <FileText className="h-4 w-4" />
              Request the 1-pager
            </a>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Anchor id="engagement" />
        <SectionTitle
          eyebrow="Engagement"
          title="Remote, part-time by default — designed for speed"
          desc="Start fractional, ship a pilot, then expand or convert. This keeps risk low and value obvious."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {modes.map((m) => (
            <Card key={m.title}>
              <div className="text-base font-semibold text-white">{m.title}</div>
              <div className="mt-1 text-sm text-white/60">{m.subtitle}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {m.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-white/50" />
                    <span className="leading-6">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  {m.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="text-base font-semibold text-white">Typical pilot scopes</div>
            <div className="mt-2 text-sm text-white/70">Pick one. We ship it. Then we expand.</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: <HeartPulse className="h-4 w-4" />,
                  title: "Risk controls pack",
                  desc: "Limits, exposure, kill-switch flows, monitoring.",
                },
                {
                  icon: <TerminalSquare className="h-4 w-4" />,
                  title: "Pro trader UX",
                  desc: "Fast order flows, hotkeys, DOM/ladder module.",
                },
                {
                  icon: <Zap className="h-4 w-4" />,
                  title: "Execution chain review",
                  desc: "Latency map + reliability action plan.",
                },
                {
                  icon: <Gauge className="h-4 w-4" />,
                  title: "Observability & runbooks",
                  desc: "Dashboards, alerts, incident response patterns.",
                },
              ].map((p) => (
                <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    {p.icon}
                    {p.title}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-white/70">{p.desc}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="text-base font-semibold text-white">FAQ</div>
            <div className="mt-4 space-y-4">
              {faqs.map((f) => (
                <div key={f.q}>
                  <div className="text-sm font-semibold text-white">{f.q}</div>
                  <div className="mt-1 text-sm leading-6 text-white/70">{f.a}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <Anchor id="contact" />
        <SectionTitle
          eyebrow="Contact"
          title="Let’s talk"
          desc="Short is fine: what you build, where it hurts (execution/risk/reliability/UX), and what success looks like."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="text-sm font-semibold text-white">Send a message</div>
            <div className="mt-1 text-sm text-white/70">This opens your mail client with a prepared email.</div>

            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                const name = String(data.get("name") || "");
                const company = String(data.get("company") || "");
                const msg = String(data.get("message") || "");
                const subject = encodeURIComponent(`Trading Tech — ${company} ${name}`.trim());
                const body = encodeURIComponent(
                  `Name: ${name}\nCompany: ${company}\n\n${msg}\n\n---\nSent from my portfolio page.`
                );
                window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-white/70">Your name</label>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70">Company</label>
                  <input
                    name="company"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                    placeholder="Bitvavo / OneTrading / Nxchange / ..."
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-white/70">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                  placeholder="What are you building? Where is it hurting?"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={linkedin}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/5"
                >
                  <LinkIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </form>
          </Card>

          <Card>
            <div className="text-sm font-semibold text-white">Direct contacts</div>
            <div className="mt-1 text-sm text-white/70">Prefer quick async? Use email or Telegram.</div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">Email</div>
                <div className="mt-1 break-all text-sm font-semibold text-white">{email}</div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(email, "email")}
                    className="rounded-xl border border-white/15 bg-white/0 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/5"
                  >
                    {copied === "email" ? "Copied" : "Copy"}
                  </button>
                  <a href={`mailto:${email}`} className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black">
                    Open
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">Telegram</div>
                <div className="mt-1 break-all text-sm font-semibold text-white">{telegram}</div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(telegram, "tg")}
                    className="rounded-xl border border-white/15 bg-white/0 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/5"
                  >
                    {copied === "tg" ? "Copied" : "Copy"}
                  </button>
                  <a
                    href={`https://t.me/${telegram.replace("@", "")}`}
                    className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black"
                  >
                    Open
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">Location / hours</div>
                <div className="mt-1 text-sm text-white/70">UTC+4 · CET overlap daily · Remote-first · NDA-friendly</div>
              </div>
            </div>
          </Card>
        </div>

        <footer className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Artem Samundzhyan · Trading Technology</div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={linkedin} className="hover:text-white">LinkedIn</a>
            <a href={companySite} className="hover:text-white">FinTechAlgo</a>
          </div>
        </footer>
      </section>
    </div>
  );
}
