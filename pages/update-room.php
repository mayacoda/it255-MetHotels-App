<?php

include("../functions.php");
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

$postdata = file_get_contents("php://input");
$data     = json_decode($postdata);

if (isLoggedIn()) {
    if ($_SERVER["REQUEST_METHOD"] == "PUT" && $data) {
        $hotelId = $data->hotelId;
        $type    = $data->type;
        $area    = $data->area;
        $people  = $data->people;
        $price   = $data->price;
        $id      = $data->id;

        if (!empty($type) && !empty($people) && !empty($hotelId) && !empty($price) && !empty($id)) {
            if (updateRoom($id, $type, $people, $hotelId, $price)) {
                http_response_code(200);
            } else {
                http_response_code(500);
            }
        } else {
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


