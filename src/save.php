<?php 

header('Content-Type: application/json;charset=utf-8');
header('Accept: application/json');

$postData = file_get_contents('php://input');

if ($postData) {
/*
$data = json_decode($postData, true);

echo "1) ".$data['personal_data'][0]['id']."\n";

echo $postData."\n";
*/

$fd = fopen("db.json", 'w') or die("не удалось создать файл");
fwrite($fd, $postData);
fclose($fd);

}

?>