console.log("注册");

define(["jquery","jquery-cookie"],function($){
	function register(){
        var str = "";//全局变量  用来改变密码判断
        // 用户
        $("#username").blur(function(){
             //删除多余的空格
             oValue = this.value.replace(/\s/g,"");
             this.value = oValue;
              //判断用户名长度是否符合要求6到18位
              if(oValue.length > 18 || oValue.length < 6){
                $("#username_span").html("用户名长度为6~18位")  ;
                $("#username_span").css("color","#C00");
               $("#username").css("backgroundColor","#FBE2E2") ;
            }else if(/^[^a-zA-z]/.test(oValue)){
                $("#username_span").html("首字母必须为英文字母")  ;
                $("#username_span").css("color","#C00");
               $("#username").css("backgroundColor","#FBE2E2") ;

            }else if(/\W/.test(oValue)){
                $("#username_span").html("必须为数字、字母、下划线") ;
                $("#username_span").css("color","#C00");
               $("#username").css("backgroundColor","#FBE2E2") ;
            }else{
                $("#username_span").html("√用户名合法") ;
                $("#username_span").css("color","#3D882D");
                $("#username").css("backgroundColor","#d2ffd6") ;
            }
        })
        //密码
        $("#mima1").keyup(function(){
            
            for(var i = 0 ; i < $(".pp1 span").length;i++){
                $(".pp1 span").eq(i).css("className","");
                $(".pp1 span").eq(i).css("display","block");
               
            }
            var oValue = this.value;
            if(oValue){
                //如果有值才去判断密码强度
                if(/\d/.test(oValue) && /[a-z]/.test(oValue) && /[A-Z]/.test(oValue)){
                    
                    $(".pp1 span").eq(2).css("className","active");
                    $(".pp1 span").eq(2).html("强");
                    $(".pp1 span").eq(0).html("");
                    $(".pp1 span").eq(1).html("");
                    str = "密码强度为：强";
                }else if(/^\d+$/.test(oValue) || /^[a-z]+$/.test(oValue) || /^[A-Z]+$/.test(oValue)){
                   $(".pp1 span").eq(0).css("className","active");
                   $(".pp1 span").eq(0).html("弱");
                    
                    $(".pp1 span").eq(1).html("");
                   $(".pp1 span").eq(2).html("");
                    str = "密码强度为：弱";
                }else{
                    $(".pp1 span").eq(1).css("className","active");
                    $(".pp1 span").eq(1).html("中");
                    
                   $(".pp1 span").eq(0).html("");
                   $(".pp1 span").eq(2).html("");
                    str = "密码强度为：中";
                }
            }
        })
        $("#mima1").blur(function(){
            if($("#mima1").val().length > 16 || $("#mima1").val().length < 6){
                $("#sin").html("密码长度应为6~16个字符");
                $("#sin").css("color","#c00");
            }else{
                $("#sin").css("color","#3D882D");
                $("#sin").html(str);
            }

            $(".pp1 span").css("display","none");
        })
        //确认密码
        $("#conPassword").blur(function(){
            if($("#conPassword").val() == 0){
                $("#conPassword_span").html("请再次填写密码");
                $("#conPassword_span").css("color","#c00");
            }else if($("#mima1").val() == $("#conPassword").val()){
                $("#conPassword_span").html("密码一致");
                $("#conPassword_span").css("color","#3D882D");
            }else{
                $("#conPassword_span").html("两次填写的密码不一致");
                $("#conPassword_span").css("color","#c00");
            }
        })
        //编写验证码函数
        function testCode(n){
            var arr = [];
            for(var i = 0 ; i < n; i++){
                var tmp = parseInt(Math.random() * 123);

                if(tmp >=0 && tmp <= 9){
                    arr.push(tmp);
                }else if(tmp >=65 && tmp <= 90 || tmp >= 97 && tmp <= 122){
                    var charStr = String.fromCharCode(tmp);
                    arr.push(charStr);
                }else{
                    i--;
                }
            }

            return arr.join("");
        }
        //验证码
        $("#ma").html(testCode(6));
        $("#ma").click(function(){
            $("#ma").html(testCode(6));
        })
        $("#panduan").blur(function(){
            if($("#panduan").val() ==  $("#ma").html()){
                $(".pp4 span").html("验证码正确");
                $(".pp4 span").css("color","#3D882D");
            }else{
                $(".pp4 span").html("验证码不正确");
                $(".pp4 span").css("color","#c00");
            }
        })

        //上传信息
        //如果以上都正确则
       
            $("#button").click(function(){
                $.ajax({
                    type: "post",
                    url: "../data/register.php",
                    data: {
                        username: $("input").eq(0).val(),
                        password: $("input").eq(1).val(),
                        repassword:$("input").eq(2).val(),
                        addTime: (new Date()).getTime()
                    },
                    success:function(msg){
                        var obj = JSON.parse(msg);
                        if(obj.code){
                            $(".form-in1").css("display","block");
                            $(".form-in1").html(obj.message);
                            $(".form-in1").css("color","green");
                        }else{
                            $(".form-in1").css("display","block");
                            $(".form-in1").html(obj.message);
                            $(".form-in1").css("color","white");
                        }
                    },
                    error:function(msg){
                        
                        alert(msg);
                    }
                })
            })
        
        // }else{
        //     $("#button").click(function(){
        //         alert("请输入正确信息");
        //     })
            
        // }
        

    }
    return{
        register:register
    }
})