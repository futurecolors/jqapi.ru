var descrTimeOut;
var index;

function showDescription()
{
    $('.description').hide();
    $('.description:eq(' + index + ')').fadeIn(300);
}

var moveDescription = function(e) {
    $('.description:eq(' + index + ')').css({
        top: e.pageY + 5,
        left: (e.pageX + 350 < $(document).width()) ? (e.pageX + 15) : (e.pageX - 325)
    });
};

$(function(){
    var hoverIn = function(){
        descrTimeOut = setTimeout('showDescription()', 1000);
        $(this).bind('mousemove', moveDescription);
    };
    var hoverOut = function(){
        $('.description').hide();
        clearTimeout(descrTimeOut);
        $(this).unbind('mousemove', moveDescription);
    };
    $('.apiobj a').hover(function(){
        index = $('.description', $(this).parent()).index('.description');
        hoverIn();
    }, hoverOut);
    $('.ajax_option li, .event_property').hover(function(){
        index = $('.description', this).index('.description');
        hoverIn();
    }, hoverOut);
});