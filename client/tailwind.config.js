/** @type {import("tailwindcss").Config} */

export default {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            animation: {
                border: 'border 4s ease infinite',
            },
            keyframes: {
                border: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
    plugins: [],
};
