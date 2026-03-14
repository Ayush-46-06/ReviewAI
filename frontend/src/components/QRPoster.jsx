import { forwardRef } from "react";

const QRPoster = forwardRef(({ business }, ref) => {
  if (!business) return null;

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-between overflow-hidden"
      style={{
        width: "480px",
        height: "850px",
        background: "#0d1117",
        borderRadius: "32px",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.07), 0 40px 80px rgba(0,0,0,0.6)",
        padding: "52px 40px",
        fontFamily: "'DM Sans', sans-serif",
        color: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      {/* ── Background layers ── */}
      {/* Gradient mesh */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% -5%, rgba(20,184,166,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 50% 35% at 80% 95%, rgba(99,102,241,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 10% 80%, rgba(14,165,233,0.12) 0%, transparent 60%)
          `,
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Top — Logo & Tagline ── */}
      <div className="relative z-10 text-center w-full flex flex-col items-center gap-2">
        {/* Wordmark */}
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "52px",
            lineHeight: 1,
            letterSpacing: "-2px",
          }}
        >
          <span
            style={{
              
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {business.businessName?.charAt(0) || "B"}
          </span>
          <span
            style={{
             
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {business.businessName?.substring(1) || "usiness"}
          </span>
        </div>

        {/* Tagline with dots */}
        <div
          className="flex items-center gap-2 mt-1"
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(148,163,184,0.7)",
          }}
        >
          {["Scan", "Review", "Grow"].map((word, i) => (
            <span key={word} className="flex items-center gap-2">
              {i !== 0 && (
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "#2dd4bf",
                    opacity: 0.6,
                    display: "inline-block",
                  }}
                />
              )}
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Middle — QR Code ── */}
      <div className="relative z-10 w-full flex flex-col items-center gap-5">
        {/* Pulse rings */}
        {[320, 360].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              border: `1px solid ${i === 0 ? "rgba(45,212,191,0.07)" : "rgba(56,189,248,0.05)"}`,
              animation: `pulse 3s ease-in-out ${i * 1}s infinite`,
            }}
          />
        ))}

        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(148,163,184,0.45)",
          }}
        >
          Scan with your camera
        </p>

        {/* Frame with corner accents */}
        <div
          className="relative"
          style={{
            padding: "20px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 0 0 1px rgba(45,212,191,0.1), inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 48px rgba(0,0,0,0.4)",
          }}
        >
          {/* Corner accents */}
          {[
            { top: 8, left: 8, borderWidth: "2px 0 0 2px", borderRadius: "4px 0 0 0" },
            { top: 8, right: 8, borderWidth: "2px 2px 0 0", borderRadius: "0 4px 0 0" },
            { bottom: 8, left: 8, borderWidth: "0 0 2px 2px", borderRadius: "0 0 0 4px" },
            { bottom: 8, right: 8, borderWidth: "0 2px 2px 0", borderRadius: "0 0 4px 0" },
          ].map((style, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: 20,
                height: 20,
                borderColor: "#2dd4bf",
                borderStyle: "solid",
                opacity: 0.6,
                ...style,
              }}
            />
          ))}

          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={business.qrCode}
              alt={`QR Code for ${business.businessName}`}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
                borderRadius: "6px",
                display: "block",
              }}
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom — CTA & Business Info ── */}
      <div className="relative z-10 text-center w-full flex flex-col items-center">
        {/* CTA */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span style={{ fontSize: "18px", color: "#fbbf24", filter: "drop-shadow(0 0 6px rgba(251,191,36,0.5))" }}>★</span>
          <span style={{ fontSize: "15px", fontWeight: 500, color: "#cbd5e1" }}>
            Scan to Leave a Review
          </span>
          <span style={{ fontSize: "18px", color: "#fbbf24", filter: "drop-shadow(0 0 6px rgba(251,191,36,0.5))" }}>★</span>
        </div>

        {/* Divider */}
        <div
          className="w-full mb-7"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
          }}
        />

        {/* Business name */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "28px",
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
            // background: "linear-gradient(to right, #fbbf24, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {business.businessName}
        </h2>

        {/* Category pill */}
        <div
          className="flex items-center gap-2 "
          style={{
            // background: "rgba(255,255,255,0.05)",
            // border: "1px solid rgba(255,255,255,0.08)",
            // borderRadius: "100px",
            padding: "4px 14px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(148,163,184,0.6)",
          }}
        >
          {business.category || "Service Provider"}
        </div>

        {/* Powered badge */}
        <p
          className="mt-4"
          style={{
            fontSize: "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(100,116,139,0.4)",
          }}
        >
          Powered by Athenura
        </p>
      </div>

      {/* ── Keyframe animation (inject once globally or via <style>) ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.04); opacity: 1; }
        }
      `}</style>
    </div>
  );
});

QRPoster.displayName = "QRPoster";

export default QRPoster;