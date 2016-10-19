<?php
if (isset($_GET['key']) && $key=='hel2IU2k' || is_command_line_interface()) {
	define('DB_SERVER_NAME', 'mysql'                          );
	define('DB_USER_NAME'  , getenv('ISCUECER_MYSQL_USER')    );
	define('DB_PASSWORD'   , getenv('ISCUECER_MYSQL_PASSWORD'));
	define('DB_NAME'       , getenv('ISCUECER_MYSQL_DATABASE'));
	
	// 创建连接
	$conn = new mysqli(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
	
	
	// 检测连接
	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}
	
	// alter database
	
	$sql = "ALTER DATABASE ".DB_NAME."
	        CHARACTER SET 'utf8' 
	        COLLATE 'utf8_general_ci'";
	
	
	if ($conn->query($sql)) {
	    echo "数据库属性修改成功\n";
	} else {
	    echo "Error creating database: " . mysqli_error($conn)."\n";
	    $conn->close();
	    exit(-1);
	}
	
	// sql to create table
	$sql = "CREATE TABLE newstudents_v (
	    a_id       INT UNSIGNED NOT NULL AUTO_INCREMENT,
	    name       VARCHAR(30)  NOT NULL,
	    sex        VARCHAR(30)  NOT NULL,
	    major      VARCHAR(30)  NOT NULL,
	    studentid  VARCHAR(30)  NOT NULL,
	    phone      VARCHAR(30)  NOT NULL,
	    intention  VARCHAR(30)  NOT NULL,
	    comment    VARCHAR(1000),
	    reg_date   TIMESTAMP,
	    PRIMARY KEY (a_id)
	) DEFAULT CHARSET=utf8";
	
	if ($conn->query($sql) === TRUE) {
	    echo "用户数据表创建成功";
	} else {
	    echo "Error creating table: " . $conn->error."\n";
	}
	
	$conn->close();
}

function is_command_line_interface () {
    return (php_sapi_name() === 'cli');
}	
