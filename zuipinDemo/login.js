console.log("登录");

define(["jquery","jquery-cookie"],function($){
    
    function login(){
        $("#but").click(function(){
           
            $.ajax({
                type:'post',
                url:'../data/login.php',
                data:{
                    username:$("input").eq(0).val(),
                    password: $("input").eq(1).val()
                },
                success:function(msg){
                   
                    var obj = JSON.parse(msg);
                    if(obj.code){
                        $(".form-in1").css("display","block");
                        $(".form-in1").html(obj.message);
                        // $(".form-in1").css("color","green");
                    }else{
                        $(".form-in1").css("display","block");
                        $(".form-in1").html(obj.message);
                        $(".form-in1").css("color","white");
                        setTimeout(function(){
                            location.assign('../index.html');
                        },2000);
                    }
                },
                error:function(msg){
                    console.log("登录2");
                    alert(msg);
                }
            })
        })
        
    }
    return{
        login:login
    }
})