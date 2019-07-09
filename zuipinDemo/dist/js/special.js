console.log("特价计时的的代码");
define(['jquery'],function($){
    function special(){
        
        $(function(){
            $.ajax({
                url:"../data/special.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        var node = $(`
                        <li class="clone">
                            <a href="#" class="special-good bjys">
                                <div class="special-img">
                                    <img src="${arr[i].img}" alt="">
                                </div>
                                <p class="special-descr">${arr[i].p1}</p>
                                <p class="special-alt">${arr[i].p2}</p>
                                <p class="special-price">
                                    <span>${arr[i].p3}</span>
                                    <del>${arr[i].p4}</del>
                                </p>
                                <div class="tag-img">
                                    <img src="images/time-limit.png" alt="">
                                </div>
                            </a>
                        </li>
                        `);
                        node.appendTo(".cleatfix");
                        
                    }
                    var oUl = $(".slide-item").find(".cleatfix");
                    var aLis = oUl.find(".clone");
                    oUl.css("width","2660px");
                
                    var iNow = 0 ;
                    var timer = null;
                    timer = setInterval(function(){
                        // iNow = $(this).index();
                        iNow++;
                        tab();
                    },3000)
                    function tab(){
                        oUl.stop().animate({
                            left: -248 * iNow
                        },1000,function(){
                            if(oUl.offset().left <= -oUl.width() / 3){
                                oUl.css("left",0);
                                iNow = 0;
                            }
                        })
                    } 
                    //移入移出
                    $(".cleatfix").mouseenter(function(){
                        clearInterval(timer);
                    })
                    $(".cleatfix").mouseleave(function(){
                        timer = setInterval(function(){
                            iNow++;
                            tab();

                        },3000);
                    })
                    //点击两边的使其前后移动
                    var sPrev = $(".hdbtn").find(".sPrev");
                    var sNext = $(".hdbtn").find(".sNext");
                    sPrev.click(function(){
                        if(iNow >= 8){
                            iNow = 0
                        }else{
                            iNow++;
                            tab();
                            clearInterval(timer);
                        }
                            
                        return false;
                    })
                    sNext.click(function(){
                        if(iNow <= 0){
                            iNow = 0
                        }else{
                            iNow--;
                            tab();
                            clearInterval(timer);
                        }
                        return false;
                           
                            

                    })
                },
                error:function(msg){
                    alert(msg)
                }
            })
                    
        })



    }
    return{
        special:special
    }
})