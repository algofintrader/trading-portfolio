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
  GanttChartSquare,
  HeartPulse,
  LineChart,
  Link as LinkIcon,
  Mail,
  Shield,
  Sparkles,
  TerminalSquare,
  Users,
  Zap,
  BriefcaseBusiness,
} from "lucide-react";

// Next.js (App Router): use this as src/app/page.tsx
// Tailwind enabled (no import needed)
// framer-motion + lucide-react

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
    { label: "72-hour", href: "#turnarounds-72h" },
    { label: "Case studies", href: "#case-studies" },
    { label: "Work", href: "#work" },
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
            <div className="text-xs text-white/60">Trading Technology</div>
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
            Contact
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

function buildMailto(email: string) {
  const subject = encodeURIComponent("Trading Technology — remote role / contract");

  // IMPORTANT: use template literals (backticks) so the string can contain newlines without breaking TypeScript.
  const bodyText = `Hi Artem —\n\nWe are building <exchange/broker/prop>. The pain is <execution/risk/reliability/UX>. We need an owner for <stream>.\n\nAre you open to remote full-time / contract?\n\nThanks,\n<Name>`;
  const body = encodeURIComponent(bodyText);

  return `mailto:${email}?subject=${subject}&body=${body}`;
}

function runMailtoSelfTests(url: string) {
  // Minimal “test cases” in dev to catch the exact class of issues that caused the syntax error.
  // These are safe in production (they won't run).
  console.assert(url.startsWith("mailto:"), "mailto self-test: must start with mailto:");
  console.assert(!url.includes("\n"), "mailto self-test: URL must not include raw newlines");
  console.assert(url.includes("subject="), "mailto self-test: URL must include subject=");
  console.assert(url.includes("body="), "mailto self-test: URL must include body=");
}

export default function Page() {
  const [copied, setCopied] = useState<"" | "email" | "tg">("");

  // Update these
  const email = "algofinteh@gmail.com";
  const telegram = "asamujan";
  const linkedin = "https://www.linkedin.com/in/samujan";
  const portfolioOrCompany = "https://fintechalgo.tech";

  const mailto = useMemo(() => {
    const url = buildMailto(email);
    if (process.env.NODE_ENV !== "production") runMailtoSelfTests(url);
    return url;
  }, [email]);

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
        hint: "Hiring, performance, and delivery ownership.",
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
        hint: "Fintech / exchange stack / prop trading technology.",
      },
    ],
    []
  );

  const focus = useMemo(
    () => [
      {
        icon: <Zap className="h-5 w-5" />,
        title: "Execution (DMA/FIX patterns)",
        desc: "Order lifecycle, safe state handling, latency-sensitive pipelines, production discipline.",
      },
      {
        icon: <GanttChartSquare className="h-5 w-5" />,
        title: "Algorithmic trading systems",
        desc: "Complex automation in real markets, guardrails, safe deployment, incident-ready operations.",
      },
      {
        icon: <HeartPulse className="h-5 w-5" />,
        title: "Real-time risk controls",
        desc: "Limits, exposure monitoring, kill-switch workflows, operational safety and playbooks.",
      },
      {
        icon: <TerminalSquare className="h-5 w-5" />,
        title: "Pro trader UX",
        desc: "DOM/ladder workflows, hotkeys, positions & risk panels, high-speed interaction design.",
      },
      {
        icon: <BriefcaseBusiness className="h-5 w-5" />,
        title: "Leadership & turnarounds",
        desc: "Unblock teams, restore cadence, resolve crises, make tough hiring/firing calls when needed.",
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
          "Tighten limits and kill-switch paths so failures become safe.",
          "Add observability and runbooks so incidents stop being ‘mystical’.",
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
          "Turn chaos into a cadence: milestones, risk list, release discipline.",
        ],
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: "Ship complex trading modules safely",
        when: "Execution / risk / UI",
        bullets: [
          "Break big work into shippable slices — without breaking trading safety.",
          "Design internal APIs so product speed doesn’t kill reliability.",
          "Deliver production-ready features, not demos.",
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
          "Prioritized fixes with maximum stability impact (guardrails + observability, not big refactors).",
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
          "Improved reliability/monitoring so issues were detectable early.",
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
        title: "Prop trading terminal + risk workflows (significant exposure)",
        summary:
          "Owned execution and risk-oriented workflows for a prop trading terminal used in a high-stakes environment.",
        situation:
          "Traders needed extremely fast interaction (orders, hotkeys, positions) while keeping strict limits and operational controls.",
        actions: [
          "Owned execution workflow design (order lifecycle, states, safety gates).",
          "Designed risk-focused UX: limits, exposure view, emergency actions.",
          "Introduced incident-oriented discipline: monitoring, runbooks, measurable behaviour.",
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
        title: "Remote full-time",
        subtitle: "Remote · CET overlap · available now",
        bullets: [
          "Own a critical stream: execution, risk controls, or venue connectivity.",
          "Work directly with CTO / Head of Trading Tech.",
          "Operate like an internal owner: delivery, reliability, accountability.",
        ],
      },
      {
        title: "Remote contract (6–12 months)",
        subtitle: "When you need an owner fast (incl. 12-month term)",
        bullets: [
          "Take responsibility for architecture + delivery + crisis response.",
          "Stabilize production and restore release discipline.",
          "Unblock the team and ship production-ready improvements.",
          "A 12-month contract term is absolutely fine.",
        ],
      },
      {
        title: "Architecture / turnaround advisory",
        subtitle: "1–2 week assessment",
        bullets: [
          "Execution/risk review + measurable action plan.",
          "Observability + incident playbook.",
          "Roadmap for ‘active trader’ capabilities.",
        ],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      { q: "Are you available to start now?", a: "Yes — I’m currently available and can start immediately (remote)." },
      { q: "Employee or contractor?", a: "Either. The best format depends on your needs and timeline." },
      { q: "Time zone overlap with NL?", a: "I overlap with CET daily. Short feedback loops are a priority." },
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
                Remote · CET overlap · Available now
              </Pill>
              <Pill>
                <LinkIcon className="mr-2 h-4 w-4" />
                Open to relocate: Europe / Netherlands
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
              I help exchanges, brokers, and prop teams stabilise production and ship prop-grade capabilities:
              execution flows, real-time risk controls, and fast trader UX. Selected work includes a prop trading
              terminal used in a high-stakes environment, complex venue connectors, and API collaboration with BitMart
              (details under NDA). I’m remote-first now and open to relocating to Europe — including the Netherlands — for the right role.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <PrimaryButton href={mailto}>Email me</PrimaryButton>
              <SecondaryButton href={linkedin}>LinkedIn</SecondaryButton>
              <SecondaryButton href={portfolioOrCompany}>Portfolio</SecondaryButton>
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
          </div>
        </div>
      </header>

      {/* FOCUS */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Anchor id="focus" />
        <SectionTitle
          eyebrow="Focus"
          title="What I own"
          desc="I’m strongest when you need an owner for a critical stream — not a narrow task executor."
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
          desc="When things break (incidents, delivery problems, unclear ownership), I bring structure, measurable controls, and a shipping rhythm."
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

      {/* 72-HOUR */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Anchor id="turnarounds-72h" />
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
      </section>

      {/* WORK */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Anchor id="work" />
        <SectionTitle
          eyebrow="Engagement"
          title="Remote-first — designed for speed"
          desc="Open to remote full-time and contracts. Clear ownership, fast feedback loops, production discipline."
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
                  Contact
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="text-base font-semibold text-white">What I can own</div>
            <div className="mt-2 text-sm text-white/70">Pick one stream. I take ownership and drive it to stable production.</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: <HeartPulse className="h-4 w-4" />,
                  title: "Risk controls",
                  desc: "Limits, exposure, kill-switch flows, operational safety.",
                },
                {
                  icon: <TerminalSquare className="h-4 w-4" />,
                  title: "Trader UX",
                  desc: "Fast order flows, hotkeys, DOM/ladder workflows.",
                },
                {
                  icon: <Zap className="h-4 w-4" />,
                  title: "Execution chain",
                  desc: "Order lifecycle, reliability, latency map, correctness.",
                },
                {
                  icon: <Gauge className="h-4 w-4" />,
                  title: "Observability & incidents",
                  desc: "Dashboards, alerts, runbooks, incident response discipline.",
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
        <SectionTitle eyebrow="Contact" title="Direct contacts" desc="No forms. Telegram is best for a fast reply." />

        <div className="grid gap-4">
          <Card>
            <div className="text-sm font-semibold text-white">Reach out</div>
            <div className="mt-1 text-sm text-white/70">
              If you're reaching out about a role: share the team size, trading surface (exchange/broker/prop), and what’s currently painful
              (execution, risk, reliability, or trader UX). I reply fast.
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
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
                  <a href={mailto} className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black">
                    Open
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">LinkedIn</div>
                <div className="mt-1 break-all text-sm font-semibold text-white">{linkedin}</div>
                <div className="mt-3 flex items-center gap-2">
                  <a href={linkedin} className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black">
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
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Quick note template</div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                Hi Artem — we’re building &lt;exchange/broker/prop&gt;. The pain is &lt;execution/risk/reliability/UX&gt;. We need an owner for
                &lt;stream&gt;. Are you open to remote full-time / contract?
              </div>
              <div className="mt-3 text-xs text-white/55">UTC+4 · CET overlap daily · NDA-friendly</div>
            </div>
          </Card>
        </div>

        <footer className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Artem Samundzhyan · Trading Technology</div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={linkedin} className="hover:text-white">
              LinkedIn
            </a>
            <a href={portfolioOrCompany} className="hover:text-white">
              Portfolio
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
