import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@topgridecosolutions.com";
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const MAX_SERVICE = 200;

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const name = String(body?.name ?? "").trim();
        const email = String(body?.email ?? "").trim();
        const message = String(body?.message ?? "").trim();
        const service = String(body?.service ?? "").trim();
        const honeypot = String(body?.website ?? "").trim();

        // Silently accept bot submissions without sending email
        if (honeypot) {
            return NextResponse.json({ success: true });
        }

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        if (
            name.length > MAX_NAME ||
            email.length > MAX_EMAIL ||
            message.length > MAX_MESSAGE ||
            service.length > MAX_SERVICE
        ) {
            return NextResponse.json(
                { error: "One or more fields exceed the allowed length." },
                { status: 400 }
            );
        }

        const smtpPass = process.env.SMTP_PASS;
        if (!smtpPass) {
            console.error("SMTP_PASS is not configured");
            return NextResponse.json(
                {
                    error:
                        process.env.NODE_ENV === "production"
                            ? "Unable to send your message. Please try again."
                            : "Email service is not configured. Add SMTP_PASS to .env.local.",
                },
                { status: 500 }
            );
        }

        const smtpUser = process.env.SMTP_USER ?? CONTACT_EMAIL;
        const fromAddress = process.env.SMTP_FROM ?? CONTACT_EMAIL;
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ?? "mail.topgridecosolutions.com",
            port: Number(process.env.SMTP_PORT ?? 465),
            secure: (process.env.SMTP_SECURE ?? "true") === "true",
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            connectionTimeout: 15000,
            greetingTimeout: 15000,
            socketTimeout: 20000,
        });

        const subject = service
            ? `New service request: ${service}`
            : `New contact form message from ${name}`;

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
        const safeService = service ? escapeHtml(service) : "";

        await transporter.sendMail({
            from: `"Top Grid Eco Solutions Website" <${fromAddress}>`,
            to: CONTACT_EMAIL,
            replyTo: email,
            subject,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                service ? `Service: ${service}` : null,
                "",
                "Message:",
                message,
            ]
                .filter(Boolean)
                .join("\n"),
            html: `
                <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
                    <h2 style="color: #1d6042; margin-bottom: 16px;">New website enquiry</h2>
                    <p><strong>Name:</strong> ${safeName}</p>
                    <p><strong>Email:</strong> ${safeEmail}</p>
                    ${safeService ? `<p><strong>Service:</strong> ${safeService}</p>` : ""}
                    <p><strong>Message:</strong></p>
                    <p style="background: #f8fafc; padding: 12px 16px; border-radius: 8px;">${safeMessage}</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Unable to send your message. Please try again." },
            { status: 500 }
        );
    }
}
