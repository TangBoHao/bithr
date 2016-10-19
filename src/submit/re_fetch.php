<?php
header('Content-Type: text/plain; charset=utf-8');
if (isset($_GET['key']) && $_GET['key']=='SDLKFW3weuuSKiwjSDMtei') {
	define('DB_SERVER_NAME', 'mysql'                          );
	define('DB_USER_NAME'  , getenv('ISCUECER_MYSQL_USER')    );
	define('DB_PASSWORD'   , getenv('ISCUECER_MYSQL_PASSWORD'));
	define('DB_NAME'       , getenv('ISCUECER_MYSQL_DATABASE'));
	
	// 创建连接
	$conn = new mysqli(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
	
	// 检测连接
	
	//设置数据库字符集
	mysqli_set_charset($conn,"utf8");
	
	//插入数据
	$queryString = "SELECT * FROM `newstudents_v`";
	$result = $conn->query($queryString);
	
	header('Content-Type: text/plain; charset=utf-8');
	while(is_array($arr = $result->fetch_array(MYSQLI_NUM))){
		$arr[1] = base64_decode($arr[1]);
		$arr[3] = base64_decode($arr[3]);
		$arr[7] = base64_decode($arr[7]);
		echo implode(';;',$arr)."\n";
	}
}
