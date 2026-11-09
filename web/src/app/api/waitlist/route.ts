import { NextResponse } from "next/server";
import { insertRow, supabaseConfigured } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INTERESTS = new Set(["programs", "coaching", "clinical"]);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (body.consent !== true) return NextResponse.json({ error: "Consent required" }, { status: 400 });

  const row = {
    email,
    first_name: typeof body.name === "string" ? body.name.trim().slice(0, 80) || null : null,
    interest: typeof body.interest === "string" && INTERESTS.has(body.interest) ? body.interest : "programs",
    locale: typeof body.locale === "string" ? body.locale.slice(0, 5) : null,
    country: typeof body.country === "string" ? body.country.slice(0, 2).toUpperCase() : null,
    consent_at: new Date().toISOString(),
  };

  if (!supabaseConfigured()) {
    console.info("[waitlist] demo mode (Supabase not configured):", row.email, row.interest, row.country);
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    await insertRow("waitlist", row);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
}
