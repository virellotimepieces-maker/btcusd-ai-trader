"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Brain,
  Crosshair,
  Gauge,
  Layers3,
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

type Signal = "LONG" | "SHORT" | "WAIT";

type MarketData = {
  price: number;
  change: number;
  volume: number;
  signal: Signal;
  confidence: number;
};

const initialMarket: MarketData = {
  price: 117842.35,
  change: 1.84,
  volume: 284.6,
  signal: "LONG",
  confidence: 87,
};

const levels = [
  { price: 118600, liquidity: 91, side: "sell" },
  { price: 118300, liquidity: 73, side: "sell" },
  { price: 118050, liquidity: 58, side: "sell" },
  { price: 117842, liquidity: 100, side: "current" },
  { price: 117550, liquidity: 64, side: "buy" },
  { price: 117250, liquidity: 82, side: "buy" },
  { price: 116900, liquidity: 94, side: "buy" },
];

export default function Home() {
  const [market, setMarket] = useState(initialMarket);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());

      setMarket((prev) => {
        const movement = (Math.random() - 0.48) * 85;
        const nextPrice = prev.price + movement;

        return {
          ...prev,
          price: nextPrice,
          change: ((nextPrice - 115700) / 115700) * 100,
        };
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const formattedPrice = market.price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <main className="app">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #070a0f;
          color: #f5f7fa;
          font-family: Arial, Helvetica, sans-serif;
        }

        button {
          font: inherit;
        }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(circle at 80% 0%, rgba(42, 112, 255, 0.12), transparent 30%),
            #070a0f;
          padding: 24px;
        }

        .shell {
          max-width: 1450px;
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brandIcon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.25);
        }

        h1 {
          margin: 0;
          font-size: 22px;
        }

        .subtitle {
          margin-top: 4px;
          color: #7d8796;
          font-size: 13px;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border: 1px solid #1c2735;
          border-radius: 999px;
          background: #0c1118;
          color: #9ca8b7;
          font-size: 12px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 12px #22c55e;
        }

        .priceCard {
          border: 1px solid #1b2634;
          border-radius: 20px;
          background: linear-gradient(145deg, #0d131c, #090d13);
          padding: 24px;
          margin-bottom: 18px;
        }

        .priceTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .label {
          color: #8994a4;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .price {
          margin-top: 7px;
          font-size: clamp(34px, 6vw, 58px);
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .positive {
          color: #34d399;
        }

        .negative {
          color: #fb7185;
        }

        .signal {
          min-width: 180px;
          border-radius: 16px;
          padding: 17px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.25);
        }

        .signalTitle {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #86efac;
          font-weight: 800;
          font-size: 17px;
        }

        .signalText {
          color: #82909f;
          font-size: 12px;
          margin-top: 7px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr;
          gap: 18px;
        }

        .card {
          border: 1px solid #1a2532;
          border-radius: 18px;
          background: #0b1017;
          padding: 20px;
          min-width: 0;
        }

        .cardHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .cardTitle {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 15px;
          font-weight: 700;
        }

        .muted {
          color: #748092;
          font-size: 12px;
        }

        .heatmap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .level {
          display: grid;
          grid-template-columns: 90px 1fr 48px;
          align-items: center;
          gap: 10px;
          font-size: 12px;
        }

        .bar {
          height: 22px;
          border-radius: 5px;
          overflow: hidden;
          background: #111923;
        }

        .barFill {
          height: 100%;
          border-radius: inherit;
        }

        .sell {
          background: linear-gradient(90deg, #7f1d1d, #ef4444);
        }

        .buy {
          background: linear-gradient(90deg, #064e3b, #10b981);
        }

        .current {
          background: linear-gradient(90deg, #1d4ed8, #60a5fa);
        }

        .metricGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .metric {
          padding: 15px;
          border: 1px solid #17212d;
          border-radius: 13px;
          background: #0d141d;
        }

        .metricLabel {
          color: #758195;
          font-size: 11px;
        }

        .metricValue {
          margin-top: 8px;
          font-size: 21px;
          font-weight: 750;
        }

        .meter {
          margin-top: 8px;
          height: 6px;
          border-radius: 10px;
          background: #17202c;
          overflow: hidden;
        }

        .meterFill {
          height: 100%;
          border-radius: inherit;
          background: #3b82f6;
        }

        .wide {
          grid-column: span 2;
        }

        .analysis {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .analysisBox {
          padding: 16px;
          border-radius: 14px;
          border: 1px solid #182332;
          background: #0d141d;
        }

        .analysisValue {
          margin-top: 8px;
          font-size: 25px;
          font-weight: 800;
        }

        .actionRow {
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }

        .action {
          flex: 1;
          border: 0;
          border-radius: 12px;
          padding: 13px;
          color: white;
          font-weight: 750;
          cursor: pointer;
        }

        .actionLong {
          background: #047857;
        }

        .actionShort {
          background: #be123c;
        }

        .footer {
          margin-top: 18px;
          color: #5f6b7a;
          font-size: 11px;
          text-align: center;
        }

        @media (max-width: 1000px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }

          .wide {
            grid-column: span 2;
          }
        }

        @media (max-width: 680px) {
          .app {
            padding: 14px;
          }

          .topbar,
          .priceTop {
            flex-direction: column;
            align-items: flex-start;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .wide {
            grid-column: span 1;
          }

          .signal {
            width: 100%;
          }
        }
      `}</style>

      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="brandIcon">
              <Brain size={24} />
            </div>

            <div>
              <h1>BTCUSD AI Trader</h1>
              <div className="subtitle">
                AI-powered market intelligence dashboard
              </div>
            </div>
          </div>

          <div className="status">
            <span className="dot" />
            Market engine active
          </div>
        </header>

        <section className="priceCard">
          <div className="priceTop">
            <div>
              <div className="label">BTC / USD</div>

              <div className="price">${formattedPrice}</div>

              <div className={market.change >= 0 ? "positive" : "negative"}>
                {market.change >= 0 ? "+" : ""}
                {market.change.toFixed(2)}% today
              </div>
            </div>

            <div className="signal">
              <div className="signalTitle">
                <TrendingUp size={20} />
                AI LONG
              </div>

              <div className="signalText">
                Confidence score: {market.confidence}%
              </div>
            </div>
          </div>
        </section>

        <section className="grid">
          <div className="card">
            <div className="cardHeader">
              <div className="cardTitle">
                <Layers3 size={18} />
                Liquidity Heatmap
              </div>

              <span className="muted">BTCUSD</span>
            </div>

            <div className="heatmap">
              {levels.map((level) => (
                <div className="level" key={level.price}>
                  <span>
                    ${level.price.toLocaleString()}
                  </span>

                  <div className="bar">
                    <div
                      className={`barFill ${
                        level.side === "sell"
                          ? "sell"
                          : level.side === "buy"
                            ? "buy"
                            : "current"
                      }`}
                      style={{ width: `${level.liquidity}%` }}
                    />
                  </div>

                  <span>{level.liquidity}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="cardHeader">
              <div className="cardTitle">
                <Gauge size={18} />
                Market Metrics
              </div>
            </div>

            <div className="metricGrid">
              <div className="metric">
                <div className="metricLabel">Volume</div>
                <div className="metricValue">
                  {market.volume.toFixed(1)}M
                </div>
              </div>

              <div className="metric">
                <div className="metricLabel">Liquidity</div>
                <div className="metricValue">82%</div>
              </div>

              <div className="metric">
                <div className="metricLabel">Momentum</div>
                <div className="metricValue positive">Bullish</div>
              </div>

              <div className="metric">
                <div className="metricLabel">Volatility</div>
                <div className="metricValue">Medium</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="cardHeader">
              <div className="cardTitle">
                <Crosshair size={18} />
                Entry Model
              </div>
            </div>

            <div className="analysis">
              <div className="analysisBox">
                <div className="muted">Suggested Entry</div>
                <div className="analysisValue">
                  ${market.price.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>

              <div className="analysisBox">
                <div className="muted">Confidence</div>
                <div className="analysisValue positive">
                  {market.confidence}%
                </div>
              </div>

              <div className="analysisBox">
                <div className="muted">Stop Loss</div>
                <div className="analysisValue negative">
                  ${(market.price * 0.985).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>

              <div className="analysisBox">
                <div className="muted">Take Profit</div>
                <div className="analysisValue positive">
                  ${(market.price * 1.03).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="card wide">
            <div className="cardHeader">
              <div className="cardTitle">
                <Brain size={18} />
                AI Market Analysis
              </div>

              <span className="muted">
                Updated {time.toLocaleTimeString()}
              </span>
            </div>

            <div className="analysis">
              <div className="analysisBox">
                <div className="muted">Trend</div>
                <div className="analysisValue positive">
                  <ArrowUp size={20} /> Bullish
                </div>
              </div>

              <div className="analysisBox">
                <div className="muted">Liquidity Bias</div>
                <div className="analysisValue">
                  Buy Side
                </div>
              </div>

              <div className="analysisBox">
                <div className="muted">Risk Level</div>
                <div className="analysisValue">
                  Moderate
                </div>
              </div>

              <div className="analysisBox">
                <div className="muted">Signal Strength</div>
                <div className="analysisValue positive">
                  Strong
                </div>
              </div>
            </div>

            <div className="actionRow">
              <button className="action actionLong">
                <ArrowUp size={16} /> LONG SIGNAL
              </button>

              <button className="action actionShort">
                <ArrowDown size={16} /> SHORT SIGNAL
              </button>
            </div>
          </div>

          <div className="card">
            <div className="cardHeader">
              <div className="cardTitle">
                <Zap size={18} />
                AI Confidence
              </div>
            </div>

            <div className="metricValue">{market.confidence}%</div>

            <div className="meter">
              <div
                className="meterFill"
                style={{ width: `${market.confidence}%` }}
              />
            </div>

            <div className="muted" style={{ marginTop: 10 }}>
              Based on momentum, liquidity and price structure.
            </div>
          </div>

          <div className="card">
            <div className="cardHeader">
              <div className="cardTitle">
                <ShieldCheck size={18} />
                Risk Control
              </div>
            </div>

            <div className="metricGrid">
              <div className="metric">
                <div className="metricLabel">Risk / Trade</div>
                <div className="metricValue">1%</div>
              </div>

              <div className="metric">
                <div className="metricLabel">R:R</div>
                <div className="metricValue">1:2</div>
              </div>
            </div>
          </div>
        </section>

        <div className="footer">
          <Activity size={12} /> AI dashboard interface — market values shown
          here are simulated until a live market-data API is connected.
        </div>
      </div>
    </main>
  );
}
