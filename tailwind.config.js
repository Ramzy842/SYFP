module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        default: ["Poppins", "sans-serif"],
      },
      colors: {
        blue: {
          primary: "#05445E",
          secondary: "#189AB4",
          third: "#75E6DA",
          fourth: "#D4F1F4"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
