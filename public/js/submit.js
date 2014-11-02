/*jslint unparam: true */
/*global window, $ */
$(function () {
    'use strict';
    var uploadFiles = [];
    var addedFiles = [];
    var url = '/upload';

    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload:false,
        done: function (e, data) {
            uploadFiles.push(data._response.result);
            if(uploadFiles.length == 3)
            {
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
                            details:uploadFiles
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
            }
        },
        fail: function(e, data) {
            bootbox.alert('There was an error in uploading the manuscript. Please try again', function(){
                location.reload();
            })
        },
        add: function (e, data) {
            var file = data.files[0].name;
            var parts = file.split('.');
            var ext = parts[parts.length-1];
            if (ext == 'doc' || ext == 'docx')
            {
                if(addedFiles.length<=3)
                {
                    addedFiles.push(file);
                    $('#files').empty();
                    $.each((addedFiles),function(index,val){
                        $('#files').append('<p>' + val + '</p>');
                    });

                    data.context = $('#upload')
                        .click(function () {
                            data.context = $('#upload').text('Uploading...').replaceAll($(this));
                            data.submit();
                        });
                }
                else
                    bootbox.alert('Maximum Three files are allowed.')
            }
            else
                bootbox.alert('Only Doc/Docx files are allowed.')
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