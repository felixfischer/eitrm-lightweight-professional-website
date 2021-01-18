const fs = require('fs')
const jsYaml = require('js-yaml')
const headerConfigFile = './src/data/header.yml'
const headerConfig = jsYaml.safeLoad(fs.readFileSync(headerConfigFile, 'utf8'))
const netlifyCmsConfigFile = './src/static/admin/config.yml'
const netlifyCmsConfig = jsYaml.safeLoad(fs.readFileSync(netlifyCmsConfigFile, 'utf8'))

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
                default: '#004494'
            },
            teal: {
                default: '#009e83',
                light: '#d0ede8',
                lighter: '#daf1ed'
            },
            grey: {
                default: '#57585a'
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
        lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
            3: '.875rem', // 14
            4: '1rem', // 16
            5: '1.25rem', // 18
            6: '1.3125rem', // 21
            7: '1.625rem', // 26
            8: '1.75rem', // 28
            9: '2.125rem', // 34
            10: '2.375rem', // 36
            11: '2.375rem', // 38
            12: '2.625rem', // 42
            13: '3rem', // 48
            14: '3.875rem', // 62
            16: '4.5rem', // 72
            20: '5.6875rem', // 91
        },
        extend: {
            backgroundImage: theme => ({
                'main-header': "url(" + netlifyCmsConfig.media_folder + headerConfig.background_image + ")"
            })
        },
    },
    variants: {},
    plugins: [],
}
