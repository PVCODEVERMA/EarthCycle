/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       spacing: {
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        dropdownFade: {
          '0%': { opacity: 0, transform: 'translateY(-8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        glow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        pulseOnce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        // 🚚 Truck-related animations
        motion: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(3px)" },
          "100%": { transform: "translateY(0px)" },
        },
        roadAnimation: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-350px)" },
        },
      },
      animation: {
        "ripple-continuous": "ripple 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
        "pulse-slow": "pulseSlow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "spin-slow": "spinSlow 8s linear infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        shine: "shine 1.5s ease-in-out",
        "pulse-once": "pulseOnce 1.5s ease-in-out",
        dropdownFade: 'dropdownFade 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        // 🚚 Truck loader animations
        motion: "motion 1s linear infinite",
        roadAnimation: "roadAnimation 1.4s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
