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
    // Query to DB
    $stmt = $db->prepare('INSERT INTO `transaction`(`id`, `title`, `accountId`, `amount`) VALUES (?,?,?,?)');
    $stmt->bind_param("sssd",
        $payload['id'],
        mysqli_real_escape_string($db,$payload['title']),
        $payload['accountId'],
        $payload['amount']
    );
    $stmt->execute();
    $error = $db->error;
    $result = $stmt->get_result();
    $stmt->close();

    // insert into map
    $transactionId = $payload['id'];
    $sql_insert = 'INSERT INTO `transaction_category_map`(`transaction_id`, `category_id`) VALUES ';
    foreach ($payload['categories'] as $catId) {
      // code...
      $sql_insert .= '("'.$transactionId.'","'.$catId.'"),';
    };
    $sql_insert = substr($sql_insert, 0, -1) .';';

    $db->query($sql_insert);

    // echo $sql_insert;
    // $stmt2 = $db->prepare($sql_insert);
    // $stmt2->execute();
    $error = $db->error;
    // $result = $stmt2->get_result();
    // $stmt2->close();

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









// // Set
// // $username = $requestData['user'];
// $payload = $requestData['requestData'];
// if ($payload) {
//
//     // Query to DB
//     $stmt = $db->prepare('INSERT INTO `transaction`(`id`, `title`, `accountId`, `amount`)
//     VALUES (?,?,?,?)');
//     $stmt->bind_param("sssd",
//         $payload['id'],
//         mysqli_real_escape_string($db,$payload['title']),
//         $payload['accountId'],
//         $payload['amount']
//     );
//     $stmt->execute();
//     $error = $db->error;
//     $result = $stmt->get_result();
//     $stmt->close();
//
//     // Send a response
//     $responseData = new \stdClass();;
//     if ($error) {
//         echo $error;
//         $responseData->response = "failure";
//     } else {
//         $responseData->response = "success";
//     }
//     // Put it into json
//     $responseJson = json_encode($responseData);
//     echo $responseJson;
// }
// $responseData = new \stdClass();;
// $responseData->response = "success";
// echo $responseJson;

?><?php
