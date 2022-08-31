/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#028FA3",
          secondary: "#F9BF11",
          accent: "#67e8f9",
          neutral: "#191D24",
          "base-100": "#2A303C",
          info: "#2B9D9A",
          success: "#36D399",
          warning: "#F24614",
          error: "red",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
