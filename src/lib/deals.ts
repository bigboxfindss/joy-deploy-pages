import airFryer from "@/assets/deals/air-fryer.jpg";
import smartTv from "@/assets/deals/smart-tv.jpg";
import headphones from "@/assets/deals/headphones.jpg";
import vacuum from "@/assets/deals/vacuum.jpg";
import coffeeMaker from "@/assets/deals/coffee-maker.jpg";
import toyBlocks from "@/assets/deals/toy-blocks.jpg";
import skincareSet from "@/assets/deals/skincare-set.jpg";
import towels from "@/assets/deals/towels.jpg";
import robotVacuum from "@/assets/deals/robot-vacuum.jpg";
import cookware from "@/assets/deals/cookware.jpg";
import speaker from "@/assets/deals/speaker.jpg";
import cleaningSet from "@/assets/deals/cleaning-set.jpg";

// Sample prices, images, dates and links — replace these with your real affiliate deals.
// This is the single editable list for every store and category.
export const deals: Deal[] = [
  {
    title: "6-Quart Digital Air Fryer",
    store: "Walmart",
    category: "Kitchen",
    oldPrice: 129.0,
    newPrice: 79.0,
    image: airFryer,
    link: "https://example.com/affiliate/air-fryer",
    lastChecked: "Oct 11, 2026",
  },
  {
    title: '55" 4K UHD Smart TV',
    store: "Costco",
    category: "Electronics",
    oldPrice: 499.99,
    newPrice: 329.99,
    image: smartTv,
    link: "https://example.com/affiliate/smart-tv",
    lastChecked: "Oct 11, 2026",
  },
  {
    title: "Wireless Noise-Cancelling Headphones",
    store: "Target",
    category: "Electronics",
    oldPrice: 199.99,
    newPrice: 119.99,
    image: headphones,
    link: "https://example.com/affiliate/headphones",
    lastChecked: "Oct 10, 2026",
  },
  {
    title: "Cordless Stick Vacuum",
    store: "Walmart",
    category: "Cleaning",
    oldPrice: 249.0,
    newPrice: 149.0,
    image: vacuum,
    link: "https://example.com/affiliate/stick-vacuum",
    lastChecked: "Oct 11, 2026",
  },
  {
    title: "Stainless Espresso Machine",
    store: "Target",
    category: "Kitchen",
    oldPrice: 299.99,
    newPrice: 199.99,
    image: coffeeMaker,
    link: "https://example.com/affiliate/espresso",
    lastChecked: "Oct 9, 2026",
  },
  {
    title: "100-Piece Building Block Set",
    store: "Walmart",
    category: "Toys",
    oldPrice: 39.99,
    newPrice: 24.99,
    image: toyBlocks,
    link: "https://example.com/affiliate/blocks",
    lastChecked: "Oct 11, 2026",
  },
  {
    title: "Radiant Skin Care Gift Set",
    store: "Target",
    category: "Beauty",
    oldPrice: 85.0,
    newPrice: 54.0,
    image: skincareSet,
    link: "https://example.com/affiliate/skincare",
    lastChecked: "Oct 10, 2026",
  },
  {
    title: "6-Piece Plush Bath Towel Set",
    store: "Costco",
    category: "Home",
    oldPrice: 49.99,
    newPrice: 29.99,
    image: towels,
    link: "https://example.com/affiliate/towels",
    lastChecked: "Oct 11, 2026",
  },
  {
    title: "Robot Vacuum with Smart Mapping",
    store: "Costco",
    category: "Cleaning",
    oldPrice: 399.99,
    newPrice: 259.99,
    image: robotVacuum,
    link: "https://example.com/affiliate/robot-vacuum",
    lastChecked: "Oct 9, 2026",
  },
  {
    title: "10-Piece Non-Stick Cookware Set",
    store: "Walmart",
    category: "Kitchen",
    oldPrice: 159.99,
    newPrice: 89.99,
    image: cookware,
    link: "https://example.com/affiliate/cookware",
    lastChecked: "Oct 10, 2026",
  },
  {
    title: "Portable Bluetooth Speaker",
    store: "Target",
    category: "Electronics",
    oldPrice: 79.99,
    newPrice: 44.99,
    image: speaker,
    link: "https://example.com/affiliate/speaker",
    lastChecked: "Oct 11, 2026",
  },
  {
    title: "Eco-Friendly Cleaning Supplies Set",
    store: "Costco",
    category: "Cleaning",
    oldPrice: 34.99,
    newPrice: 21.99,
    image: cleaningSet,
    link: "https://example.com/affiliate/cleaning-set",
    lastChecked: "Oct 10, 2026",
  },
];

export type Category = "Home" | "Kitchen" | "Electronics" | "Beauty" | "Toys" | "Cleaning";

export type Store = "Walmart" | "Costco" | "Target";

export interface Deal {
  title: string;
  store: Store;
  category: Category;
  oldPrice: number;
  newPrice: number;
  image: string;
  /** Replace with your affiliate URL */
  link: string;
  lastChecked: string;
}

export const stores: Store[] = ["Walmart", "Costco", "Target"];
export const defaultStore: Store = "Walmart";

// Official store affiliate links — used by the store cards and every deal.
export const storeLinks: Record<Store, string> = {
  Walmart: "https://linkthem.net/aff_c?offer_id=1913&aff_id=88950",
  Costco: "https://linkthem.net/aff_c?offer_id=4452&aff_id=88950",
  Target: "https://linkthem.net/aff_c?offer_id=3844&aff_id=88950",
};

export const filterDeals = (store: Store, category: Category | null = null) =>
  deals.filter((deal) => deal.store === store && (category === null || deal.category === category));

export const percentOff = (deal: Deal) =>
  deal.oldPrice > 0 ? Math.max(0, Math.min(100, Math.round(((deal.oldPrice - deal.newPrice) / deal.oldPrice) * 100))) : 0;

export const formatPrice = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });
