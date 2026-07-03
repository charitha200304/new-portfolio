import { Resend } from "resend";

const RECEIVER_EMAIL = "charithachiranjeewa@gmail.com";

export const dynamic = "force-dynamic";

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return Response.json(
        { success: false, error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const name = (body?.name || "").toString().trim();
    const email = (body?.email || "").toString().trim();
    const message = (body?.message || "").toString().trim();

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "Name, email, and message are all required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return Response.json(
        { success: false, error: "Message is too long." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color:#09090b; padding:32px; color:#e4e4e7;">
        <div style="max-width:560px; margin:0 auto; background-color:#18181b; border:1px solid #27272a; border-radius:16px; padding:32px;">
          <h2 style="margin:0 0 4px; font-size:20px; color:#f4f4f5;">New portfolio inquiry</h2>
          <p style="margin:0 0 24px; font-size:13px; color:#71717a;">Sent from charithachiranjeewa.dev</p>

          <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
            <tr>
              <td style="padding:8px 0; font-size:13px; color:#71717a; width:80px;">Name</td>
              <td style="padding:8px 0; font-size:14px; color:#f4f4f5;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; font-size:13px; color:#71717a;">Email</td>
              <td style="padding:8px 0; font-size:14px; color:#f4f4f5;">
                <a href="mailto:${safeEmail}" style="color:#22d3ee; text-decoration:none;">${safeEmail}</a>
              </td>
            </tr>
          </table>

          <div style="padding:16px; background-color:#09090b; border:1px solid #27272a; border-radius:10px;">
            <p style="margin:0; font-size:14px; line-height:1.6; color:#d4d4d8;">${safeMessage}</p>
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [RECEIVER_EMAIL],
      replyTo: email,
      subject: `New message from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      return Response.json(
        { success: false, error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json(
      { success: false, error: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}
