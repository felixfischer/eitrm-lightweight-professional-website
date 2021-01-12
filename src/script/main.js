import 'alpinejs'

//const data = require('../data/main.yml')
//(data)

function ready(fn) {
    if (document.readyState != 'loading') {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}

function main() {
    // Ready
    // console.debug('ready')
    stopBodyFromScrollingWhenModalIsOpen()
}

function stopBodyFromScrollingWhenModalIsOpen() {
    /* when modal is opened */
    document.querySelector(".modal-opener").addEventListener('click', function() {
        //document.querySelector("#modal-container").style.display = 'block'
        document.querySelector("body").style.overflow = 'hidden'
    })
    /* when modal is closed */
    document.querySelector(".modal-closer").addEventListener('click', function() {
        //document.querySelector("#modal-container").style.display = 'none'
        document.querySelector("body").style.overflow = 'visible'
    })
}

ready(main)
