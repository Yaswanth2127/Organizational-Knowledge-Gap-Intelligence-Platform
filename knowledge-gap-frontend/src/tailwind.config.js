/** @type {import('tailwindcss').Config} */
export default {
  // 1. Content ke andar batana padta hai ki kis-kis file me tailwind use ho rahi hai
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ye line 'src' ke andar ki sabhi files ko check karti hai
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}