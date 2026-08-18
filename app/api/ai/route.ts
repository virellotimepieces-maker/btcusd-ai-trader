import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type MarketInput = {
  symbol?: string;
  price?: number;
  change?: number;
  volume?: number;
  levels?: Array<{
    price: number;
    liquidity: number;
    side: "buy" | "sell" | "current";
  }>;
};

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OPENAI_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const body: MarketInput = await request.json();

    const symbol = body.symbol || "BTCUSD";
    const price = Number(body.price || 0);
    const change = Number(body.change || 0);
    const volume = Number(body.volume || 0);
    const levels = Array.isArray(body.levels) ? body.levels : [];

    const marketSnapshot = {
      symbol,
      price,
      change,
      volume,
      liquidityLevels: levels,
    };

    const response = await openai.responses.create({
      model: "gpt-5.6",
      input: [
        {
          role: "system",
          content:
            "You are an AI market-analysis engine for a BTCUSD dashboard. Analyze the supplied market snapshot objectively. Do not claim certainty and do not execute trades. Return practical analysis for LONG, SHORT, or WAIT decisions.",
        },
        {
          role: "user",
          content: `
Analyze this BTCUSD market snapshot:

${JSON.stringify(marketSnapshot, null, 2)}

Return ONLY valid JSON using exactly this structure:

{
  "signal": "LONG" | "SHORT" | "WAIT",
  "confidence": number,
  "reason": string,
  "entry": number | null,
  "stopLoss": number | null,
  "takeProfit": number | null,
  "riskLevel": "LOW" | "MEDIUM" | "HIGH"
}

Rules:
- confidence must be between 0 and 100.
- If the evidence is mixed or insufficient, use WAIT.
- Do not invent market data that was not supplied.
- entry, stopLoss and takeProfit may be null when there is insufficient information.
- This is analysis only; never execute an order.
          `,
        },
      ],
    });

    const text = response.output_text?.trim();

    if (!text) {
      return NextResponse.json(
        {
          error: "AI returned an empty response.",
        },
        { status: 502 }
      );
    }

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch {
      analysis = {
        signal: "WAIT",
        confidence: 0,
        reason: text,
        entry: null,
        stopLoss: null,
        takeProfit: null,
        riskLevel: "HIGH",
      };
    }

    return NextResponse.json({
      success: true,
      symbol,
      analysis,
    });
  } catch (error) {
    console.error("AI backend error:", error);

    return NextResponse.json(
      {
        error: "Failed to analyze market data.",
      },
      { status: 500 }
    );
  }
}
