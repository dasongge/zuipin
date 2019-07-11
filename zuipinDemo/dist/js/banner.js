console.log("banner图的的代码")

define(["jquery"],function($){
	function banner(){
        
        $(function(){
            $.ajax({
                url:"../data/banner.json",
                success:function(arr){
                    for(var i = 0; i < arr.length;i++){
                        var node = $(`
                        <li>
                        <a href="html/liebiao.html"><img src="${arr[i].img}" alt=""></a>
                        </li>
                       
                        `);
                        node.appendTo(".bd ul");
                    }
                    var aBtns =  $("#hd").find("ul").find("li");
                    var oUl = $(".bd").find("ul");
                    var aLis = oUl.find("li");
                    
                    var iNow = 0;//设置当前显示的图片的下标
                    var timer = null;
                    //给按钮添加点击事件
                    aBtns.mouseover(function(){
                        iNow = $(this).index();
                        tab();
                    })
                    //启动定时器，每隔两秒钟滚动一次
                    timer = setInterval(function(){
                        iNow++;
                        
                        tab();
                    },2000);
        
        
                    function tab(){
                        aBtns.find("span").attr("class","").eq(iNow).attr("class","active");
                        if(iNow == aLis.size() - 1){
                            aBtns.find("span").eq(0).attr("class","active");
                        }
                        // oUl.stop().animate({
                        //     left: -992 * iNow
                           
                        // },1000,function(){
                        //     //动画结束的时候，如果是最后一张图片
                        //     if(iNow == aLis.size() - 1){
                        //         oUl.css("left",0);
                        //         iNow = 0;
                        //     }
                        // })
                        aLis.eq(iNow).stop().animate({
                            opacity:"1",
                            filter:"alpha(opacity=100)"
                        },1000)
                        aLis.eq(iNow).siblings().stop().animate({
                            opacity:"0",
                            filter:"alpha(opacity=0)"
                          },1000);
                          if(iNow == aLis.size() -1){
                            aLis.eq(0).stop().animate({
                                opacity:"1",
                                filter:"alpha(opacity=100)"
                            },1000).siblings().stop().animate({
                                opacity:"0",
                                filter:"alpha(opacity=0)"
                              },1000);
                            iNow = 0;
                        }
                      
        
                        
                    }
                    // 给整个banner图，添加移入移出
                        $(".bd").mouseenter(function(){
                            clearInterval(timer);
                        })
                        $(".bd").mouseleave(function(){
                            timer = setInterval(function(){
                                iNow++;
                                tab();
                            },2000);
                        })
                },error:function(msg){
                    alert(msg);
                }
            })
           
            
        })
    }
    return{
        banner:banner
    }
})
