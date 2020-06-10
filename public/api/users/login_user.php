<?php

if ( !isset( $db ) ) {
    require( dirname( __FILE__ ) . "/../db-connection.php" );
}

// Transformation From Json
$inputFile = file_get_contents('php://input');
$requestData = json_decode($inputFile, true);

// Set
// $username = $requestData['user'];
$payload = $requestData['requestData'];
if ($payload) {

    $responseData = new \stdClass();
    $email = mysqli_real_escape_string($db, $payload['email']);
    $password = mysqli_real_escape_string($db, $payload['password']);

    // Query to DB

    $stmt = $db->prepare("SELECT * FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();


    if (isset($row)) {
        if (password_verify($password, $row['password'])) {
          $responseData->response = 'success';
        } else {
          $responseData->response = 'wrong_password';
        }
    }
    else {
      $responseData->response = 'no_user';
    }


    // Put it into json
    $responseJson = json_encode($responseData);
    echo $responseJson;
}

?><?php
