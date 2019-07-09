define(["jquery"],function($){
	function dh(){
        $(function(){
            $.ajax({
                url:"../data/dh.json",
                success:function(arr){
                    //通过循环，创建节点添加到页面上

                    for(var i = 0; i < arr.length;i++){
                        
                        var node = $(`
                        <dl class="left_dh">
                            <dt>
                                <a href="#">${arr[i].name}</a>
                            </dt>
                            <dd>
                                <ul>
                                    <li><a href="#">${arr[i].class[0]}</a></li>
                                    <li><a href="#">${arr[i].class[1]}</a></li>
                                    <li><a href="#">${arr[i].class[2]}</a></li>
                                    <li><a href="#">${arr[i].class[3]}</a></li>
                                </ul>
                            </dd>
                            <div class="tabb">
                                <ul class="s">
                                    
                                </ul>
                            </div>
                        </dl>
                        `);
                        
                        for(var j = 0; j < arr[i].img.length;j++){
                          
                            var node1 =$(`
                                <li class="clear">
                                    <a href="#">
                                        <img src="${arr[i].img[j]}" alt="">
                                    </a>
                                    <a href="#">${arr[i].js[j]}</a>
                                </li>`);
                            node1.appendTo(node.find(`.tabb .s`));
                        }
                        node.appendTo(".dh .list-info");

                    }
                    
                   
                },
                error:function(msg){
                    alert(msg);
                }
            })


            //选项卡动效
            $(".dh").on("mouseenter", ".left_dh", function(){
                
                $(this).find(".tabb").css("display","block");

                // $(".left_dh").find(".tabb").css("display","none")
                // .eq($(this).index()).css("display","block");
  
            }).on("mouseleave", ".left_dh", function(){
                
                $(this).find(".tabb").css("display","none");

                // $(".left_dh").find(".tabb").css("display","none")
                // .eq($(this).index()).css("display","block");
  
            })
        })
    }
    return{
        ddh:dh
    }
})