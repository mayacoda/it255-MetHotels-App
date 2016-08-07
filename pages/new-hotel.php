<?php

include("../functions.php");
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header( "Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}" );
    header( 'Access-Control-Allow-Credentials: true' );
    header( 'Access-Control-Max-Age: 86400' );
}

$postdata = file_get_contents( "php://input" );
$data     = json_decode( $postdata );

if ($data) {
    $location = $data->location;
    $name     = $data->name;
    $image    = $data->image;

    if (!empty($location) && !empty($name)) {
        $id = createHotel( $location, $name, $image );

        if ($id) {
            http_response_code( 200 );
            echo json_encode( [
                "id"       => $id,
                "location" => $location,
                "name"     => $name,
                "image"    => $image
            ] );
        } else {
            http_response_code( 500 );
        }
    } else {
        http_response_code( 400 );
    }
}