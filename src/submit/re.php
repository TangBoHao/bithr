<?php

/* -------- function definition -------- */

/**
 * post parameter checking 
 * @param array
 * @param array
 * @return mixed
 */
function paraCheck(array $input, array $rules){
    $output = array();
    foreach ($input as $paraName => $value) {
        if (array_key_exists($paraName, $rules)) {
            if (is_int($rules[$paraName])) {
                $output[$paraName] = trim(substr($value, 0, $rules[$paraName]));
            } else {
                $matchCount = preg_match($rules[$paraName], $value, $match);
                if ($matchCount == 1) {
                    $output[$paraName] = $match[1];
                } else {
                    return false;
                }
            }
        }
    }
    if (count($output) == 0) {
        return false;
    } else {
        return $output;
    }
}


require __DIR__.'/vendor/autoload.php';

$log = new Katzgrau\KLogger\Logger(__DIR__.'/rlog', Psr\Log\LogLevel::DEBUG, array (
    'dateFormat' => 'Y-m-d H:i:s',
    'prefix' => 'bit_register_',
    'extension' => 'log',
));

/* -------- constants -------- */

define('DB_SERVER_NAME', 'mysql'                          );
define('DB_USER_NAME'  , getenv('ISCUECER_MYSQL_USER')    );
define('DB_PASSWORD'   , getenv('ISCUECER_MYSQL_PASSWORD'));
define('DB_NAME'       , getenv('ISCUECER_MYSQL_DATABASE'));

$ARR_ERROR_CODE = [
    'QUERY_SUCCESS'          => 200,
    'QUERY_FAILED'           => 501,
    'DB_CONNECT_FAILED'      => 500,
    'INVALID_POST_PARAM'     => 403,
    'INVALID_REQUEST_METHOD' => 403,
];

$paraCheckingRules = [
    'name'         =>   '/([\x{4e00}-\x{9fa5}]{2,20})/u',
    'sex'          =>   '/([01])/',
    'major'        =>   '/([\x{4e00}-\x{9fa5}]{2,20})/u',
    'student_id'   =>   '/(201[3-6]\d{8})/',
    'phone'        =>   '/(1\d{10})/',
    'intention'    =>   '/([0123])/',
    'comment'      =>   520
];


/* -------- procedure begin -------- */

$responseData = [ 'errcode' => 0 ];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // POST parameter checking
    $readyData = paraCheck($_POST, $paraCheckingRules);
    if ($readyData !== FALSE) {

        $readyData['name'] = base64_encode($readyData['name']);
        $readyData['major'] = base64_encode($readyData['major']);
        $readyData['comment'] = base64_encode($readyData['comment']);
        // 创建连接
        $conn = new mysqli(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);

        // 检测连接
        if (!$conn->connect_error) {

            //设置数据库字符集
            mysqli_set_charset($conn,"utf8");

            //插入数据
            $queryString = "INSERT INTO `newstudents_v` (
                `name`, `sex`, `major`, `studentid`, `phone`, `intention`, `comment`
            )
            VALUES (
                '{$readyData['name']}',  '{$readyData['sex']}',  '{$readyData['major']}',
                '{$readyData['student_id']}',  '{$readyData['phone']}',  '{$readyData['intention']}',
                '{$readyData['comment']}'
            )";

            if ($conn->query($queryString) === TRUE) {
                // QUERY SUCCESSFULLY
                $responseData['errcode'] = $ARR_ERROR_CODE['QUERY_SUCCESS'];
            } else {
                // ERROR QUERYING
                $responseData['errcode'] = $ARR_ERROR_CODE['QUERY_FAILED'];
            }

            $conn->close();
            
        } else {
            // CONNECT TO THE MYSQL SERVER FAILED
            $responseData['errcode'] = $ARR_ERROR_CODE['DB_CONNECT_FAILED'];
        }   
    } else {
        // invalid POST parameters received
        $responseData['errcode'] = $ARR_ERROR_CODE['INVALID_POST_PARAM'];
    }
} else {
    // INVALID REQUEST METHOD
    //TODO: LOGGING
    $responseData['errcode'] = $ARR_ERROR_CODE['INVALID_REQUEST_METHOD'];
}

if ($responseData['errcode'] != $ARR_ERROR_CODE['QUERY_SUCCESS']) {
    $log->error('error', array('errcode'=>$responseData['errcode'], 'post'=>$_POST));
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($responseData);
