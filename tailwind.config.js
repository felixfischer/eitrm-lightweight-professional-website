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
        extend: {},
    },
    variants: {},
    plugins: [],
}
