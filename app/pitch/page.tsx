"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CarFront,
  CircleDollarSign,
  Gauge,
  Heart,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";

interface Slide {
  dark?: boolean;
  kicker?: string;
  title: React.ReactNode;
  body: React.ReactNode;
}

const hkd = "HK$";

/* ---------- small layout helpers ---------- */

function Stats({
  items,
  dark,
}: {
  items: { v: string; l: string }[];
  dark?: boolean;
}) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((s) => (
        <div
          key={s.l}
          className={`rounded-2xl p-4 ${dark ? "bg-white/10" : "bg-black/[0.04]"}`}
        >
          <div
            className={`text-[26px] font-extrabold leading-none tracking-tight ${
              dark ? "text-white" : "text-brand-blue"
            }`}
          >
            {s.v}
          </div>
          <div
            className={`mt-1.5 text-[12.5px] leading-snug ${
              dark ? "text-white/60" : "text-mute"
            }`}
          >
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}

function Gap({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-1 block text-[14.5px] text-brand-orange">
      <strong>Gap:</strong> {children}
    </span>
  );
}

/** 24-hour strip with the 4–11 PM on-peak window highlighted. */
function DayStrip({ dark }: { dark?: boolean }) {
  const hours = Array.from({ length: 24 }, (_, h) => h);
  return (
    <div className="mb-5">
      <div className="flex gap-[3px]">
        {hours.map((h) => {
          const peak = h >= 16 && h < 23;
          return (
            <div
              key={h}
              className={`h-12 flex-1 rounded-[4px] ${
                peak
                  ? "bg-brand-orange"
                  : dark
                  ? "bg-white/15"
                  : "bg-black/[0.08]"
              }`}
            />
          );
        })}
      </div>
      <div
        className={`mt-2 flex justify-between text-[12px] ${
          dark ? "text-white/50" : "text-mute"
        }`}
      >
        <span>midnight</span>
        <span className="font-semibold text-brand-orange">
          4–11 PM · on-peak
        </span>
        <span>midnight</span>
      </div>
    </div>
  );
}

function Src({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 border-t border-current/10 pt-3 text-[12px] leading-relaxed opacity-45">
      {children}
    </p>
  );
}

/* ---------- slides ---------- */

const slides: Slide[] = [
  /* 1 — title */
  {
    dark: true,
    kicker: "⚡ Hackathon concept",
    title: (
      <>
        Cool Shift
        <span className="mt-4 block text-[34px] font-extrabold leading-tight md:text-[42px]">
          Small actions.{" "}
          <span className="text-brand-orange">Everyday value.</span>
        </span>
      </>
    ),
    body: (
      <>
        <p>
          A personal AI assistant that turns a utility’s smart meters, tariffs,
          rewards and partners into <strong>one proactive customer journey</strong>{" "}
          — and gives 2.9 million households a reason to move load off the evening
          peak.
        </p>
        <Src>
          Built for a hackathon sponsored by CLP.
          Independent concept — not affiliated with or endorsed by CLP.
          All data is illustrative.
        </Src>
      </>
    ),
  },

  /* 2 — problem: the peak */
  {
    kicker: "The problem · for the utility",
    title: "The grid is sized for seven hours a day.",
    body: (
      <>
        <DayStrip />
        <Stats
          items={[
            { v: "7,336 MW", l: "CLP peak demand, 2024" },
            { v: `${hkd}52.9 bn`, l: "CLP capital plan, 2024–28" },
            { v: "~38%", l: "of home electricity is air conditioning" },
            { v: "61%", l: "of HK emissions come from power generation" },
          ]}
        />
        <p className="text-[17px]">
          Hong Kong switches on its air conditioning in the same evening hours.
          The utility builds wires and capacity for that evening, and carries the cost of
          it all year.
        </p>
        <Src>
          CLP Power Information Highlights 2024 · CLP 2024–28 Development Plan
          (EEB, Nov 2023) · EMSD HK Energy End-use Data · Environment Bureau,
          Climate Action Plan 2050 (2023 figure).
        </Src>
      </>
    ),
  },

  /* 3 — problem: the customer */
  {
    dark: true,
    kicker: "The problem · for the customer",
    title: "Your bill doesn’t know what time it is.",
    body: (
      <>
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-5">
            <div className="text-[13px] font-semibold uppercase tracking-wider text-white/50">
              2.9 m households
            </div>
            <div className="mt-1.5 text-[21px] font-bold">Block tariff</div>
            <p className="mt-2 text-[15px] leading-snug text-white/70">
              Read every two months. The rate goes up with how much you use. The
              hour never enters the calculation.
            </p>
            <p className="mt-3 text-[15px] font-semibold text-brand-orange">
              Run the dryer at midnight and the bill is the same.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-5">
            <div className="text-[13px] font-semibold uppercase tracking-wider text-white/50">
              EV owners only · since May 2025
            </div>
            <div className="mt-1.5 text-[21px] font-bold">Time-of-Use tariff</div>
            <div className="mt-2.5 space-y-1 text-[15px] text-white/70">
              <div>
                4–11 PM <strong className="text-white">137.5¢</strong> per unit
              </div>
              <div>
                11 PM–4 PM <strong className="text-white">94.5¢</strong> per unit
              </div>
            </div>
            <p className="mt-3 text-[15px] font-semibold text-brand-orange">
              A 31% gap, and a home charger to qualify.
            </p>
          </div>
        </div>
        <p className="text-[17px] leading-snug">
          <strong>Our thesis:</strong> Cool Shift builds the missing price signal
          out of points and partner value, so a household gets paid for shifting.
          No tariff reform required.
        </p>
        <Src>
          CLP Residential Tariff 2026 · CLP Electric Vehicle Residential Time of
          Use Tariff, 2026 rates.
        </Src>
      </>
    ),
  },

  /* 4 — why now */
  {
    kicker: "Why now",
    title: "The meters just finished rolling out.",
    body: (
      <>
        <Stats
          items={[
            { v: "2.88 m", l: "smart meters, rollout completed end-2025" },
            { v: "131,700", l: "EVs on HK roads, Sept 2025" },
            { v: "71%", l: "of new private cars in 2025 were electric" },
            { v: "2050", l: "statutory carbon-neutrality target" },
          ]}
        />
        <ul className="space-y-2.5 text-[17px]">
          <li>
            Every home on the network now sends readings by the half hour. Until this year,
            there was nothing to personalise with.
          </li>
          <li>
            A single EV charging at 7 PM adds about a whole household’s daily
            electricity on top of the peak, and the fleet is growing fast.
          </li>
        </ul>
        <Src>
          CLP Power press release, 5 March 2026 · Transport Department / The
          Standard, Oct 2025 · Climate Change Ordinance targets.
        </Src>
      </>
    ),
  },

  /* 5 — the product */
  {
    kicker: "The product · in one minute",
    title: "Three moves a day. Each one action, each with a number.",
    body: (
      <>
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <Gauge size={17} className="mb-1.5" />
            <strong>Energy insights</strong>
            <br />
            <span className="text-mute">
              A personal energy profile, the bill decomposed line by line, and
              daily tips with a {hkd} figure attached.
            </span>
          </div>
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <CarFront size={17} className="mb-1.5" />
            <strong>Smart home & e-mobility</strong>
            <br />
            <span className="text-mute">
              AC scheduling tuned to humidity; EV and e-bike charging moved into
              the 11 PM–4 PM off-peak window.
            </span>
          </div>
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <Heart size={17} className="mb-1.5" />
            <strong>Inclusive journeys</strong>
            <br />
            <span className="text-mute">
              Cantonese, English, Mandarin with voice. Large-text simple mode, a
              caregiver view for elderly relatives, budget alerts — and{" "}
              <strong>no smart-home hardware required</strong>.
            </span>
          </div>
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <Target size={17} className="mb-1.5" />
            <strong>Partner platform</strong>
            <br />
            <span className="text-mute">
              Points earned on energy missions, redeemed with local partners. The
              utility earns commission; partners get measurable demand.
            </span>
          </div>
        </div>
        <p className="text-[15.5px] opacity-70">
          No charts to decode. No guilt. Three moves that pay — and a strict
          three-tip daily limit so it never becomes noise.
        </p>
      </>
    ),
  },

  /* 6 — demo */
  {
    kicker: "Live product",
    title: "It’s running. Let’s walk through it.",
    body: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-[15px]">
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <strong>Home</strong>
            <br />
            today’s 3 moves
          </div>
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <strong>Insights</strong>
            <br />
            bill explained in {hkd}
          </div>
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <strong>Ask</strong>
            <br />
            “Why is my bill higher?”
          </div>
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <strong>Rewards</strong>
            <br />
            missions → local partners
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white"
        >
          Open the app <ArrowRight size={15} />
        </Link>
      </div>
    ),
  },

  /* 7 — what the utility already has, and why it falls short */
  {
    kicker: "The status quo",
    title: "Saving is already rewarded.",
    body: (
      <>
        <ul className="space-y-4">
          <li>
            <strong>Renewable Energy Certificates</strong> — sold from 100 units
            and paid in cash.
            <Gap>a household can’t realistically take part.</Gap>
          </li>
          <li>
            <strong>Power Connect / Domeo Points</strong> — points for
            paperless billing and autopay, redeemed for supermarket coupons and
            Asia Miles.
            <Gap>the rewards have nothing to do with energy.</Gap>
          </li>
          <li>
            <strong>Energy-Saving Rewards</strong> — 200 points if this bill is
            lower than the same one last year.
            <Gap>
              arrives up to two months late, and never says how or when to
              save.
            </Gap>
          </li>
        </ul>
        <p className="mt-5 text-[16.5px] font-semibold">
          All three pay you for using less electricity. None of them pays you for
          using it{" "}
          <span className="text-brand-orange">at a different hour</span>, which is
          what the grid needs.
        </p>
        <Src>
          CLP Power Connect & Domeo terms, clp.com.hk · CLP Renewable Energy
          Certificates.
        </Src>
      </>
    ),
  },

  /* 8 — new partnerships */
  {
    dark: true,
    kicker: "Our proposal",
    title: "Points that mean something where people live.",
    body: (
      <>
        <ul className="space-y-2.5">
          <li>🧊 <strong>Aircon cleaning and servicing</strong> at a discount — the offer arrives when the unit’s efficiency actually drops.</li>
          <li>🍜 <strong>Local cha chaan teng vouchers valid 6–9 PM</strong> — eat out at peak, cook and cool less at home. The reward <em>is</em> the load shift.</li>
          <li>🏢 <strong>{hkd}50 off monthly estate management fees</strong>, or discounted home-safety insurance, via property managers.</li>
          <li>🌱 <strong>Fractional RECs</strong> — pool household points to buy certificates in the 100-unit blocks the programme already sells, opening a corporate product to families.</li>
          <li>🔌 <strong>EV operators</strong> — 15% off or bonus credits on off-peak charging sessions.</li>
        </ul>
        <p className="mt-5 rounded-2xl bg-white/10 p-4 text-[15.5px] leading-snug">
          Partners pay only for results, and reach the customer at the moment of
          need. Nothing on the list increases energy use — that is a hard rule, not
          a preference.
        </p>
      </>
    ),
  },

  /* 9 — value proposition */
  {
    kicker: "Value proposition",
    title: "Four winners, one loop.",
    body: (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-black/[0.04] p-4">
          <Users size={17} className="mb-1.5" />
          <strong>Customers</strong>
          <br />
          <span className="text-mute">
            Lower bills without losing comfort · three clear actions a day instead
            of charts · rewards for local services they already use.
          </span>
        </div>
        <div className="rounded-2xl bg-black/[0.04] p-4">
          <Zap size={17} className="mb-1.5" />
          <strong>The utility</strong>
          <br />
          <span className="text-mute">
            A lower evening peak against a {hkd}52.9 bn capex plan · daily rather
            than bi-monthly contact · new partnership revenue · supplier →
            trusted energy and lifestyle partner.
          </span>
        </div>
        <div className="rounded-2xl bg-black/[0.04] p-4">
          <Target size={17} className="mb-1.5" />
          <strong>Partners</strong>
          <br />
          <span className="text-mute">
            Appliance brands, AC servicers, charging operators, property managers
            and local shops reach customers at the moment of need, and pay only
            for results.
          </span>
        </div>
        <div className="rounded-2xl bg-black/[0.04] p-4">
          <Leaf size={17} className="mb-1.5" />
          <strong>Hong Kong</strong>
          <br />
          <span className="text-mute">
            Less peak strain and lower emissions, achieved through behaviour
            rather than new infrastructure — on the path to carbon neutrality
            before 2050.
          </span>
        </div>
      </div>
    ),
  },

  /* 10 — responsible AI */
  {
    dark: true,
    kicker: "Purposeful AI — an enabler of value, not a demo",
    title: "The model explains. The numbers come from the meter.",
    body: (
      <>
        <ul className="space-y-3">
          <li>
            <strong>Personalisation</strong> — learns each household’s load pattern
            from smart-meter data and a short profile.
          </li>
          <li>
            <strong>Optimisation</strong> — picks the best time to cool, charge and
            run appliances against weather, humidity and tariff.
          </li>
          <li>
            <strong>Explanation</strong> — turns meter data into plain language with
            a {hkd} figure attached.
          </li>
          <li>
            <strong>Dialogue</strong> — answers “Why did my bill go up?” in
            Cantonese, English or Mandarin.
          </li>
        </ul>
        <p className="mt-5 border-t border-white/15 pt-4 text-white/75">
          Savings are calculated deterministically from real meter data and
          published tariffs; the language model only explains them. Every tip is one
          specific action with a measurable result — so success is judged by{" "}
          <strong>kWh shifted and dollars saved, not chat volume</strong>.
        </p>
      </>
    ),
  },

  /* 11 — pilot */
  {
    kicker: "Pilot · 12 weeks, this summer",
    title: "1,000 households. A matched control group. Real numbers.",
    body: (
      <>
        <p className="mb-4 opacity-70">
          One or two estates with smart meters · ≈100 EV owners · an
          elderly-resident cohort · 5–10 local partners · running inside the
          utility’s existing app, so there is nothing for a customer to install.
        </p>
        <ul className="space-y-2">
          <li>
            ✅ Evening-peak (4–11 PM) consumption <strong>5–8% below control</strong>
          </li>
          <li>✅ ≥60% of EV charging moved into the off-peak window</li>
          <li>✅ ≥40% weekly active users · ≥30% of tips acted on</li>
          <li>✅ Average verified saving per household, in {hkd}</li>
          <li>✅ Reward redemption rate · partner repeat rate</li>
        </ul>
        <p className="mt-4 text-[15.5px] opacity-70">
          The control group is the point: every figure we report is a difference
          against households that did not get the app, not a before-and-after that
          the weather could explain.
        </p>
      </>
    ),
  },

  /* 12 — risks, scale, ask */
  {
    kicker: "Risks → mitigations · route to scale",
    title: "Safe today, bigger tomorrow.",
    body: (
      <div className="space-y-3">
        <ul className="space-y-2 text-[15px]">
          <li>
            <ShieldCheck size={14} className="mr-1.5 inline" />
            <strong>Privacy</strong> — opt-in consent, data minimisation, no
            household data shared with partners.
          </li>
          <li>
            <ShieldCheck size={14} className="mr-1.5 inline" />
            <strong>Wrong advice</strong> — savings shown as ranges from
            deterministic calculations; human-reviewed tip library.
          </li>
          <li>
            <Heart size={14} className="mr-1.5 inline" />
            <strong>Health</strong> — never advise reducing cooling during
            hot-weather warnings or for vulnerable users.
          </li>
          <li>
            <MessageCircle size={14} className="mr-1.5 inline" />
            <strong>Engagement</strong> — missions, and a strict three-tip daily
            limit.
          </li>
          <li>
            <Building2 size={14} className="mr-1.5 inline" />
            <strong>Trust</strong> — offers clearly labelled; none that increase
            energy use.
          </li>
        </ul>
        <p className="border-t border-black/10 pt-3">
          <strong>Scale:</strong> pilot → all smart-meter app users → smart-home
          device control and an open partner API → automated demand response, with
          a household ToU tariff as the eventual prize.
        </p>
        <p className="flex items-center gap-2 text-[19px] font-bold text-brand-orange">
          <CircleDollarSign size={18} /> The ask: approval to run the 12-week pilot
          this summer.
        </p>
      </div>
    ),
  },
];

export default function PitchPage() {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];

  const go = useCallback(
    (d: number) => setIdx((i) => Math.min(slides.length - 1, Math.max(0, i + d))),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div
      className={`flex min-h-dvh flex-col ${
        slide.dark ? "bg-brand-navy text-white" : "bg-paper text-ink"
      }`}
    >
      {/* progress */}
      <div className="mx-auto w-full max-w-3xl px-6 pt-5">
        <div className={`h-1 w-full rounded-full ${slide.dark ? "bg-white/15" : "bg-black/10"}`}>
          <div
            className={`h-full rounded-full transition-all ${slide.dark ? "bg-white" : "bg-ink"}`}
            style={{ width: `${((idx + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* slide */}
      <main key={idx} className="slide-in mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-8">
        {slide.kicker && (
          <div className={`mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] ${slide.dark ? "text-white/50" : "text-mute"}`}>
            {slide.kicker}
          </div>
        )}
        <h1 className="text-[30px] font-bold leading-[1.12] tracking-tight md:text-[40px]">
          {slide.title}
        </h1>
        <div className={`mt-6 text-[16px] leading-relaxed md:text-[17.5px] ${slide.dark ? "text-white/85" : "text-ink/85"}`}>
          {slide.body}
        </div>
      </main>

      {/* controls */}
      <footer className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 pb-6">
        <span className={`text-[12.5px] font-medium ${slide.dark ? "text-white/40" : "text-mute"}`}>
          {idx + 1} / {slides.length} · ← → to navigate
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={idx === 0}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition disabled:opacity-25 ${
              slide.dark ? "border-white/25" : "border-black/15"
            }`}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={idx === slides.length - 1}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition disabled:opacity-25 ${
              slide.dark ? "bg-white text-ink" : "bg-ink text-white"
            }`}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
}
