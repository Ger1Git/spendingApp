/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,js,tsx}'],
    theme: {
        extend: {
            colors: {
                turqoise: '#c7e6fa',
                success: '#218838'
            },
            fontFamily: {
                cursive: ['cursive']
            },
            borderWidth: {
                3: '3px'
            },
            zIndex: {
                3: '3'
            },
            boxShadow: {
                dark: '0 2px 10px rgba(0, 0, 0, 0.4)'
            },
            gap: {
                10: '40px'
            }
        }
    },
    plugins: []
};