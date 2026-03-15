import { forwardRef } from "react";

const QRPoster = forwardRef(({ business }, ref) => {
  if (!business) return null;

  // Safe color constants for html2canvas (No oklch)
  const colors = {
    bg: "#05070a",
    accent: "#2dd4bf", // Teal 400
    accentLight: "#5eead4",
    indigo: "#6366f1",
    textMuted: "#94a3b8",
    gold: "#fbbf24"
  };

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-between"
      style={{
        width: "480px",
        height: "850px",
        background: colors.bg,
        borderRadius: "40px",
        padding: "60px 40px",
        fontFamily: "'DM Sans', sans-serif",
        color: "#ffffff",
        boxSizing: "border-box",
        overflow: "hidden",
        // Using standard hex for the shadow
        boxShadow: "0 40px 100px rgba(0,0,0,0.8)"
      }}
    >
      {/* ── Background Gradients (Compatibility safe) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `radial-gradient(circle at 50% -10%, rgba(45, 212, 191, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* ── Top Section ── */}
      <div className="relative z-10 text-center w-full">
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "52px",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginBottom: "16px"
          }}
        >
          <span style={{ color: "#ffffff" }}>
            {business.businessName?.split(' ')[0]}
          </span>
          {business.businessName?.split(' ')[1] && (
             <span style={{ 
                display: 'block',
                fontSize: '44px',
                color: colors.accent // Avoid gradients for html2canvas text if it fails
              }}>
                {business.businessName?.split(' ').slice(1).join(' ')}
              </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
           <div style={{ height: '1px', width: '30px', background: `linear-gradient(to right, transparent, ${colors.accent})` }} />
           <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: colors.accent }}>
             Exclusive
           </span>
           <div style={{ height: '1px', width: '30px', background: `linear-gradient(to left, transparent, ${colors.accent})` }} />
        </div>
      </div>

      {/* ── Middle QR Section ── */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          style={{
            padding: "24px",
            borderRadius: "32px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            position: "relative"
          }}
        >
          {/* Luxury Corners (Using Borders) */}
          <div style={{ position: 'absolute', top: -2, left: -2, width: '30px', height: '30px', borderTop: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}`, borderRadius: '12px 0 0 0' }} />
          <div style={{ position: 'absolute', top: -2, right: -2, width: '30px', height: '30px', borderTop: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}`, borderRadius: '0 12px 0 0' }} />
          <div style={{ position: 'absolute', bottom: -2, left: -2, width: '30px', height: '30px', borderBottom: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}`, borderRadius: '0 0 0 12px' }} />
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: '30px', height: '30px', borderBottom: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}`, borderRadius: '0 0 12px 0' }} />

          <div style={{ background: "#ffffff", padding: "12px", borderRadius: "18px" }}>
            <img
              src={business.qrCode}
              alt="QR"
              style={{ width: "200px", height: "200px", display: "block" }}
              crossOrigin="anonymous"
            />
          </div>
        </div>

        <p style={{ marginTop: '24px', fontSize: "12px", fontWeight: 600, color: colors.textMuted, letterSpacing: "0.15em", textTransform: 'uppercase' }}>
          Scan to Experience
        </p>
      </div>

      {/* ── Bottom Section ── */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Star Rating Pill */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          padding: '8px 20px', 
          background: 'rgba(251, 191, 36, 0.1)', 
          border: `1px solid ${colors.gold}`, 
          borderRadius: '100px',
          marginBottom: '28px'
        }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: colors.gold, fontSize: "14px" }}>★</span>
          ))}
          <span style={{ fontSize: "13px", color: colors.gold, fontWeight: 800, marginLeft: "4px" }}>5.0</span>
        </div>

        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
          {business.category || "Service Excellence"}
        </h3>
        
        <div style={{ height: "1px", width: "100px", background: "rgba(255,255,255,0.1)", margin: "16px 0" }} />

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: "14px", fontWeight: 800, color: colors.accent, letterSpacing: '2px' }}>REVICA AI</div>
          <div style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(148,163,184,0.5)", textTransform: "uppercase", marginTop: '4px' }}>
            Powered by Athenura
          </div>
        </div>
      </div>
    </div>
  );
});

QRPoster.displayName = "QRPoster";
export default QRPoster;