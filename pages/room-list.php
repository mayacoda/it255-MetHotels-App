<?php

include('../functions.php');

$roomList = getRooms();

http_response_code(200);
$json = json_encode($roomList);
echo $json;