 /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            './app/**/*.{js,ts,jsx,tsx,mdx}',
            './pages/**/*.{js,ts,jsx,tsx,mdx}',
            './components/**/*.{js,ts,jsx,tsx,mdx}',
          ],
          theme: {
            extend: {
                colors: {
                    brand: '#DDA0DD',
                },
            },
            screens: {
              'sm': '576px',
              'md': '960px',
              'lg': '1440px',
            },
          },
          plugins: [],
        }