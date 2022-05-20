module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        typography: (theme) => ({}),
        extend: {},
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
};
