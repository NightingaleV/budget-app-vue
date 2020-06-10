<?php

if ( !isset( $db ) ) {
    require( dirname( __FILE__ ) . "/../db-connection.php" );
}

// Transformation From Json
$inputFile = file_get_contents('php://input');
$requestData = json_decode($inputFile, true);

// Set
$payload = $requestData['requestData'];
if ($payload) {

    // Query to DB
    $stmt = $db->prepare('DELETE FROM `account` WHERE id=?');
    $stmt->bind_param("s",
        $payload['id']
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
