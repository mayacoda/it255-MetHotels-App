<?php

include("../functions.php");

http_response_code(200);
$result = getHotelsWithRooms();
$json = json_encode($result);
echo $json;