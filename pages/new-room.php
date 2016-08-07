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
    $hotelId = $data->hotelId;
    $type    = $data->type;
    $area    = $data->area;
    $people  = $data->people;
    $price   = $data->price;


    if (!empty($type) && !empty($people) && !empty($hotelId) && !empty($price)) {
        $id = createRoom( $hotelId, $type, $area, $people, $price );

        if ($id) {
            http_response_code( 200 );
            echo json_encode( [
                "id"      => $id,
                "hotelId" => $hotelId,
                "area"    => $area,
                "people"  => $people,
                "price"   => $price,
                "type"    => $type
            ] );

        } else {
            http_response_code( 500 );
        }
    }
}