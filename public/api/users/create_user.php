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
    $stmt = $db->prepare("SELECT * FROM user WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result()->num_rows;
    $stmt->close();
    if($result > 0 ){
      $responseData->response = 'duplicated';
    }
    else{

      try {
        // insert into db
        $db->begin_transaction();
        $stmt = $db->prepare("INSERT INTO user (id, email) VALUES (?,?)");
        $stmt->bind_param("ss", $payload['id'], $email);
        $stmt->execute();
        $stmt->close();

        //hashing password
        $passwordHash = password_hash($password, PASSWORD_BCRYPT, array('cost' => 10));
        $stmt = $db->prepare("UPDATE `user` SET password = ? WHERE id = ?");
        $stmt->bind_param("ss", $passwordHash, $payload['id']);
        $stmt->execute();
        $stmt->close();

        $db->commit();
        $responseData->response = 'success';


      } catch (Exception $e) {
          $responseData->response = 'failure';
          $db->rollback();
      }

    }
    // Put it into json
    $responseJson = json_encode($responseData);
    echo $responseJson;
}

?><?php
