$(document).ready(function(){
    $('#mycarousel').carousel({interval: 2000});
    $('#carousel-pause').click(function(){
        if($('#carousel-pause').children('span').hasClass('fa-pause')){
            $('#mycarousel').carousel('pause');
            $('#carousel-pause').children('span').removeClass('fa-pause');
            $('#carousel-pause').children('span').addClass('fa-play');
        }
        else if ($('#carousel-pause').children('span').hasClass('fa-play')){
            $('#mycarousel').carousel('cycle');
            $('#carousel-pause').children('span').removeClass('fa-play');
            $('#carousel-pause').children('span').addClass('fa-pause');
        }
    });

    $('#loginButton').click( function(){
        $('#loginModal').modal('show');
    });

    $('#reserveButton').click( function(){
        $('#reserveModal').modal('show');
    });
});