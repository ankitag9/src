/*jslint unparam: true */
/*global window, $ */
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = '/upload';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload:false,
        done: function (e, data) {
            data.context.text('Almost Done...');
            $.ajax({
                url        : '/submit',
                type       : 'post',
                dataType   : 'json',
                contentType: 'application/json',
                data       : JSON.stringify({
                    user       : {
                        name            : $('#name').val(),
                        email           : $('#email').val(),
                        phoneNumber     : $('#phoneNumber').val(),
                    },
                    book: {
                        title: $('#bookTitle').val(),
                        location: data._response.result
                    }
                }),
                success    : function()
                {
                    location.href = '/confirmation';
                },
                error      : function(error)
                {
                    bootbox.alert(error.responseText);
                }
            });
        },
        fail: function(e, data) {
            bootbox.alert('There was an error in uploading the manuscript. Please try again', function(){
                location.reload();
            })
        },
        add: function (e, data) {
            data.context = $('#upload')
                .click(function () {
                    data.context = $('#upload').text('Uploading...').replaceAll($(this));
                    data.submit();
                });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});