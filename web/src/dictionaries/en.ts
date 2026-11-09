export const en = {
  meta: {
    title: "Rootwell Health — Root-cause wellness, online, worldwide",
    description:
      "Affordable, online functional-medicine-inspired programs, coaching and community. Join from anywhere in the world.",
  },
  nav: { programs: "Programs", pricing: "Pricing", how: "How it works", faq: "FAQ", join: "Join the waitlist" },
  hero: {
    eyebrow: "100% online · Available worldwide",
    title: "Get to the root of how you feel — without the $400 consult.",
    subtitle:
      "Group programs, coaching and education built on functional-medicine principles. Fair pricing adjusted for where you live.",
    ctaPrimary: "See programs",
    ctaSecondary: "View membership pricing",
    pricedFor: "Prices shown for",
  },
  how: {
    title: "Care that steps up only when you need it",
    subtitle: "Most people start with education and coaching. Clinical care is added only if it’s needed — that’s how we keep costs low.",
    steps: [
      { title: "1. Learn", body: "Self-paced lessons and a supportive community covering nutrition, sleep, stress and movement." },
      { title: "2. Join a group program", body: "Live, small-group sessions led by certified practitioners. One expert, many people, a fraction of the cost." },
      { title: "3. Get 1:1 coaching", body: "Asynchronous coaching: share food logs and questions anytime, get written guidance within 48 hours." },
      { title: "4. Clinical care (coming soon)", body: "Labs and consults with licensed clinicians, launching region by region where our clinicians are licensed." },
    ],
  },
  programs: {
    title: "Group programs",
    subtitle: "Structured, live, online programs. One-time payment.",
    weeks: "weeks",
    learnMore: "Learn more",
    buy: "Enroll now",
    includes: "What’s included",
    items: {
      "gut-reset": {
        name: "Gut Reset",
        weeks: 8,
        summary: "An 8-week elimination-and-reintroduction program to identify food triggers and rebuild digestive health.",
        bullets: [
          "8 live weekly group sessions (recorded)",
          "Guided elimination & reintroduction plan",
          "Meal plans and shopping lists",
          "Symptom tracker and progress check-ins",
        ],
      },
      "metabolic-balance": {
        name: "Metabolic Balance",
        weeks: 12,
        summary: "A 12-week program focused on blood-sugar balance, energy and sustainable habits.",
        bullets: [
          "12 live weekly group sessions (recorded)",
          "Blood-sugar-friendly meal framework",
          "Movement and sleep protocols",
          "Optional continuous-glucose-monitor guidance",
        ],
      },
      "energy-foundations": {
        name: "Energy & Hormone Foundations",
        weeks: 6,
        summary: "A 6-week introduction to the lifestyle foundations behind fatigue, stress and hormonal balance.",
        bullets: [
          "6 live weekly group sessions (recorded)",
          "Stress and circadian rhythm toolkit",
          "Nutrition foundations for hormonal health",
          "Private community access during the program",
        ],
      },
    },
  },
  pricing: {
    title: "Membership",
    subtitle: "Cancel anytime. Prices adjust to where you live so the same care is fair everywhere.",
    perMonth: "/month",
    currency: "Currency",
    regional: "Regional pricing applied for",
    subscribe: "Start membership",
    waitlist: "Join waitlist",
    popular: "Most popular",
    comingSoon: "Coming soon",
    plans: {
      community: {
        name: "Community",
        description: "Learn the foundations at your own pace.",
        features: ["Full lesson library", "Monthly live Q&A", "Member community", "Recipes & meal plans"],
      },
      coaching: {
        name: "Coaching",
        description: "Personal guidance from a certified health coach.",
        features: [
          "Everything in Community",
          "Asynchronous 1:1 coaching (48h replies)",
          "Monthly habit review",
          "20% off group programs",
        ],
      },
      clinical: {
        name: "Clinical",
        description: "Licensed clinician care, launching region by region.",
        features: [
          "Everything in Coaching",
          "Consults with a licensed clinician",
          "Lab ordering & review (where available)",
          "Personalized protocols",
        ],
      },
    },
  },
  waitlist: {
    title: "Join the waitlist",
    subtitle: "Be first to know when clinical care launches in your region, and get early-member pricing.",
    email: "Email address",
    name: "First name (optional)",
    interest: "I’m most interested in",
    interests: { programs: "Group programs", coaching: "Coaching", clinical: "Clinical care" },
    consent: "I agree to receive emails from Rootwell Health. Unsubscribe anytime.",
    submit: "Join waitlist",
    sending: "Sending…",
    success: "You’re on the list! We’ll be in touch.",
    error: "Something went wrong. Please try again.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Is this medical care?",
        a: "Our programs, coaching and community are educational and are not a substitute for medical care. Clinical services will only be offered where our clinicians are licensed to practice.",
      },
      {
        q: "Why is the price different in my country?",
        a: "We use regional pricing so that the same programs are affordable worldwide. Prices are set automatically based on your location.",
      },
      {
        q: "Can I join from anywhere?",
        a: "Yes. Everything is online, and group sessions are recorded so you can watch them in your own time zone.",
      },
      {
        q: "Can I cancel my membership?",
        a: "Yes, anytime, from your account. You keep access until the end of the billing period.",
      },
    ],
  },
  checkout: {
    error: "Checkout couldn’t be started. Please try again.",
    loading: "Redirecting…",
    successTitle: "Welcome to Rootwell!",
    successBody: "Your payment was successful. Check your email for next steps and your login details.",
    demoNotice: "Demo mode: no payment was taken because Stripe isn’t configured yet.",
    backHome: "Back to home",
  },
  footer: {
    disclaimer:
      "Rootwell Health provides education and coaching. Content on this site is not medical advice and is not intended to diagnose, treat, cure or prevent any disease. Always consult a qualified healthcare provider. If you have a medical emergency, contact local emergency services.",
    legal: { disclaimer: "Medical disclaimer", terms: "Terms of service", privacy: "Privacy policy" },
    rights: "All rights reserved.",
  },
  legal: {
    draftBanner: "TEMPLATE — This document is a placeholder and must be reviewed by a qualified lawyer before launch.",
  },
};

export type Dict = typeof en;
