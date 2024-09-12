import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "primary": "Montserrat, sans-serif",
        "secondary": "Poppins, sans-serif"
      },

      colors: {
        "primary": "#152238",
        "secondary": "#192841",
        "tertiary": "#1c2e4a",
        "quaternary": "#203354",
        "quinary": "#23395d"
      },

      backgroundImage: {
        "image-primary": "url('/background.webp')",
        "gradient-primary": "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(121,157,255,1) 50%, rgba(66,90,175,1) 100%)"
      },

      animation: {
        'infinite-scroll': 'infinite-scroll 20s linear infinite'
      },

      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      } 
    },
  }
};

export default config;
