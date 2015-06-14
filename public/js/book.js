$(document).ready(function() {
    //Set the carousel options
    $('#mycarousel').carousel({
        pause: false,
        interval: 6000
    });
    _.each(reviews,function(review){
        $('#rating'+review.id).raty({score:review.rating,readOnly: true});
    })
});