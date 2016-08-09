<?php

header('Access-Control-Allow-Method: DELETE');

include('../functions.php');

if (isLoggedIn()) {
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if (isset($_GET['id'])) {
            if (deleteRoom($_GET['id'])) {
                http_response_code(200);
                deleteRoom(intval($_GET['id']));
            } else {
                // something else went wrong
                http_response_code(500);
            }
        } else {
            // bad request
            http_response_code(400);
        }
    } else {
        // method not allowed
        http_response_code(405);
    }
} else {
    // unauthorized
    http_response_code(401);
}
