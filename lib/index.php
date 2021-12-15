<?php
// 引入mysql文件
include('./mysql.php');
// 获取访问的方法
$fn = $_GET['fn'];
// add()
$fn();
// 添加数据的方法
function add(){
    $idea = $_GET['idea'];
    $title = $_GET['title'];
    $pos = $_GET['pos'];
  $sql = "insert into problem values(null,'$title','$pos','$idea')";

  $res = query($sql);
  echo $res;
}

// 获取指定用户的购物车
function getUserCart(){
    // 查询总数
    // 查询
    $uId = $_POST['uId']
    $sql = "select * from cart order by id asc where id=".$uId;
    $res = select($sql);
    print_r(json_encode($res));
}

// 删除数据的方法
function del(){
    $id = $_GET['infoId'];
    $sql = 'delete from problem where id='.$id;
    $res = query($sql);
    echo $res;

}

// 修改数据的方法
function update(){
    $id = $_GET['infoId'];
    $idea = $_GET['idea'];
    $title = $_GET['title'];
    $pos = $_GET['pos'];
    $sql = 'update problem set title="'.$title.'",pos="'.$pos.'",idea="'.$idea.'" where id='.$id;
    $res = query($sql);
    echo $res;
}

// 获取单个数据的方法
function getOnly(){
    $id = $_GET['infoId'];
    $sql = 'select * from problem where id='.$id;
    $res = select($sql);
    print_r(json_encode($res));
}
?>