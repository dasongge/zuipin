console.log("醉品头条");

define(["jquery"],function($){
    function toutiao(){
       
        $.ajax({
            url:"../data/toutiao.json",
            
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    var node = $(`
                    <a class="zi" href="">
                        <div class="first-img">
                            <img src="${arr[i].img}" alt="">
                        </div>
                        <p class="first-text">${arr[i].p}</p>
                        <p class="first-descr">${arr[i].p1}</p>
                    </a>
                    `);
                    node.appendTo(".toutiaoxin");
                }
            },error:function(msg){
                alert(msg);
            }
        })
    }
    return{
        toutiao:toutiao
    }
})