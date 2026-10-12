import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Box, Check, ChevronDown, Flame, Gift, Mail, Search, ShoppingBag, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stores, storeLinks, type Store } from "@/lib/deals";
import walmartLogo from "@/assets/walmart-logo.jpg.asset.json";
import costcoLogo from "@/assets/costco-logo.jpg.asset.json";
import targetLogo from "@/assets/target-logo.jpg.asset.json";

const SITE_URL = "https://joy-deploy-pages.lovable.app";
const description = "Discover Walmart, Costco and Target discounts with Big Box Finds. Browse home, kitchen, electronics, beauty, toys and cleaning deals, with prices and last-checked dates.";
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Big Box Finds | Walmart, Costco & Target Deals" },
      { name: "description", content: description },
      { property: "og:title", content: "Big Box Finds | Walmart, Costco & Target Deals" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Big Box Finds | Walmart, Costco & Target Deals" },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "Big Box Finds", url: SITE_URL, description }) }],
  }),
});

const storeLogos: Record<Store, string> = {
  Walmart: walmartLogo.url,
  Costco: costcoLogo.url,
  Target: targetLogo.url,
};
const steps = [
  { icon: Gift, title: "Claim an offer", text: "Pick Walmart, Costco or Target and tap Claim Now to open the offer in a new tab." },
  { icon: Search, title: "Register", text: "Enter your email and basic info to complete the registration steps." },
  { icon: ShoppingBag, title: "Enjoy your voucher", text: "Complete the sponsored deals, then enjoy the exclusive offer at the store." },
];
const faqs = [
  { q: "Are the deals real?", a: "This preview contains sample products, prices, dates and placeholder links—not verified live offers. Published offers should link to the retailer, where you can confirm the current price before buying." },
  { q: "How do you earn money?", a: "We may earn a commission when you buy through affiliate links on this site. Big Box Finds is independent and is not owned by or affiliated with Walmart, Costco or Target." },
  { q: "How often is it updated?", a: "The deal list is intended to be refreshed regularly. Each card includes a last-checked date. The current dates are sample data; there is no automated price checking." },
  { q: "Are prices guaranteed?", a: "No. Prices and availability can change without notice and may vary by location or membership. The price shown at the store at checkout is the final price." },
];
const disclosure = "We may earn a commission when you buy through links on this site. Prices and availability can change. We are not owned by or affiliated with Walmart, Costco or Target.";

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a href="#top" aria-label="Big Box Finds home" className={`inline-flex shrink-0 items-center gap-2.5 ${inverse ? "text-inverse-foreground" : "text-foreground"}`}>
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><Box className="size-5" aria-hidden="true" /></span>
    <span className="font-display text-[18px] font-extrabold">Big Box Finds<span className="text-primary">.</span></span>
  </a>;
}

function useMidnightCountdown() {
  const [remaining, setRemaining] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const seconds = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      setRemaining(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return remaining;
}

const claimNames = ["Jessica J. from FL", "Michael R. from TX", "Ashley K. from OH", "David M. from GA", "Samantha P. from NC", "Chris T. from AZ", "Emily W. from PA", "Marcus B. from IL"];
const claimOffers: { store: Store; amount: string }[] = [
  { store: "Walmart", amount: "$750" },
  { store: "Costco", amount: "$500" },
  { store: "Target", amount: "$500" },
];

function ClaimNotification() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((value) => value + 1), 5000);
    return () => clearInterval(id);
  }, []);
  const name = claimNames[tick % claimNames.length] ?? claimNames[0]!;
  const { store, amount } = claimOffers[tick % claimOffers.length] ?? claimOffers[0]!;
  return <div key={tick} role="status" aria-live="polite" className="claim-pop fixed bottom-4 left-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl bg-card p-3.5 pr-5 shadow-[var(--shadow-card)]">
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-success text-success-foreground"><Check className="size-5" aria-hidden="true" /></span>
    <p className="text-sm leading-snug">
      <span className="block font-display text-base font-extrabold">{name}</span>
      <span className="text-muted-foreground">Just claimed <span className="font-extrabold text-deal">{amount}</span> {store} reward!</span> <span aria-hidden="true">🎉</span>
    </p>
  </div>;
}

function ClaimedBanner() {
  return <div className="w-full bg-primary">
    <p className="mx-auto flex max-w-[1200px] items-center justify-center gap-2 px-5 py-3 text-center font-display text-sm font-extrabold uppercase tracking-wide text-primary-foreground sm:text-base">
      <Flame className="size-5 shrink-0" aria-hidden="true" />
      <span>3,500+ People Already Claimed</span>
    </p>
  </div>;
}

function StoreCard({ store }: { store: Store }) {
  const remaining = useMidnightCountdown();
  return <article className="card-hover relative flex flex-col overflow-hidden rounded-xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
    <span className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-primary-foreground">Claim Now</span>
    <div className="flex h-16 items-center"><img src={storeLogos[store]} alt={`${store} logo`} width={160} height={64} loading="lazy" className="max-h-16 w-auto object-contain" /></div>
    <h3 className="mt-4 font-display text-2xl font-extrabold">{store}</h3>
    <p className="mt-1 text-sm text-muted-foreground">Today's best deals at {store}.</p>
    <p className="mt-3 flex items-center gap-2 text-sm font-bold text-primary"><Timer className="size-4 shrink-0" aria-hidden="true" />Offer ends in <span className="tabular-nums">{remaining ?? "--:--:--"}</span></p>
    <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Gift className="size-4 shrink-0 text-primary" aria-hidden="true" />Gift card & coupon offers available</p>
    <Button asChild className="mt-5 h-12 w-full rounded-lg font-bold"><a href={storeLinks[store]} target="_blank" rel="sponsored noopener" aria-label={`Claim Now: ${store} offer (opens in a new tab)`}>Claim Now<ArrowUpRight aria-hidden="true" /></a></Button>
  </article>;
}

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return <div id="top" className="min-h-screen bg-background text-foreground">
    <a href="#deals" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:p-3 focus:text-primary-foreground">Skip to deals</a>
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-3 px-5 sm:px-8">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex"><a href="#deals" className="hover:text-primary">The deals</a><a href="#how-it-works" className="hover:text-primary">How it works</a><a href="#faq" className="hover:text-primary">FAQ</a></nav>
        <Button asChild className="h-10 rounded-lg px-4 font-bold sm:px-5"><a href="#deals">See Deals<ArrowUpRight className="hidden sm:block" aria-hidden="true" /></a></Button>
      </div>
    </header>
    <ClaimedBanner />
    <main>
      <section id="deals" aria-labelledby="deals-title" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16">
        <div><h2 id="deals-title" className="text-3xl font-extrabold sm:text-4xl">Complete Your Registration</h2><p className="mt-2 text-xs text-muted-foreground">Follow these simple steps to complete your registration and access your exclusive offer.</p></div>
        <ol className="mt-6 flex flex-col gap-3">
          {['Click "Claim Now"', "Enter your email and basic info", "Complete 4–5 sponsored deals", "Enjoy Your $750 Voucher!"].map((text, i) => <li key={text} className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-[var(--shadow-card)]"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary font-display text-xl font-extrabold text-primary-foreground">{i + 1}</span><span className="text-base font-bold">{text}</span></li>)}
        </ol>
        <div className="mt-7 flex items-start gap-3 rounded-xl border border-primary/30 bg-accent px-4 py-3">
          <Gift className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm font-semibold leading-snug">Limited-time coupon and gift card offers are live at every store — <span className="font-extrabold text-primary">Claim Now</span> before the timer runs out.</p>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {stores.map((store) => <StoreCard key={store} store={store} />)}
        </div>
      </section>
      <section id="how-it-works" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-center text-xs font-bold uppercase text-primary">Less scrolling. More saving.</p><h2 className="mt-3 text-center text-3xl font-extrabold sm:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-9 sm:grid-cols-3 sm:gap-8">{steps.map(({ icon: Icon, title, text }, i) => <div key={title} className="relative border-t pt-6"><div className="flex items-center justify-between"><span className="font-display text-4xl font-extrabold text-border">0{i + 1}</span><Icon className="size-6 text-primary" aria-hidden="true" /></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div>
      </section>
      <section id="newsletter" className="scroll-mt-24 bg-inverse text-inverse-foreground">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-2 md:gap-16"><div><p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-inverse-muted"><Mail className="size-4" />The good finds, in your inbox</p><h2 className="text-3xl font-extrabold sm:text-4xl">Get weekly deals<span className="text-primary">.</span></h2><p className="mt-3 text-sm leading-relaxed text-inverse-muted">Your favorite stores. One weekly roundup.</p></div>
          {subscribed ? <div role="status" className="border-l-2 border-primary pl-5"><Check className="mb-3 size-6 text-primary" /><h3 className="text-lg font-bold">Thank you for your interest!</h3><p className="mt-2 text-sm text-inverse-muted">This is a signup preview. Your address hasn’t been saved, and no emails will be sent.</p></div> : <form onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubscribed(true); }}><label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium">Email address</label><div className="flex flex-col gap-3 sm:flex-row"><input id="newsletter-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 min-w-0 flex-1 rounded-lg border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" /><Button type="submit" className="h-12 rounded-lg px-5 font-bold">Sign me up<ArrowRight /></Button></div><p className="mt-3 text-xs text-inverse-muted">Preview signup only. No emails are stored or sent.</p></form>}
        </div>
      </section>
      <section id="faq" className="mx-auto grid max-w-[1200px] scroll-mt-24 gap-8 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[1fr_1.6fr] md:gap-20"><div><p className="text-xs font-bold uppercase text-primary">A little clarity</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Good questions.<br />Straight answers.</h2></div><div className="border-t">{faqs.map((faq, i) => <div key={faq.q} className="border-b"><h3><Button variant="ghost" aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)} className="h-auto min-h-16 w-full justify-between gap-4 whitespace-normal rounded-none px-0 py-5 text-left text-[15px] font-bold hover:bg-transparent hover:text-primary">{faq.q}<ChevronDown className={`shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} aria-hidden="true" /></Button></h3><div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={openFaq !== i}><p className="pb-5 pr-6 text-sm leading-relaxed text-muted-foreground">{faq.a}</p></div></div>)}</div></section>
    </main>
    <footer className="border-t bg-secondary"><div className="mx-auto max-w-[1200px] px-5 py-9 sm:px-8"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><Brand /><nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground"><a href="#deals" className="hover:text-primary">Deals</a><a href="#how-it-works" className="hover:text-primary">How it works</a><a href="#newsletter" className="hover:text-primary">Weekly deals</a><a href="#faq" className="hover:text-primary">FAQ</a></nav></div><div className="mt-7 grid gap-5 border-t pt-6 md:grid-cols-[1fr_auto]"><p className="max-w-[720px] text-xs leading-relaxed text-muted-foreground">{disclosure}</p><p className="text-xs text-muted-foreground">© 2026 Big Box Finds</p></div></div></footer>
    <ClaimNotification />
  </div>;
}
