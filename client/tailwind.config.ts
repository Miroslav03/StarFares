import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            "main-black-color": "#000000",
            "main-gray-color": "#111111",
        },
        screens: {
            "2xl": { max: "1535px" },
            // => @media (max-width: 1535px) { ... }

            xl: { max: "1279px" },
            // => @media (max-width: 1279px) { ... }

            lg: { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            md: { max: "767px" },
            // => @media (max-width: 767px) { ... }

            sm: { max: "639px" },
            // => @media (max-width: 639px) { ... }
        },
    },
    plugins: [require("daisyui")],
  /*   daisyui: {
      themes: [
        {
          myDarkTheme: {
            "primary": "#111111",    // Customize primary color
           // Error color
          },
          myLightTheme: {
            "primary": "#ffffff",    // Customize primary color
            "secondary": "#4b5563",  // Customize secondary color
            "accent": "#22d3ee",     // Customize accent color
            "neutral": "#111827",    // Customize neutral color
            "base-100": "#ffffff",   // Background color (main dark background)
            "info": "#3abff8",       // Info color
            "success": "#36d399",    // Success color
            "warning": "#fbbd23",    // Warning color
            "error": "#f87272",      // Error color
          },
        },
      ],
    }, */
};
export default config;
