import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgePercent,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Home,
  Mail,
  Search,
  ShoppingBag,
  Sparkles,
  SprayCan,
  Tag,
  ToyBrick,
  Tv,
  UtensilsCrossed,
} from "lucide-react";
import { deals, formatPrice, percentOff, type Store } from "@/lib/deals";

const SITE_URL = "https://joy-deploy-pages.lovable.app";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Big Box Finds — Today's Best Walmart, Costco & Target Deals" },
      {
        name: "description",
        content:
          "Big Box Finds tracks the best daily discounts at Walmart, Costco and Target. Verified prices, bold savings, and hand-picked deals updated every day.",
      },
      {
        property: "og:title",
        content: "Big Box Finds — Today's Best Big Box Deals",
      },
      {
        property: "og:description",
        content:
          "The best daily discounts at Walmart, Costco and Target, verified and updated every day.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Big Box Finds",
          url: SITE_URL,
          description:
            "Daily curated discounts from Walmart, Costco and Target.",
        }),
      },
    ],
  }),
});

const storeFilters: Array<"All" | Store> = ["All", "Walmart", "Costco", "Target"];

const categories = [
  { name: "Home", icon: Home },
  { name: "Kitchen", icon: UtensilsCrossed },
  { name: "Electronics", icon: Tv },
  { name: "Beauty", icon: Sparkles },
  { name: "Toys", icon: ToyBrick },
  { name: "Cleaning", icon: SprayCan },
];

const steps = [
  {
    icon: Search,
    title: "We hunt the deals",
    text: "Every morning we scan Walmart, Costco and Target for real price drops worth your time.",
  },
  {
    icon: CheckCircle2,
    title: "We verify the price",
    text: "Each deal is checked against the store's live price and stamped with a last-checked date.",
  },
  {
    icon: Tag,
    title: "You save money",
    text: "Tap View Deal to go straight to the store and lock in the price before it changes.",
  },
];

const faqs = [
  {
    q: "Are these prices guaranteed?",
    a: "No. Prices and availability at Walmart, Costco and Target can change at any time. We show the price we last verified along with the date we checked it.",
  },
  {
    q: "How often are deals updated?",
    a: "We review and refresh the deal list every day, and each card shows its own last-checked date so you know how fresh it is.",
  },
  {
    q: "Does it cost me anything to use Big Box Finds?",
    a: "No, the site is free. We may earn a commission when you buy through our links, at no extra cost to you.",
  },
  {
    q: "Are you affiliated with Walmart, Costco or Target?",
    a: "No. Big Box Finds is an independent deal-curation site and is not owned by, endorsed by, or affiliated with any of these retailers.",
  },
];

function Index() {
  const [activeStore, setActiveStore] = useState<(typeof storeFilters)[number]>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const visibleDeals = useMemo(
    () =>
      activeStore === "All"
        ? deals
        : deals.filter((deal) => deal.store === activeStore),
    [activeStore],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-deal text-deal-foreground">
              <BadgePercent className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              Big Box Finds
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
            <a href="#deals" className="transition-colors hover:text-foreground">
              Deals
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
          <a
            href="#deals"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See Deals
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="border-b">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Clock3 className="h-3.5 w-3.5 text-deal" />
            Updated daily · Walmart · Costco · Target
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Today's Best <span className="text-deal">Big Box</span> Deals
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Hand-picked discounts from America's biggest stores, verified every
            morning so you never overpay again.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#deals"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-deal px-8 py-3.5 text-base font-bold text-deal-foreground shadow-lg transition-transform hover:scale-[1.03] sm:w-auto"
            >
              See Deals
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#newsletter"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border bg-card px-8 py-3.5 text-base font-semibold transition-colors hover:bg-accent sm:w-auto"
            >
              <Bell className="h-4 w-4" />
              Get deal alerts
            </a>
          </div>
        </div>
      </section>

      {/* Store filter tabs + deals grid */}
      <section id="deals" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-extrabold tracking-tight sm:text-3xl">
              Today's top picks
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {visibleDeals.length} deals verified by our team
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter deals by store">
          {storeFilters.map((store) => (
            <button
              key={store}
              role="tab"
              aria-selected={activeStore === store}
              onClick={() => setActiveStore(store)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeStore === store
                  ? "bg-primary text-primary-foreground"
                  : "border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {store}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleDeals.map((deal) => (
            <article
              key={deal.title}
              className="card-hover group flex flex-col overflow-hidden rounded-2xl border bg-card"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={deal.image}
                  alt={deal.title}
                  loading="lazy"
                  width={816}
                  height={816}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-savings px-2.5 py-1 text-xs font-bold text-savings-foreground">
                  {percentOff(deal)}% OFF
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                  {deal.store}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-bold leading-snug">{deal.title}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="price-now text-2xl">{formatPrice(deal.newPrice)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(deal.oldPrice)}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock3 className="h-3 w-3 shrink-0" />
                  Last checked {deal.lastChecked}
                </p>
                <a
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-deal hover:text-deal-foreground"
                >
                  View Deal
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
            Shop by category
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ name, icon: Icon }) => (
              <a
                key={name}
                href="#deals"
                className="card-hover flex flex-col items-center gap-3 rounded-2xl border bg-card px-4 py-6 text-center"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold">{name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
          How it works
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground">
          Three simple steps between you and a better price.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="card-hover rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-deal/10 text-deal">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl font-extrabold text-muted-foreground/40">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="border-y bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14 text-center sm:px-6 sm:py-20">
          <Mail className="mx-auto h-8 w-8" />
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Never miss a price drop
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80">
            One short email each morning with the best new deals. No spam, unsubscribe anytime.
          </p>
          {subscribed ? (
            <p className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-6 py-3 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              You're on the list! Watch your inbox tomorrow morning.
            </p>
          ) : (
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
              />
              <button
                type="submit"
                className="rounded-full bg-deal px-6 py-3 text-sm font-bold text-deal-foreground transition-transform hover:scale-[1.03]"
              >
                Sign up free
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="overflow-hidden rounded-2xl border bg-card">
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-deal text-deal-foreground">
                <ShoppingBag className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-extrabold">Big Box Finds</span>
            </span>
            <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
              We may earn a commission when you buy through links on this site.
              Prices and availability can change. We are not owned by or
              affiliated with Walmart, Costco or Target.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Big Box Finds. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
