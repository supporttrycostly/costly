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

/**
 * DYNAMIC CONFIGURATION: 
 * We fetch environment variables at runtime to ensure that different 
 * deployments (Local, Personal Vercel, Client Vercel) never mix credentials.
 */
function getTransporter() {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const from = process.env.SMTP_FROM || user;

  if (!user || !pass) {
    return { transporter: null, from: null, isLocal: process.env.NODE_ENV !== "production" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });

  return { transporter, from, isLocal: false, user };
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  const { transporter, from, isLocal, user } = getTransporter();

  // STRICTURE: Identify exactly which account is being used in the logs
  const maskedUser = user ? `${user.substring(0, 3)}***@${user.split('@')[1]}` : "NONE";
  console.log(`[EmailService] DEPLOYMENT IDENTIFIED. Using account: ${maskedUser}`);

  if (transporter && from) {
    try {
      await transporter.sendMail({
        from,
        to,
        subject,
        html,
      });
      console.log(`[EmailService] SUCCESS: Email sent from ${from} to ${to}`);
    } catch (error) {
      console.error("[EmailService] SMTP ERROR:", error);
      throw error;
    }
  } else if (isLocal) {
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
    console.error("[EmailService] CRITICAL ERROR: No SMTP credentials found for this deployment.");
  }
}

/**
 * Sends a password-related email.
 * Uses APP_URL strictly to ensure links point to the correct deployment domain.
 */
export async function sendPasswordResetEmail(email: string, token: string, mode: "set" | "reset" = "reset") {
  // Use APP_URL strictly. Only fallback to localhost in dev.
  // DO NOT fallback to NEXT_PUBLIC_ variables here as they may be hardcoded at build time.
  const appUrl = process.env.APP_URL || (process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000");

  if (!appUrl && process.env.NODE_ENV === "production") {
    console.error("[EmailService] CRITICAL: APP_URL is not defined in production environment variables!");
    // We continue with a placeholder or throw error based on preference. 
    // Here we use a generic placeholder to prevent crashing but log loudly.
  }

  const finalAppUrl = appUrl || "https://check-your-env-vars.com";
  const resetLink = `${finalAppUrl}/reset-password?token=${token}`;

  const isSetMode = mode === "set";
  const title = isSetMode ? "Set Your Password" : "Reset Your Password";
  const description = isSetMode
    ? "Your account has been successfully created. Please set your secure password below to access your dashboard."
    : "We received a request to reset your password. If you didn't make this request, you can safely ignore this email.";
  const buttonText = isSetMode ? "Set Password" : "Reset Password";

  console.log(`[EmailService] Generating reset link for domain: ${finalAppUrl}`);

  const html = `
<div style="font-family: Inter, sans-serif; background:#111111; padding:40px; color:#ffffff;">
  <div style="max-width:500px; margin:auto; background:#ffffff; color:#111111; padding:30px; border-radius:12px;">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="${finalAppUrl}/costly-logo.png" alt="Costly Logo" style="height: 40px; width: auto;" />
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
