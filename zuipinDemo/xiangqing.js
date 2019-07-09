console.log("详情页放大镜效果");
define(["jquery"],function($){
    function xiangqing(){
        //添加移入移出
        $(".l-img ul").mouseenter(function(){
            $(".mark").show();
            $(".big-img").show();
        }).mouseleave(function(){
            $(".mark").hide();
            $(".big-img").hide();
            
        }).mousemove(function(ev){//鼠标移动
            var l = ev.pageX - $(".l-img ul").offset().left - 120;
            var t = ev.pageY - $(".l-img ul").offset().top - 120;
            //限制出界
            if(l <= 0){
                l = 0
            }
            if(l >= 241){
                l = 241
            }
            if(t <= 0){
                t = 0
            }
            if(t >= 241){
                t = 241
            }
            //改变遮罩层的位置
            $(".mark").css({
                left:l,
                top:t
            })
            //同时移动大图的位置
            $(".big-img ul li").css({
                left: -l *2,
                top:-t * 2
            })
        })

        var aSmalls = $(".sl-img ul").find('li');
        var aNormals = $(".l-img ul").find("li");
        var aBigs = $(".big-img ul").find("li");

        var iNow = 0;//设置当前显示的图片的下标
        //给图片添加点击事件
        aSmalls.click(function(){
            iNow = $(this).index();
            tab();
        })
        function tab(){
            aNormals.eq(iNow).stop().animate({
                opacity:"1",
                filter:"alpha(opacity=100)"
            })
            
            aNormals.eq(iNow).siblings("li").stop().animate({
                opacity:"0",
                filter:"alpha(opacity=0)"
              },1000);
            //   aNormals.$("ul div").last().animate({
            //     opacity:"0.5",
            //     filter:"alpha(opacity=50)"
            // })
            aBigs.eq(iNow).stop().animate({
                opacity:"1",
                filter:"alpha(opacity=100)"
            })
            aBigs.eq(iNow).siblings().stop().animate({
                opacity:"0",
                filter:"alpha(opacity=0)"
              },1000);
        }
        

        
        
    }
    return{
        xiangqing:xiangqing
    }
})