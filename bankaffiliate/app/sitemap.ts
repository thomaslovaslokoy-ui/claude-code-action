import type { MetadataRoute } from "next";
import { BANKS, CATEGORIES } from "@/lib/banks";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bankaffiliate.com";

  const staticPages = [
    "",
    "/banks",
    "/compare",
    "/quiz",
    "/about",
    "/advertise",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-03-17"),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  const bankPages = BANKS.map((bank) => ({
    url: `${base}/banks/${bank.slug}`,
    lastModified: new Date("2026-03-17"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${base}/category/${cat.slug}`,
    lastModified: new Date("2026-03-17"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...bankPages, ...categoryPages];
}
