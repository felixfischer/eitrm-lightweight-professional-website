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
    monitorFormChanges()
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

function monitorFormChanges() {
    $('select').change(updateForm)
    $('input').change(updateForm)
    $('#file').change(checkUploadFile)
}

function updateForm() {
    function showEl(el) {
        $(el).removeClass('hidden')
        $(el).find('input').attr('required', 'required')
    }
    function hideEl(el) {
        $(el).addClass('hidden')
        $(el).find('input').attr('required', null).val('')
    }
    let rules = [
        { trigger: '#orgtype', value: 'Other', target: '#orgtype-other', tasks: { yes: [showEl], no: [hideEl] } },
        { trigger: '#use-course-knowledge', value: 'Yes', target: '#how-use-course-knowledge', tasks: { yes: [showEl], no: [hideEl] }},
        { trigger: '#heard-from', value: 'Other', target: '#heard-source', tasks: { yes: [showEl], no: [hideEl] }},
    ]
    rules.forEach(function (rule) {
        var tasks = $(rule.trigger).val() === rule.value ? rule.tasks.yes : rule.tasks.no
        tasks.forEach(function(task) { task(rule.target )})
    })
}

function checkUploadFile(e) {
    if (e.currentTarget.files.length > 0) {
        var file = e.currentTarget.files[0] // puts all files into an array
        var filesize = ((file.size / 1024) / 1024).toFixed(4) // MB
        if (file.name != "item" && typeof file.name != "undefined") {
            if (file.type != 'application/pdf') {
                alert('Sorry! Only PDF files can be uploaded.')
                e.currentTarget.value = ''
            }
            else if (filesize > 20) {
                alert('Sorry! This file is too large (> 20 MB). Please choose a different file or share your LinkedIn profile URL instead.')
                e.currentTarget.value = ''
            }
            else {
                // un-require LinkedIn URL field if CV is being uploaded
                document.querySelector('#linkedin-url').removeAttribute('required')
            }
        } 
    }
    else {
        // re-require LinkedIn URL field if CV is not being uploaded
        document.querySelector('#linkedin-url').setAttribute('required', 'required')
    }
}

ready(main)
