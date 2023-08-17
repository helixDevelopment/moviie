import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            screens: {
                xs: '475px',
            }
        }
    },
    plugins: [],
} satisfies Config;
