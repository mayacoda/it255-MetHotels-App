<?php
include("config.php");

function isLoggedIn() {
    global $connection;

    if (isset($_SERVER['HTTP_TOKEN']) && !empty($_SERVER['HTTP_TOKEN'])) {
        $token = $_SERVER['HTTP_TOKEN'];
        $query = $connection->prepare("SELECT * FROM guests WHERE token=?");
        $query->bind_param('s', $token);

        $query->execute();
        $query->store_result();

        return $query->num_rows > 0;
    }

    return false;
}

function register($firstName, $lastName, $email, $password) {
    global $connection;

    $insert = 'INSERT INTO guests (firstname,lastname,email,password) VALUES (?,?,?,?)';
    $query  = $connection->prepare($insert);

    $query->bind_param('ssss', $firstName, $lastName, $email, md5($password));

    if (!checkEmailUniqueness($email)) {
        $query->execute();
        $query->close();

        $id         = sha1(uniqid());
        $tokenQuery = $connection->prepare("UPDATE guests SET token=? WHERE email=?");
        $tokenQuery->bind_param('ss', $id, $email);
        $tokenQuery->execute();
        $tokenQuery->store_result();

        return $id;
    }

    return false;

}

function checkEmailUniqueness($email) {
    global $connection;

    $sql   = "SELECT * FROM guests WHERE email=?";
    $query = $connection->prepare($sql);
    $query->bind_param('s', $email);
    $query->execute();
    $query->store_result();

    return $query->num_rows > 0;
}

function loginUser($email, $password) {
    global $connection;
    $sql   = "SELECT * FROM guests WHERE email=? AND password=?";
    $query = $connection->prepare($sql);
    $query->bind_param('ss', $email, md5($password));
    $query->execute();
    $query->store_result();

    if ($query->num_rows > 0) {
        $id         = sha1(uniqid());
        $tokenQuery = $connection->prepare("UPDATE guests SET token=? WHERE email=?");
        $tokenQuery->bind_param('ss', $id, $email);
        $tokenQuery->execute();
        $tokenQuery->store_result();

        return $id;
    }

    return false;
}

function createHotel($location, $name, $image) {
    global $connection;

    $sql   = 'INSERT INTO hotels (location,name,image) VALUES (?,?,?)';
    $query = $connection->prepare($sql);
    $query->bind_param('sss', $location, $name, $image);
    $query->execute();

    $id = $connection->insert_id;
    $query->close();

    return $id;
}

function createRoom($hotelId, $type, $area, $people, $price) {
    global $connection;

    $sql   = 'INSERT INTO rooms (hotelId, type, area, people, price) VALUES (?,?,?,?,?)';
    $query = $connection->prepare($sql);
    $query->bind_param('isiii', $hotelId, $type, $area, $people, $price);
    $query->execute();

    $id = $connection->insert_id;
    $query->close();

    return $id;
}

function updateRoom($id, $type, $people, $hotelId, $price) {
    global $connection;

    $query = $connection->prepare("UPDATE rooms SET type=?, people=?, hotelId=?, price=? WHERE id=?");
    $query->bind_param('siiii', $type, $people, $hotelId, $price, $id);

    return $query->execute();
}

function deleteRoom($id) {
    global $connection;

    $query = $connection->prepare("DELETE FROM rooms WHERE id=?");
    $query->bind_param('i', $id);

    return $query->execute();
}

function getHotels() {
    global $connection;

    $sql      = "SELECT * FROM hotels";
    $response = $connection->query($sql);
    $results  = array();

    while ($row = $response->fetch_assoc()) {
        array_push($results, $row);
    }

    return $results;
}

function getHotelsWithRooms() {
    global $connection;
    $sql = "SELECT *, h.id AS hotel_id, r.id AS room_id FROM hotels h LEFT JOIN  rooms r ON h.id = r.hotelId";

    $response = $connection->query($sql);

    $results = array();

    while ($row = $response->fetch_assoc()) {
        $hotelId = $row["hotel_id"];
        $roomId  = $row["room_id"];
        if (!isset($results[ $hotelId ])) {
            $results[ $hotelId ] = [
                "id"       => $hotelId,
                "location" => $row["location"],
                "image"    => $row["image"],
                "name"     => $row["name"],
                "rooms"    => array()
            ];
        }

        $results[ $hotelId ]['rooms'][] = [
            "id"     => $roomId,
            "type"   => $row["type"],
            "area"   => $row["area"],
            "people" => $row["people"],
            "price"  => $row["price"]
        ];
    }


    return array_values($results);
}

function getRooms() {
    global $connection;

    $sql      = "SELECT * FROM rooms";
    $response = $connection->query($sql);
    $results  = array();

    while ($row = $response->fetch_assoc()) {
        array_push($results, $row);
    }

    return $results;
}

function getRoomById($id) {
    global $connection;

    $sql      = "SELECT * FROM rooms where id={$id}";
    $response = $connection->query($sql);

    if ($response->num_rows > 0) {
        return $response->fetch_object();
    } else {
        return false;
    }
}