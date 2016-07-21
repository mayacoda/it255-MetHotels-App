<?php
include("config.php");

function register($firstName, $lastName, $email, $password) {
    global $connection;

    $insert = 'INSERT INTO guests (firstname,lastname,email,password) VALUES (?,?,?,?)';
    $query = $connection->prepare($insert);

    $query->bind_param('ssss', $firstName, $lastName, $email, md5($password));

    if (!checkEmailUniqueness($email)) {
        $query->execute();
        $query->close();
        return true;
    } else {
        return false;
    }
}

function checkEmailUniqueness($email) {
    global $connection;

    $sql = "SELECT * FROM guests WHERE email=?";
    $query = $connection->prepare($sql);
    $query->bind_param('s', $email);
    $query->execute();
    $query->store_result();

    return $query->num_rows > 0;
}

function loginUser($email, $password) {
    global $connection;
    $sql = "SELECT * FROM guests WHERE email=? AND password=?";
    $query = $connection->prepare($sql);
    $query->bind_param('ss', $email, md5($password));
    $query->execute();
    $query->store_result();

    return $query->num_rows > 0;
}