<?php

if ( !isset( $db ) ) {
    require( dirname( __FILE__ ) . "/../db-connection.php" );
}

// Transformation From Json
$inputFile = file_get_contents('php://input');
$requestData = json_decode($inputFile, true);

// Set
$username = $requestData['user'];
$payload = $requestData['requestData'];
if ($payload) {

    // Query to DB
    $stmt = $db->prepare('INSERT INTO account (id, owner_id, name, balance)
VALUES (?,(select id from user where email = ?),?,?);');
    $stmt->bind_param("sssd",
        $payload['id'],
        $username,
        mysqli_real_escape_string($db, $payload['name']),
        $payload['balance']
    );
    $stmt->execute();
    $error = $db->error;
    $result = $stmt->get_result();
    $stmt->close();

    // Send a response
    $responseData = new \stdClass();;
    if ($error) {
        echo $error;
        $responseData->response = "failure";
    } else {
        $responseData->response = "success";
    }
    // Put it into json
    $responseJson = json_encode($responseData);
    echo $responseJson;
}
$responseData = new \stdClass();;
$responseData->response = "success";
echo $responseJson;

?><?php
