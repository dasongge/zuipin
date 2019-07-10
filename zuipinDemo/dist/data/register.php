<?php
    header('content-type:text/html;charset="utf-8"');

//声明一个统一的返回格式
    $reponseData = array("code" => 0,"message" => "");
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $addTime = $_POST['addTime'];
    $length1 =strlen($username);
    $length = strlen($password);

 /* 简单验证一下提交过来的数据
		1、验证用户名是否为空
		2、验证密码是否为空
        3、两次输入密码是否一致 */


    if($username == ''){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!($length1 > 6 && $length1 <18) ){
        $responseData["code"] = 7;
        $responseData["message"] = "用户名字符应大于6位小于18位";
        echo json_encode($responseData);
        exit;
    }
    if($password == ''){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if($length <6 || $length >16){
        $responseData["code"] = 8;
        $responseData["message"] = "密码长度应大于6位小于16位";
        echo json_encode($responseData);
        exit;
    }
    if($password != $repassword){
        $responseData["code"] = 3;
        $responseData["message"] = "两次密码输入不一致";
        echo json_encode($responseData);
        exit;
    }

    //在数据库中验证本次注册是否成功

    $link = mysql_connect("localhost", "root", "123456");

	if(!$link){
		$responseData["code"] = 4;
		$responseData["message"] = "数据库链接失败";
		echo json_encode($responseData);
		exit;
    }
    mysql_set_charset("utf8");

    //选择数据库
    mysql_select_db("dxs");

    //准备sql，去判断表中是否有同名用户
    $sql = "SELECT * FROM userse WHERE name='{$username}'";

    //发送sql语句
    $res = mysql_query($sql);

    
    $row = mysql_fetch_assoc($res);

   
    if($row){
        $responseData["code"] = 5;
        $responseData["message"] = "用户名已存在";
        echo json_encode($responseData);
        exit;
    }else{
        //密码md5加密
        $str = md5(md5(md5($password)."dongxuesong")."shuaige");
        //准备sql语句进行注册
        $sql2 = "INSERT INTO userse(name,password,addTime) VALUES('{$username}','{$str}',{$addTime})";
        $res = mysql_query($sql2);

        if(!$res){
            $responseData["code"] = 6;
            $responseData["message"] = "注册失败";
            echo json_encode($responseData);
            exit;
        }else{
            $responseData["message"] = "注册成功";
			echo json_encode($responseData);
        }
    }
    mysql_close($link);





?>