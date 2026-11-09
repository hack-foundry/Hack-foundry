"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/dictionaries/en";

type Status = "idle" | "sending" | "done" | "error";

export function WaitlistForm({ t, locale, country }: { t: Dict["waitlist"]; locale: string; country: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          name: form.get("name"),
          interest: form.get("interest"),
          consent: form.get("consent") === "on",
          website: form.get("website"), // honeypot
          locale,
          country,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="form-success" role="status">{t.success}</p>;
  }

  return (
    <form className="waitlist-form" onSubmit={onSubmit}>
      <label>
        <span>{t.email}</span>
        <input type="email" name="email" required autoComplete="email" maxLength={254} />
      </label>
      <label>
        <span>{t.name}</span>
        <input type="text" name="name" autoComplete="given-name" maxLength={80} />
      </label>
      <label>
        <span>{t.interest}</span>
        <select name="interest" defaultValue="programs">
          {Object.entries(t.interests).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <label className="checkbox">
        <input type="checkbox" name="consent" required />
        <span>{t.consent}</span>
      </label>
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </button>
      {status === "error" && <p className="form-error" role="alert">{t.error}</p>}
    </form>
  );
}
