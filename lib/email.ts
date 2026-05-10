import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * CONFIGURATION STRATEGY:
 * To support multiple independent deployments (e.g. personal vs client), we strictly
 * prioritize runtime environment variables (APP_URL, EMAIL_USER).
 * We avoid falling back to NEXT_PUBLIC_ variables in the backend to prevent build-time leakage.
 */

console.log("[EmailService] ENV Check:", {
  EMAIL_USER: process.env.EMAIL_USER ? "DEFINED" : "MISSING",
  SMTP_USER: process.env.SMTP_USER ? "DEFINED" : "MISSING"
});

const SMTP_USER = process.env.EMAIL_USER || process.env.SMTP_USER;
const SMTP_PASS = process.env.EMAIL_APP_PASSWORD || process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;

// Fallback utility for local development if no SMTP vars exist
const isLocalMode = !SMTP_USER || process.env.NODE_ENV !== "production";

let transporter: nodemailer.Transporter | null = null;

if (SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  // Debug info to identify deployment environment in logs
  const maskedUser = SMTP_USER ? `${SMTP_USER.substring(0, 3)}***@${SMTP_USER.split('@')[1]}` : "NONE";
  console.log(`[EmailService] Attempting to send email. Sender: ${maskedUser} | From: ${SMTP_FROM}`);

  if (transporter) {
    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to,
        subject,
        html,
      });
      console.log(`[EmailService] Email sent successfully to ${to}`);
    } catch (error) {
      console.error("[EmailService] Error sending email:", error);
      throw error;
    }
  } else if (isLocalMode) {
    console.log("\n=======================================================");
    console.log(`[LOCAL DEV MOCK] EMAIL INTERCEPTED`);
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    const linkMatch = html.match(/href="([^"]+)"/);
    if (linkMatch && linkMatch[1]) {
      console.log(`🔗 CLICK HERE: ${linkMatch[1]}`);
    }
    console.log("=======================================================\n");
  } else {
    console.error("[EmailService] CRITICAL: Production email failed - No SMTP configuration exists.");
  }
}

/**
 * Sends a password-related email.
 * Uses APP_URL strictly to ensure links point to the correct deployment domain.
 */
export async function sendPasswordResetEmail(email: string, token: string, mode: "set" | "reset" = "reset") {
  // DIAGNOSTIC LOG: See exactly why the domain is failing
  console.log("[EmailService] Generating reset email link:", {
    envAppUrl: process.env.APP_URL,
    envNextPublicAppUrl: process.env.NEXT_PUBLIC_APP_URL,
    nodeEnv: process.env.NODE_ENV
  });

  // Simplified logic: Prioritize APP_URL, then NEXT_PUBLIC_APP_URL, then localhost
  let appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Clean trailing slashes
  if (appUrl.endsWith('/')) {
    appUrl = appUrl.slice(0, -1);
  }

  const resetLink = `${appUrl}/reset-password?token=${token}`;

  const isSetMode = mode === "set";
  const title = isSetMode ? "Set Your Password" : "Reset Your Password";
  const description = isSetMode
    ? "Your account has been successfully created. Please set your secure password below to access your dashboard."
    : "We received a request to reset your password. If you didn't make this request, you can safely ignore this email.";
  const buttonText = isSetMode ? "Set Password" : "Reset Password";

  console.log(`[EmailService] Final link generated: ${resetLink}`);

  const html = `
<div style="font-family: Inter, sans-serif; background:#111111; padding:40px; color:#ffffff;">
  <div style="max-width:500px; margin:auto; background:#ffffff; color:#111111; padding:30px; border-radius:12px;">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="${appUrl}/costly-logo.png" alt="Costly Logo" style="height: 40px; width: auto;" />
    </div>
     
    <h2 style="margin-bottom:10px; text-align: center;">${title}</h2>
    
    <p style="color:#444444; font-size:16px; text-align: center;">
      ${description}
    </p>

    <a href="${resetLink}" 
       style="display:block; margin:30px 0; background:#111111; color:#ffffff; padding:14px; text-align:center; border-radius:8px; text-decoration:none; font-weight:bold;">
       ${buttonText}
    </a>

    <p style="font-size:12px; color:#777777; text-align: center;">
      This secure link expires in exactly 1 hour.
    </p>

  </div>
</div>
  `;

  await sendEmail({
    to: email,
    subject: `${title} – Costly`,
    html,
  });
}
