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

$('#review').hide();

$('.cancelWriteReview').click(function(event){
    $('#dashboard').show();
    $('#review').hide();
});
var selectedReview;
$('.writeReview').click(function(event){
    var reviewId = $(this).data('id');
    var review = _.findWhere(pendingReviews, {id: reviewId});
    selectedReview = review;
    $('#dashboard').hide();
    $('#review').show();
    $('#selectedBookImg').attr("src","/rest/book/" + review.book.id + "/cover?imageSize=500");
    $('#selectedBookTitle').html(review.book.title + "<small> | " + BookGenre[review.book.genre] + "</small>");
    $('#selectedBookAuthor').html("&nbsp;" + review.book.author);
    $('#selectedBookSummary').text(review.book.summary);
});

$('div#ratingstar').raty();

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

$("#reviewForm").bootstrapValidator({
    feedbackIcons: {
        valid     : 'glyphicon glyphicon-ok',
        invalid   : 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields         : {
        review : {
            validators: {
                notEmpty: {
                    message: 'This field is required and cannot be empty'
                }
            }
        },
        feedback : {
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
            url        : '/rest/review/' + selectedReview.id,
            type       : 'post',
            dataType   : 'json',
            contentType: 'application/json',
            data       : JSON.stringify({
                review:{
                    title        : $('#reviewForm textarea[name="title"]').val(),
                    review       : $('#reviewForm textarea[name="review"]').val(),
                    feedback     : $('#reviewForm textarea[name="feedback"]').val(),
                    rating       : $('div#ratingstar').raty('score'),
                    status       : 2
                },
                reviewComment:{
                    comment      : $('#reviewForm textarea[name="comment"]').val()
                }
            }),
            success    : function(response)
            {
                bootbox.alert("Review Submitted!!",function(){
                    location.reload();
                });
            },
            error      : function(error)
            {
                bootbox.alert(error.responseText);
            }
        });
    });