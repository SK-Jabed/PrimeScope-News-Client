/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
const { nextui } = require("@nextui-org/react");
const {heroui} = require("@heroui/react");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, nextui(), heroui()],
};
