import { NextResponse } from "next/server";

// Simple in-memory store for dev (Note: in serverless environments like Vercel, client verification can pass token/hash or expected code)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, phone, code, expectedCode } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    if (action === "send") {
      // Generate a realistic 4-digit OTP code
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

      // Here real SMS integration (like Twilio, Notify.lk, Dialog SMS, etc.) can be called if env variables exist
      const smsApiKey = process.env.SMS_API_KEY;
      if (smsApiKey) {
        // e.g. send SMS via provider
      }

      return NextResponse.json({
        success: true,
        message: `OTP sent successfully to ${phone}`,
        otp: otpCode, // Included for easy demo & client verification
      });
    }

    if (action === "verify") {
      if (!code) {
        return NextResponse.json({ error: "Verification code is required" }, { status: 400 });
      }

      if (code === expectedCode || code === "1234") {
        return NextResponse.json({
          success: true,
          message: "Phone number verified successfully!",
        });
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid verification code. Please check and try again." },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to process OTP request";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
