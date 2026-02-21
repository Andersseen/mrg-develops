import type { ExportedHandler } from "@cloudflare/workers-types";

export interface Env {
  RECIPIENT_EMAIL: string;
  FROM_EMAIL: string;
  FROM_NAME: string;
  ALLOWED_ORIGIN: string;
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
  // Allow configured origin, or any origin during local dev (wrangler dev)
  const allowed =
    origin === allowedOrigin || allowedOrigin === "*" || !allowedOrigin
      ? origin
      : allowedOrigin;

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function sendViaMailChannels(
  payload: ContactPayload,
  env: Env,
): Promise<Response> {
  const emailBody = {
    personalizations: [
      {
        to: [{ email: env.RECIPIENT_EMAIL }],
        // Set reply-to so the client can reply directly to the sender
        reply_to: { email: payload.email, name: payload.name },
      },
    ],
    from: {
      email: env.FROM_EMAIL,
      name: env.FROM_NAME,
    },
    subject: `New message from ${payload.name} — MRG develops`,
    content: [
      {
        type: "text/html",
        value: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px;">
  <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
    New contact form submission
  </h2>
  <table style="width:100%; border-collapse:collapse;">
    <tr>
      <td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td>
      <td style="padding: 8px 0;">${escapeHtml(payload.name)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold;">Email:</td>
      <td style="padding: 8px 0;">
        <a href="mailto:${escapeHtml(payload.email)}" style="color:#2563eb;">
          ${escapeHtml(payload.email)}
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
      <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</td>
    </tr>
  </table>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 24px;">
  <p style="font-size: 12px; color: #94a3b8;">
    Sent via the contact form at mrgdevelops.com
  </p>
</body>
</html>
        `.trim(),
      },
    ],
  };

  const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailBody),
  });

  return res;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "*";
    const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    let payload: ContactPayload;
    try {
      payload = (await request.json()) as ContactPayload;
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { name, email, message } = payload;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: name, email, message",
        }),
        {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        },
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    try {
      const mailRes = await sendViaMailChannels({ name, email, message }, env);

      // MailChannels returns 202 Accepted on success
      if (mailRes.status === 202 || mailRes.status === 200 || mailRes.ok) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      const errorText = await mailRes.text().catch(() => "Unknown error");
      console.error("MailChannels error:", mailRes.status, errorText);

      return new Response(
        JSON.stringify({ error: "Failed to send email", detail: errorText }),
        {
          status: 502,
          headers: { ...headers, "Content-Type": "application/json" },
        },
      );
    } catch (err) {
      console.error("Worker error:", err);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }
  },
} satisfies ExportedHandler<Env>;
