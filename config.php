<?php

$host     = "localhost";
$userName = "root";
$password = "notroot";
$database = "it255";

$connection = new mysqli( $host, $userName, $password, $database, 8889 );

if ($connection->connect_error) {
    die('Connection error: ' . $connection->connect_error);
}

$sql = "CREATE TABLE `guests` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
`firstname` VARCHAR(150) NOT NULL, 
`lastname` VARCHAR(150) NOT NULL, 
`email` VARCHAR(150) NOT NULL, 
`password` VARCHAR(256) NOT NULL
)
COLLATE='utf8_unicode_ci' 
ENGINE=InnoDB";

$connection->query( $sql ); // will return false if table already exists