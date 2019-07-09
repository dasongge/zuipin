console.log("列表");
define(["jquery","jquery-cookie"],function($){
    function liebiao(){
        sc_num();
        sc_msg();
        sc_num1();
        sc_msg1();
        $.ajax({
            url:"../data/liebiao.json",
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    var node = $(`
                    <div class="item float-left">
                        <div class="tag-img">
                            <img src="${arr[i].img}" alt="">
                        </div>
                        <dl>
                            <dt><a href=""><img src="${arr[i].img1}" alt=""></a></dt>
                            <dd>
                                    <p class="new-goodsSomething" title="${arr[i].p1}">${arr[i].p1}</p>
                                    <p class="goodsPing" title="${arr[i].p2}">${arr[i].p2}</p>
                            </dd>
                            <dd>
                                <p class="nowPrice">￥${arr[i].p3}</p>
                            </dd>
                            <dd>
                                <p class="peopleGood"> ${arr[i].p4} </p>
                            </dd>
                            <dd class="cart-show">
                                <p class="p red-buy addToCart" id = ${arr[i].id}>
                                    <span class="cont" data-agl-cvt="15">${arr[i].span}</span>
                                    <input type="hidden" name="productExtId" class="productExtId" value="22520">
                                </p>
                            </dd>
                        </dl>
                        
                    </div>
                    `); 
                    node.appendTo(".liebiao");
                    // var tagImg = $(".item").find('.tag-img');
                    // var oImg = tagImg.find("img");
                    // if(oImg.src){
                    //     tagImg.css("width","80px");
                    //     tagImg.css("height","80px");
                    // }else{
                    //     tagImg.css("width","0");
                    //     tagImg.css("height","0");
                    // }
                }
            },
            error:function(msg){
                alert(msg);
            }
        })
        //事件委托  给按钮添加点击事件
        $(".liebiao").on("click",".red-buy",function(){
            //当前商品的id
            var id = this.id;
            //1.判断是否是第一次添加
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                var str = `[{"id":${id},"num":1}]`;
                $.cookie("goods",str,{
                    expires:7
                })
            }else{
                //2.如果不是第一次添加，判断之前是否添加过
                //eval只能转 最外层是数组，每一个元素是对象
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;//假设没有添加过
                for(var i =0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        same = true;
                        //数量加1
                        cookieArr[i].num++;
                        break;
                    }
                }
                if(!same){
                    var obj = {id:id,num:1};
                    cookieArr.push(obj); 
                }
                //存储回去
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })     
            }
            // alert($.cookie("goods"));
            sc_num();
            sc_msg();
            sc_num1();
            sc_msg1();
        }) 


        //添加点击事件给 删除 
        $(".buy_lists ul").on("click",".cart_info_del",function(){
            var id = this.id;
            //1.删除页面上的数据  closest找到父节点
            $(this).closest("li").remove();
            //2.删除cookie中的数据   
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0 ; i < cookieArr.length;i++){
                if(cookieArr[i].id == id){
                    cookieArr.splice(i,1);
                    break;
                }
            }
            if(!cookieArr.length){
                $.cookie("goods",null);
            }else{
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }
            //重新计算数量
            sc_num();
            sc_num1();
        })
    }

    
    //计算商品数量商品
    function sc_num(){
        var cookieStr = $.cookie("goods");
        if(!cookieStr){
            $(".headerCartNum").html(0);
            // $(".gong").html(0);

        }else{
            var sum = 0;
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0 ; i < cookieArr.length;i++){
                sum += cookieArr[i].num;
            }
            $(".headerCartNum").html(sum);
            // $(".gong").html(sum);
        }
    }
    //计算购物车下方共几件
    function sc_num1(){
        var cookieStr = $.cookie("goods");
        var sum1 = 0;
        if(cookieStr){
            
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0 ; i < cookieArr.length;i++){
                sum1 += cookieArr[i].num;
            }
            
        }
   
        $(".gong span").html(sum1);
    }
    
    //加载购物车底部共几件
    function sc_msg1(){
        $(".buy_end").html("");
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            $.ajax({
                url:"../data/liebiao.json",
                success:function(arr){
                    var newArr = [];
                    for(var i = 0 ; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length;j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num;//将商品的数量给
                                newArr.push(arr[i]);
                            }
                        }
                    }
                    var node2 = $(`
                    <p class="cart_count float-left gong">共<span id="span2">0</span>件</p>
                    <div class="cart_price float-left">
                        
                    </div>
                    <a class="cart_info_j float-right " href="javascript:;">去购物车</a>
                    `);
                    node2.appendTo($(".buy_end"));
                    // alert($(".gong span").html())
                    sc_num1();
                },
                error:function(msg){
                    alert(msg)
                }
            })
        }
    }
    //加载购物车的商品列表
    function sc_msg(){
        $(".buy_lists ul").html("");
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            $("#aaaa").css("display","none");
            $(".cart-new").css("display","block");
            var cookieArr = JSON.parse(cookieStr);
            $.ajax({
                url:"../data/liebiao.json",
                success:function(arr){
                    var newArr = [];
                    for(var i = 0 ; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length;j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num;//将商品的数量给
                                newArr.push(arr[i]);
                            }
                        }
                    }
                    for(var i = 0 ;i < newArr.length;i++){
                       var node1 = $(`
                        <li class="yx_good">
                            <a class="float-left" href="/goods?id=8701125">
                                <img src="${newArr[i].img1}">
                            </a>
                            <a class="float-left" href="/goods?id=8701125">
                                <p class="cart_info_text">
                                    ${newArr[i].p1}
                                </p>
                            </a>
                            <a class="float-left">
                                <p class="cart_info_p"><span class="cart_info_pc">${newArr[i].p3} </span>x<span class="cart_info_n"> ${newArr[i].num}</span></p>
                                <span id="${newArr[i].id}" class="cart_info_del float-right">删除</span>
                            </a>
                        </li>  
                        `);
                        node1.appendTo($(".buy_lists ul"));
                       
                    }
                   
                        
                   
                },
                error:function(msg){
                    alert(msg);
                }
            })
        }else{
            $("#aaaa").css("display","block");
            $(".cart-new").css("display","none");
        }
    }
    return{
        liebiao:liebiao
    }
})