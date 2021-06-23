import 'alpinejs'
import $ from 'jquery'

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
    handleFormSubmission('#lightprof-application-form')
}

function stopBodyFromScrollingWhenModalIsOpen() {
    if (document.querySelector(".modal-opener")) {
        /* when modal is opened */
        document.querySelector(".modal-opener").addEventListener('click', function() {
            //document.querySelector("#modal-container").style.display = 'block'
            document.querySelector("body").style.overflow = 'hidden'
        })
    }
    if (document.querySelector(".modal-closer")) {
        /* when modal is closed */
        document.querySelector(".modal-closer").addEventListener('click', function() {
            //document.querySelector("#modal-container").style.display = 'none'
            document.querySelector("body").style.overflow = 'visible'
        })
    }
}

function handleFormSubmission(formId) {
    var frm = $(formId)
    frm.submit(function (e) {
        e.preventDefault()
        $(formId + ' .ajax-loader').show()
        $(formId + ' .hide-on-submit').hide()
        var formData = new FormData(frm[0]) 
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            complete: function () {
                $(formId + ' .ajax-loader').hide()
            },
            success: function (retData) {
                //console.log('Submission was successful.')
                console.log(retData)
                $(formId + ' .submit-success').show()
            },
            error: function (retData) {
                //console.log('An error occurred.')
                console.log(retData)
                $(formId + ' .hide-on-submit').show()
                $(formId + ' .submit-error').show()
            },
        })
    })
}

ready(main)
