<?php

include("../functions.php");
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

if ($data->register) {
    $firstName = $data->firstName;
    $lastName  = $data->lastName;
    $email     = $data->email;
    $password  = $data->password;

    if (!empty($firstName) && !empty($lastName) && !empty($email) && !empty($password)) {
        if (register( $firstName, $lastName, $email, $password )) {
            http_response_code(200);
        } else {
            http_response_code(409);
        }
    } else {
        http_response_code(400);
    }
} else {
    http_response_code(500);
}
?>