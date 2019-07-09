console.log("购物车");
define(["jquery","jquery-cookie"],function($){
    function shopping(){
        sc_num();
        sc_num1();
        
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
                    for(var i = 0; i < newArr.length;i++){
                       var node = $(`
                       <dd>
                            <div class="name-sp float-left">
                                <a href="/goods?id=ZPLYDZ1706">
                                    <ul class="sp_left">
                                        <li>
                                            <div class="img-sp">
                                                <img src="${arr[i].img1}">
                                            </div>
                                        </li>
                                        <li>
                                            <p class="ms-sp" title="${arr[i].p1}">
                                            ${arr[i].p1}
                                            </p>
                                            <p class="hm-sp">
                                                ZPLYDZ1706
                                            </p>
                                        </li>
                                    </ul>
                                </a>
                            </div>
                            
    
                            <div class="price-sp float-left">
                                <p>
                                ￥<span class="price">
                                        ${arr[i].p3}.00
                                    </span>
                                </p>
                            </div>
    
                            <div id = "${newArr[i].id}" class="num-sp float-left num-box">
                                <button type="button" class="jian reduce">-</button>
                                <input type="text" value="${newArr[i].num}" class="all-num product-num">
                                <button type="button" class="plus increase">+</button>
                            </div>
    
                            <div class="count-sp float-left">
                                <p class="deep-red">￥<span class="all-price item-subtotal">${arr[i].p3 * newArr[i].num}.00</span></p>
                            </div>
    
                            <div class="do-sp float-left">
                                <div id = "${newArr[i].id}" class="del del-product del-normal">
                                </div>
                            </div>
                        </dd>
                        `);
                        node.appendTo("#sh_cart");
                        
                        
                    }
                },
                error:function(msg){
                    alert(msg);
                }

            })
        }
        
        // //添加点击事件  +  -
        $("#sh_cart").on("click","button",function(){
            // alert(this.innerHTML);
           
            //找到商品id
            var id =$(this).closest("div").attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i= 0 ; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    //找到当前要修改的商品
                    //判断是要+ 还是 —
                    if(this.innerHTML == "+"){
                        cookieArr[i].num++;
                    }else{
                        if(cookieArr[i].num == "1"){
                            alert("数量已为1，无法删减");
                        }else{
                            cookieArr[i].num--;
                        }
                        
                       
                    }
                    //在页面显示商品数量
                    $(this).siblings("input").val(cookieArr[i].num);
                    break;
                }
            }
            //将数据存回cookie
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            })
            sc_num1();
            sc_num();
        })

        //添加点击事件 删除
        $("#sh_cart").on("click",".del",function(){
            var id = this.id;
             //1.删除页面上的数据  closest找到父节点
            $(this).closest("#sh_cart dd").remove();
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
            sc_num1();
            sc_num();
        
        })

        //让小计的所有数值进行相加
        // function sc_num2(){
        //     var cookieStr = $.cookie("goods");
        //     var num = 0 ;
        //     if(cookieStr){
                
        //         var cookieArr = JSON.parse(cookieStr);
        //         for(var i = 0 ; i < cookieArr.length;i++){
        //             // sum1 += cookieArr[i].num;
        //             // var n = $(".price").html() * cookieArr[i].num;
                    
        //         }
        //         // $(".big-money").html(n++);
        //     }
            
           
           
           
        // }
        //计算商品数量
        function sc_num1(){
            var cookieStr = $.cookie("goods");
            var sum1 = 0;
            if(cookieStr){
                
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0 ; i < cookieArr.length;i++){
                    sum1 += cookieArr[i].num;
                }
                
            }
       
            $(".selectProductNum").html(sum1);
        }
        function sc_num(){
            var cookieStr = $.cookie("goods");
            if(!cookieStr){
                $(".headerCartNum").html(0);
    
            }else{
                var sum = 0;
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0 ; i < cookieArr.length;i++){
                    sum += cookieArr[i].num;
                }
                $(".headerCartNum").html(sum);
            }
        }
        
    }
    return{
        shopping:shopping
    }
})