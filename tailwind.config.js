/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
const { nextui } = require("@nextui-org/react");
const {heroui} = require("@heroui/react");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robotoSlab: ["Roboto Slab", "serif"],
        lato: ["Lato", "serif"],
        openSans: ["Open Sans", "serif"],
        raleway: ["Raleway", "serif"],
        bigShouldersText: ["Big Shoulders Text", "serif"],
        redHatDisplay: ["Red Hat Display", "serif"],
        oldStandardTT: ["Old Standard TT", "serif"],
        poppins: ["Poppins", "serif"],
        nunito: ["Nunito", "serif"],
        exo: ["Exo", "serif"],
        rancho: ["Rancho", "cursive"],
      },
    },
  },
  plugins: [daisyui, nextui(), heroui()],
};
