module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        30: "7.5rem",
        132: "33rem",
        140: "35rem",
        170: "42.5rem",
      },
      width: {
        320: "80rem",
      },
      maxHeight: {
        120: "30rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
