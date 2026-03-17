/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#04040A",
        "bg-card": "#0D0D18",
        "bg-elevated": "#12121F",
        gold: "#F5C842",
        "gold-dim": "rgba(245,200,66,0.1)",
        "gold-border": "rgba(245,200,66,0.2)",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      borderColor: {
        DEFAULT: "rgba(240,240,250,0.08)",
      },
    },
  },
  plugins: [],
};
