import nodemailer from "nodemailer";

function getSmtpConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured");
  }

  return { user, pass };
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const { user, pass } = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? `"Auth Hub" <${user}>`,
    to: email,
    subject: "Reset your Auth Hub password",
    text: `Use this link to reset your password. It expires in 1 hour:\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1c1c1b; line-height: 1.5">
        <h1 style="font-size: 24px">Reset your password</h1>
        <p>Use the button below to choose a new password. This link expires in 1 hour.</p>
        <p style="margin: 24px 0">
          <a href="${resetUrl}" style="background: #1161d3; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none">
            Reset password
          </a>
        </p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
}
