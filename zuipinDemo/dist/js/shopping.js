console.log("购物车");
define(["jquery","jquery-cookie"],function($){
    function shopping(){
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
                                    <span class="price">
                                        ￥${arr[i].p3}.00
                                    </span>
                                </p>
                            </div>
    
                            <div class="num-sp float-left num-box">
                                <button type="button" class="jian reduce">-</button>
                                <input type="text" value="${newArr[i].num}" class="all-num product-num">
                                <button type="button" class="plus increase">+</button>
                            </div>
    
                            <div class="count-sp float-left">
                                <p class="deep-red">￥<span class="all-price item-subtotal">${arr[i].p3 * newArr[i].num}.00</span></p>
                            </div>
    
                            <div class="do-sp float-left">
                                <div class="del del-product del-normal">
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
        // $("#sh_cart").on("click",".jian",function(){
        //     var cookieArr = JSON.parse($.cookie("goods"));
        // })

        //添加点击事件 删除
        $("#sh_cart").on("click","del",function(){
            var id = this.id;
             //1.删除页面上的数据  closest找到父节点
            $(this).closest("#sh_cart li").remove();
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
        })

        
    }
    return{
        shopping:shopping
    }
})