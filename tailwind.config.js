module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                moon: "url('/images/icons/moon.svg')",
                sun: "url('/images/icons/sun.svg')",
                stars: "url('/images/icons/stars.svg')",
                clouds: "url('/images/icons/clouds.svg')",
                dividerLight: "url('/images/triangleAsymmetricalLight.svg')",
                dividerDark: "url('/images/triangleAsymmetricalDark.svg')",
            },
            boxShadow: {
                glow: '0 0 2px 2px rgb(0,0,0,0.1)',
            },
        },
    },
    variants: {},
    plugins: [
        function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        },
    ],
};
