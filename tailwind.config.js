module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [
        './src/*.pug',
        './src/script/*',
        './src/style/*',
        './src/template/*',
    ],
    theme: {
        colors: {
            blue: {
                DEFAULT: '#004494'
            },
            teal: {
                DEFAULT: '#009E83',
                light: '#D0EDE8',
                lighter: '#DAF1ED'
            },
            grey: {
                DEFAULT: '#57585A'
            },
            black: '#000000',
            white: '#ffffff'
        },
        fontSize: {
            sm: '1rem',         // 16px
            base: '1.125rem',   // 18px
            lg: '1.5rem',       // 24px
            xl: '1.75rem',      // 28px
            '2xl': '1.875rem',  // 30px
            '3xl': '2.25rem',   // 36px
            '4xl': '3.4375rem', // 55px
            '5xl': '4.125rem',  // 66px
        },
        extend: {},
    },
    variants: {},
    plugins: [],
}
