<?php
$roomList = file_get_contents("./room-list.json");

http_response_code(200);
echo $roomList;