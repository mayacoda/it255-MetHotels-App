<?php

include("../functions.php");

session_start();

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

if ($data->login) {
    $email    = $connection->real_escape_string( $data->email );
    $password = $data->password;

    if (!empty($email) && !empty($password)) {
        if ($token = loginUser( $email, $password )) {
            $_SESSION['email'] = $email;
            echo json_encode(['token'=> $token]);
            http_response_code(200);
        } else {
            http_response_code(401);
        }
    } else {
        http_response_code(400);
    }
} else {
    http_response_code(500);
}

if (isset($_SESSION['email'])) { ?>

<?php } else {

    ?>

<?php }

getFooter(); ?>