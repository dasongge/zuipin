<?php
    header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0, "message" => "");

	$username = $_POST["username"];
    $password = $_POST["password"];
    
    $str = md5(md5(md5($password)."dongxuesong")."shuaige");

    //验证
    if($username == ""){
        $responseData['code'] = 1;
        $responseData['message'] = '用户名不能为空';
        echo json_encode($responseData);
        exit;
    }
    if($password == ''){
        $responseData['code'] = 2;
        $responseData['message'] = '密码不能为空';
        echo json_encode($responseData);
        exit;
    }
    
    //在数据库验证这个用户名和密码是否存在

    $link = mysql_connect("localhost","root","123456");

    if(!$link){
        $responseData['code'] = 3;
        $responseData['message'] = '数据库连接失败';
        echo json_encode($responseData);
        exit;
    }

    mysql_set_charset("utf8");

    //选择数据库
    mysql_select_db("dxs");

    $sql = "SELECT * FROM userse WHERE name='{$username}' AND password='{$str}'";
    $res = mysql_query($sql);

    //取出一行数据
    $row = mysql_fetch_assoc($res);

    if(!$row){
        $responseData['code'] = 4;
        $responseData['message'] = '用户名或密码错误';
        echo json_encode($responseData);
        exit;
    }else{
        
        $responseData['message'] = '登录成功';
        echo json_encode($responseData);
        exit;
    }
    mysql_close($link);
?>