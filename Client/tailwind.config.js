/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        flicker: "flicker 1s infinite",
        "move-slow": "move 1.2s infinite",
        "move-fast": "move 0.8s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { height: "50px", backgroundColor: "#21bf73" },
          "50%": { height: "80px", backgroundColor: "#d91e18" },
        },
        move: {
          "0%": { transform: "translateY(10px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};


