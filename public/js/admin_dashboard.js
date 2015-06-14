$(document).ready(function() {
    $('.panel-body button').on('click', function(){
        $(this).toggleClass('btnactive');
    });
});

$(".carddtnyear.dropdown-menu li").click(function(){
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

$( document ).ready(function() {
    $('.pop-dis').hover(
        function(){
            $(this).find('.caption').slideDown(250); //.fadeIn(250)
        },
        function(){
            $(this).find('.caption').slideUp(250); //.fadeOut(205)
        }
    );
});

$( document ).ready(function() {
    $('.pop-dis').hover(
        function(){
            $(this).find('.sidepop').fadeIn(250); //.fadeIn(250)
        },
        function(){
            $(this).find('.sidepop').fadeOut(205); //.fadeOut(205)
        }
    );
});

$(function () {
    $('.button-checkbox').each(function () {
        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-ok'
                },
                off: {
                    icon: 'glyphicon glyphicon-remove'
                }
            };
        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');
            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");
            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);
            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }
        // Initialization
        function init() {
            updateDisplay();
            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});

$('#addNewBook').hide();
$('#selectBlogger').hide();
//$('#booksTable').hide();
//$('#usersTable').hide();

$('#addNewBookBtn').click(function()
{
    $('#addNewBook').show();
    $('#booksTable').hide();
    $('#selectBlogger').hide();
});

$('#cancelAddBook').click(function()
{
    showBookPage();
});

function showBookPage()
{
    $('#addNewBook').hide();
    $('#selectBlogger').hide();
    $('#booksTable').show();
}

$('#cancelSelectBlogger').click(function()
{
    showBookPage();
});

var bookIdSelected;
$('.sendForReview').click(function(event){
    bookIdSelected = $(this).data('id');
    $('#addNewBook').hide();
    $('#selectBlogger').show();
    $('#booksTable').hide();
});

$("#selectBloggerForm").bootstrapValidator().on('success.form.bv', function(e)
    {
        // Prevent form submission
        e.preventDefault();

        var $form = $(e.target),
            validator = $form.data('bootstrapValidator'),
            submitButton = validator.getSubmitButton();

        $.ajax({
            url        : '/rest/review',
            type       : 'put',
            dataType   : 'json',
            contentType: 'application/json',
            data       : JSON.stringify({
                review:{
                    user_id       : $('#selectBloggerForm select[name="bloggerId"]').val(),
                    book_id      : bookIdSelected
                }
            }),
            success    : function(response)
            {
                bootbox.alert("Sent Successfully!!",function(){
                    location.reload();
                });
            },
            error      : function(error)
            {
                bootbox.alert(error.responseText);
            }
        });
    });

$("#addBookForm").bootstrapValidator({
    feedbackIcons: {
        valid     : 'glyphicon glyphicon-ok',
        invalid   : 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields         : {
        title : {
            validators: {
                notEmpty: {
                    message: 'This field is required and cannot be empty'
                }
            }
        },
        author : {
            validators: {
                notEmpty: {
                    message: 'This field is required and cannot be empty'
                }
            }
        },
        summary: {
            validators: {
                notEmpty: {
                    message: 'This field is required and cannot be empty'
                }
            }
        }
    }
}).on('success.form.bv', function(e)
    {
        // Prevent form submission
        e.preventDefault();

        var $form = $(e.target),
            validator = $form.data('bootstrapValidator'),
            submitButton = validator.getSubmitButton();

        $.ajax({
            url        : '/rest/book',
            type       : 'put',
            dataType   : 'json',
            contentType: 'application/json',
            data       : JSON.stringify({
                book:{
                    title       : $('#addBookForm input[name="title"]').val(),
                    author      : $('#addBookForm input[name="author"]').val(),
                    genre       : $('#addBookForm select[name="genre"]').val(),
                    summary     : $('#addBookForm textarea[name="summary"]').val()
                }
            }),
            success    : function(response)
            {
                bootbox.alert("Book Created!!",function(){
                    location.reload();
                });
            },
            error      : function(error)
            {
                bootbox.alert(error.responseText);
            }
        });
    });

$('.acceptReview').click(function(event){
    reviewId = $(this).data('id');
    $.ajax({
        url        : '/rest/review/' + reviewId,
        type       : 'post',
        dataType   : 'json',
        contentType: 'application/json',
        data       : JSON.stringify({
            review:{
                status       : 3
            }
        }),
        success    : function(response)
        {
            bootbox.alert("Review Accepted!!",function(){
                location.reload();
            });
        },
        error      : function(error)
        {
            bootbox.alert(error.responseText);
        }
    });
});
$('.rejectReview').click(function(event){
    reviewId = $(this).data('id');
    $.ajax({
        url        : '/rest/review/' + reviewId,
        type       : 'post',
        dataType   : 'json',
        contentType: 'application/json',
        data       : JSON.stringify({
            review:{
                status       : 5
            }
        }),
        success    : function(response)
        {
            bootbox.alert("Review Rejected!!",function(){
                location.reload();
            });
        },
        error      : function(error)
        {
            bootbox.alert(error.responseText);
        }
    });
});