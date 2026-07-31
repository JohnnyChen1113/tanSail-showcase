import { z } from "zod";

const changelogSchema = z.array(
  z.object({
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    date: z.iso.date(),
    title: z.string().min(1),
    summary: z.string().min(1),
    changes: z.array(z.string().min(1)).min(1),
  }),
);

const legalPageSchema = z.object({
  title: z.string().min(1),
  effectiveDate: z.iso.date(),
  notice: z.string().min(1),
  sections: z.array(
    z.object({
      title: z.string().min(1),
      paragraphs: z.array(z.string().min(1)).min(1),
    }),
  ),
});

const contactPageSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  channels: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
      href: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
});

export const changelogEntries = changelogSchema.parse([
  {
    version: "0.3.0",
    date: "2026-07-27",
    title: "Composable pages",
    summary: "Landing blocks, Gallery previews, page recipes, and optional content modules.",
    changes: [
      "Added nine typed landing-page block families.",
      "Added responsive Gallery and six complete page recipes.",
      "Added optional MDX documentation and blog routes.",
    ],
  },
  {
    version: "0.2.0",
    date: "2026-07-23",
    title: "Visual direction",
    summary: "A semantic preset system with three materially different design directions.",
    changes: [
      "Added Harbor, Horizon, and Nightwatch.",
      "Added persisted, flash-free preset selection.",
      "Added responsive visual regression coverage.",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-07-23",
    title: "Reliable foundation",
    summary: "A focused TanStack Start and Cloudflare Workers starter core.",
    changes: [
      "Removed required authentication, database, and service integrations.",
      "Added typed site configuration and accessible shell components.",
      "Added checks, tests, build, prerender, and deployment guidance.",
    ],
  },
]);

export const legalPage = legalPageSchema.parse({
  title: "Terms and privacy starter",
  effectiveDate: "2026-07-27",
  notice:
    "This page is an implementation example, not legal advice. Replace it with terms reviewed for your product, jurisdiction, and data practices.",
  sections: [
    {
      title: "Use of the service",
      paragraphs: [
        "Describe who may use the service, acceptable use, account responsibilities, and any important product limitations.",
      ],
    },
    {
      title: "Payments and cancellation",
      paragraphs: [
        "Explain prices, billing cadence, taxes, refunds, renewals, cancellation, and what happens when a paid plan ends.",
      ],
    },
    {
      title: "Data and privacy",
      paragraphs: [
        "List the data collected, purposes, processors, retention periods, user choices, and a contact for privacy requests.",
      ],
    },
    {
      title: "Warranty and liability",
      paragraphs: [
        "Use language appropriate to the product and jurisdiction. Do not copy a generic limitation without professional review.",
      ],
    },
  ],
});

export const contactPage = contactPageSchema.parse({
  title: "Start a useful conversation.",
  description:
    "Keep the default contact path simple and browser-only. Replace these example channels with the ones your project actually monitors.",
  channels: [
    {
      label: "General",
      value: "hello@example.com",
      href: "mailto:hello@example.com",
      description: "Questions about the product, partnership ideas, and general requests.",
    },
    {
      label: "Support",
      value: "support@example.com",
      href: "mailto:support@example.com",
      description: "Product issues and help from existing users.",
    },
    {
      label: "Security",
      value: "security@example.com",
      href: "mailto:security@example.com",
      description: "Private disclosure of a potential security issue.",
    },
  ],
});
