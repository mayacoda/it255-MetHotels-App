<?php

include('../functions.php');

if (isLoggedIn()) {
    http_response_code(200);

    $roomList = getRooms();
    $json = json_encode($roomList);
    echo $json;
} else {
    http_response_code(401);
}