// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.35s ease both",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
    },
  },
};