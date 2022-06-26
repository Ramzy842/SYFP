module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        default: ["Poppins", "sans-serif"],
      },
      height: {
        '500': '500px',
        '820': '820px',
      },
      colors: {
        "blue1": "#64B7D1",
        "blue2": "#0097C7",
        "main": "#11233E",
        "input": "#B6DAFE",
        "input-focus": "#0075FF",
        "github1": "#C0DBE1",
        "github2": "#FFFFFF",
        "dark1": "#000000",
        "dark2": "#06303D"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
