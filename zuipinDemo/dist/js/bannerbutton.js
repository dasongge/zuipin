console.log("banner图下方的图片");

define(["jquery"],function($){
    function bannerbutton(){
        $.ajax({
            url:"../data/bannerbutton.json",
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    var node = $(`
                    <a href="#" target="_blank">
                    <img src="${arr[i].img}" alt="自饮选茶">
                    </a>
                    `);
                    node.appendTo(".wrapper");
                }
            },error:function(msg){
                alert(msg);
            }
        })
    }
    return{
        bannerbutton:bannerbutton
    }
})