import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { insertRow } from "@/lib/supabase";

/**
 * Stripe webhook: records completed purchases and subscription changes.
 * Point Stripe at https://YOUR-DOMAIN/api/stripe/webhook and set STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        await insertRow("orders", {
          stripe_session_id: s.id,
          stripe_customer_id: typeof s.customer === "string" ? s.customer : null,
          email: s.customer_details?.email ?? null,
          item_id: s.metadata?.item_id ?? null,
          country: s.metadata?.country ?? null,
          tier: s.metadata?.tier ?? null,
          mode: s.mode,
          amount_total: s.amount_total,
          currency: s.currency,
        });
        // TODO: grant access in your course/community platform and send a welcome email.
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await insertRow("subscription_events", {
          stripe_subscription_id: sub.id,
          stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
          status: sub.status,
          event_type: event.type,
        });
        // TODO: revoke access when status is canceled / unpaid.
        break;
      }
    }
  } catch (err) {
    console.error("[stripe webhook]", event.type, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
