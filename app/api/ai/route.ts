import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.6",
      input: [
        {
          role: "system",
          content:
            "You are the AI engine for a BTCUSD trading dashboard. Analyze the supplied market information carefully. Provide concise, educational analysis. Never claim certainty or guaranteed profit. Clearly distinguish LONG, SHORT, and WAIT signals and explain the main reasons.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      output: response.output_text,
    });
  } catch (error) {
    console.error("AI backend error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "AI backend request failed.",
      },
      { status: 500 }
    );
  }
}
