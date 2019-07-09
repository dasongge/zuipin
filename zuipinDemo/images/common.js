var tinyCartHeight  = 70;
var popupLogin      = $('.popup-login');
var showTinyCart    = true;
var cartNum         = parseInt($('.headerCartNum').text());
$(function(){

    // 下拉全部商品
    //$('.good-list').hover(
    //    function(){
    //        $('.list-info-tab').stop().slideDown('400');
    //    },
    //    function(){
    //        $('.list-info-tab').stop().slideUp('400');
    //    }
    //)

    // 下拉全部商品
    $('.good-list').hover(
        function(){
            $('.list-info-tab').stop().slideDown('400');
        },
        function(){
            $('.list-info-tab').stop().slideUp('400');
        }
    )

    // 搜索框
    $('.search-text').keydown(function(){
        if($(this).val() != ''){
            $('.hot-search').hide('fast');
        }else{
            $('.hot-search').show('fast');
        }
    }).click(function(){
        $('.search-btn').addClass('search_focus_btn');
        $(this).addClass('on');
    }).blur(function(){
        $('.search-btn').removeClass('search_focus_btn');
        $(this).removeClass('on');
    });
    $('.search-btn').mouseover(
        function(){
            $(this).addClass('on');
            $('.search-text').addClass('on');
        }
    )
    $('.search-btn').mouseout(
        function(){
            $(this).removeClass('on');
            $('.search-text').removeClass('on');
        }
    )

    // $('.row-nav-list a').click(function () {
    //     $(this).parent().addClass('active')
    //         .siblings().removeClass('active');
    // })
    // 购物车
    var cartBar      = document.querySelector('.cart-info');
    var cartTime     = new Date().getTime();
    var isFirst      = 0;
    if ( cartBar ){
        cartBar.onmouseenter = function (ev) {
            if(isNaN(cartNum)) return;
            isFirst++;
            var newCartTime = new Date().getTime();
            if (newCartTime - cartTime > 5000 || isFirst === 1) {
                cartTime = new Date().getTime();
                showTinyCart = true;
                getCartData();

            }else{
                $('.cart-list').show().height(0).height(tinyCartHeight);
            }

        };
        cartBar.onmouseleave = function (ev) {
            showTinyCart = false;
            $('.cart-list').height(0).hide();
        };
    }
    //登录弹窗
    $('.cart-num, .suspension-cart').click(function (ev) {
        loginPop( '/cart' );
        ev.cancelBubble();
    });
    $('.cart-info').on('click', '.cart_info_j', function () {
        loginPop( '/cart' );
    });
    $('#myOrders').click(function () {
        loginPop( '/order/orderList' );
    });
    $('#close-login').click(function () {
        popupLogin.data('redirectTo', '');
        popupLogin.hide(300);
        $(".popup-content").find("input:visible").val('');
        $(".phoneTip").hide();
        $(".accountTip").hide();
        $("#imgs").click();
        $(".login-tab").children("li:eq(0)").click();
    });

    // 搜索框
    $('.search-text').keydown(function(){
        if($(this).val() != ''){
            $('.hot-search').hide('fast');
        }else{
            $('.hot-search').show('fast');
        }
    })

    /**
     * 成功弹窗
     */
    function succ_alert_tip(msg) {
        $('.alert-tip').addClass('success').html(msg);
        var w = $('.alert-tip').width() + 122;
        w = -w/2 + 'px';
        $('.alert-tip').css({"margin-left":w,"display":"block"});
        setTimeout( function () {
            $('.alert-tip').removeClass('success').hide().html('');
        },2000);
    }


    /**
     * 失败弹窗
     */
    function fail_alert_tip(msg) {
        $('.alert-tip').addClass('fail').html(msg).show();
        var w = $('.alert-tip').width() + 122;
        w = -w/2 + 'px';
        $('.alert-tip').css({"margin-left":w,"display":"block"});
        setTimeout( function () {
            $('.alert-tip').removeClass('fail').hide().html('');
        },2000);
    }
    
    $('#close-login').click(function () {
        popupLogin.data('redirectTo', '');
        popupLogin.hide(300);
    });



})

var delFlag = false;
function getCartData( id ) {
    if ( delFlag === true ){
        return false;
    }
    var data = {};
    if ( typeof id !== 'undefined' ){
        data = {'id':id};
        delFlag = true;
    }
    $.ajax({
        type: "post",
        url: "/cart/buildTinyCartBlock",
        dataType: 'json',
        data: data,
        async: true,
        beforeSend:function(){
            $('.cart-list').html('<div class="list_empty"> <img src="/web/images/loading-crop.gif" alt=""> </div>');
            $('.cart-list').show();
        },
        success: function (result) {
            if ( !result.buildData ){
                $('.cart-list').height(0).height(tinyCartHeight);
                if ( showTinyCart ){
                    $('.cart-list').show()
                }
                return false;
            }
            if ( result.error ){
                alert( result.error );
            }else{
                var cartNum = result.proCount > 999 ? '999+' : result.proCount;
                $('.headerCartNum').text(cartNum);
                $('.cart-list').html(result.buildData);
                tinyCartHeight = result.height;
                if($('.zero_good')){
                    $('.zero_good').eq($('.zero_good').length-1).css("border-bottom","1px dotted #e0e0e0");
                }
                $('.list_has').height(tinyCartHeight);
                $('.cart-list').height(0).height( tinyCartHeight );
                if ( showTinyCart ){
                    $('.cart-list').show()
                }
                var nowHref = window.location.href;
                if ( nowHref.indexOf('/cart') != -1 && typeof id !== 'undefined' ){
                    location.reload();
                }
            }
            delFlag = false;
        },
        error: function () {
            delFlag = false;
            alert('网络错误！');
        }
    })
    
}
function loginPop( redirectTo ) {
    if( !redirectTo ){
        redirectTo = window.location.pathname + window.location.search;
        popupLogin.data('redirectTo', redirectTo);
        popupLogin.show(300);
    }else{
        $.ajax({
            type: "post",
            url: "/isLogin",
            dataType: 'json',
            data: {},
            async: true,
            success: function (result) {
                if ( result == 0 ){
                    popupLogin.data('redirectTo', redirectTo);
                    popupLogin.show(300);
                }else{
                    window.location.href = redirectTo;
                }
            }
        });
    }
}

// 右侧菜单栏
$(function(){
    var winH = $(window).height(),
        docH = $(document).height();
    // if(docH <= 1.2*winH){
    //     $('.consultion-top').hide();
    // }else{
    //     $('.consultion-top').show();
    // }
    $('.consultion-top').on('click',function(){
        $('body,html').animate({
            scrollTop: 0},
            100);
    })

    $(window).scroll(function(){
        var winT = $(this).scrollTop();
        if(winT>winH){
            $('.consultion-top').fadeIn();
        }else{
            $('.consultion-top').fadeOut();
        }
    })
})

function showTip(classname, msg){
    var tip = $('.alert-tip');
    var revClass    = classname == 'success' ? 'fail' : 'success';
    tip.addClass(classname).removeClass(revClass);
    tip.html(msg);
    tip.show();
    setTimeout(function(){
        tip.removeClass(classname);
        tip.html('');
        tip.hide();
    },2000)
}