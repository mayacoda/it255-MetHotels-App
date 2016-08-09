<?php

include('../functions.php');

if (isLoggedIn()) {
    http_response_code(200);

    if (isset($_GET['id'])) {
        if ($room = getRoomById(intval($_GET['id']))) {
            echo json_encode($room);
        } else {
            http_response_code(404);
        }
    } else {
        $roomList = getRooms();
        echo json_encode($roomList);
    }
} else {
    http_response_code(401);
}