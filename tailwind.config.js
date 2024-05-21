/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./!(build|dist|.*)/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#e7ecef",
        secondary: "#274c77",
        red: "#9b4343",
        "half-secondary": "#516f91",
        "secondary-low": "#879cb3",
        green: "#439b56",
        boxes: "#f8f8fb",
        gray: {
          "100": "#7d7d7d",
          "200": "rgba(0, 0, 0, 0.38)",
        },
        cornflowerblue: "#77abfc",
        forestgreen: "#139f21",
        salmon: {
          "100": "#f26c6c",
          "200": "rgba(240, 92, 92, 0.9)",
        },
        black: "#000",
        darkorange: "#ff7a00",
        cold: "#00b3ff",
        seagreen: "#297739",
        fontblue: '#E7ECEF',
        fontwhate: '#F8F8FB',
        fontbluebold: '#879CB3',
        fonttextgreen: '#297739',
        texttile: '#274C77',
        textparrafo: '#516F91',
        textligth: '#879CB3',
      },
      backgroundImage: {
        logo: "url('../assets/logo.png')",
        graphic: "url('../assets/graphic1.png')",
        graphic2: "url('../assets/graphic2.png')",
        climate: "url('../assets/climate.png')",
        graphic3: "url('../assets/graphic3.png')",
      },

      spacing: {},
      fontFamily: {
        lato: "Lato",
        poppins: "Poppins",
        roboto: "Roboto",
      },
      borderRadius: {
        "base-8": "16.8px",
        "81xl": "100px",
        "5xs-6": "7.6px",
      },
    },
    fontSize: {
      "base-2": "15.2px",
      "sm-5": "13.5px",
      "xs-8": "11.8px",
      "3xs": "10px",
      "base-8": "16.8px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
