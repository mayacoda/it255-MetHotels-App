<?php

header( "Access-Control-Allow-Origin: *" );
header( 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN' );
if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    exit();
}

$host     = "localhost";
$userName = "root";
$password = "notroot";
$database = "it255";

$connection = new mysqli( $host, $userName, $password, $database, 8889 );

if ($connection->connect_error) {
    die('Connection error: ' . $connection->connect_error);
}

$guestQuery = "CREATE TABLE IF NOT EXISTS `guests` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
`firstname` VARCHAR(150) NOT NULL, 
`lastname` VARCHAR(150) NOT NULL, 
`email` VARCHAR(150) NOT NULL, 
`password` VARCHAR(256) NOT NULL,
`token` VARCHAR(128) NOT NULL
)
COLLATE='utf8_unicode_ci' 
ENGINE=InnoDB";

$connection->query( $guestQuery );

$roomQuery = "CREATE TABLE IF NOT EXISTS `rooms` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`hotelId` INT NOT NULL,
`type` VARCHAR(50) NOT NULL,
`area` INT DEFAULT NULL,
`people` INT NOT NULL,
`price` INT NOT NULL
)
COLLATE='utf8_unicode_ci' 
ENGINE=InnoDB";

$connection->query( $roomQuery );

$hotelQuery = "CREATE TABLE IF NOT EXISTS `hotels` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`location` VARCHAR(150) NOT NULL,
`image` VARCHAR(500) NOT NULL,
`name` VARCHAR(150) NOT NULL
)
COLLATE='utf8_unicode_ci' 
ENGINE=InnoDB";

$connection->query( $hotelQuery );
