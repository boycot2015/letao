$(function(){

    $.ajax({
        url:'/employee/checkRootLogin',
        success:function(data){
            if(data.error==400){
                window.location.href = './login.html';
            }
        }
    })
    $('.lt_main .header a:eq(0)').click(function(){
        if($(this).hasClass('menu')){
            $(this).removeClass('menu');
            $('.lt_side').stop().animate({width:0},200);
            $('.lt_main').stop().animate({paddingLeft:0},200);
        }else{
            $(this).addClass('menu');
            $('.lt_side').stop().animate({width:180},200);
            $('.lt_main').stop().animate({paddingLeft:180},200);
        }
    })

    $('.lt_main .header a:eq(1)').click(function(){
        $('.modal-sure').modal('show');
    })

    $('.modal-sure button.btn-danger').click(function(){
        $('.modal-sure').modal('hide');
        $.ajax({
            url:'/employee/employeeLogout',
            success:function(data){
                window.location.href = './login.html';
            }
        })
    })

    $('.lt_side .content ul>li:eq(1) a').click(function(){
        $(this).siblings('ol').slideToggle();
    })
})