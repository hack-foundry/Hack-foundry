"use client";

import { useState } from "react";

type Props = {
  itemId: string;
  currency: string;
  locale: string;
  label: string;
  loadingLabel: string;
  errorLabel: string;
  variant?: "primary" | "secondary";
};

export function CheckoutButton({ itemId, currency, locale, label, loadingLabel, errorLabel, variant = "primary" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function start() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, currency, locale }),
      });
      const data = (await res.json()) as { url?: string };
      if (!res.ok || !data.url) throw new Error("checkout failed");
      window.location.assign(data.url);
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="checkout">
      <button type="button" className={`btn btn-${variant} btn-block`} onClick={start} disabled={loading}>
        {loading ? loadingLabel : label}
      </button>
      {error && <p className="form-error" role="alert">{errorLabel}</p>}
    </div>
  );
}
