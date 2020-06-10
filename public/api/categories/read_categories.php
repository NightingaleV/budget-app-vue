<?php
if ( !isset( $db ) ) {
    require( dirname( __FILE__ ) . "/../db-connection.php" );
}

// Transformation From Json
$inputFile = file_get_contents('php://input');
$requestData = json_decode($inputFile, true);

// Set
// $username = $requestData['user'];
// $payload = $requestData['requestData'];
if ($username) {

    // Query to DB
    $stmt = $db->prepare('select id, title, icon
    FROM `category` order by id asc');
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
          $rows[] = $row;

   }
   // Todo Categories

    // Send a response
    $responseData = new \stdClass();;
    $responseData->response = "success";
    // Put it into json
    $responseData->payload = $rows;
    $responseJson = json_encode($responseData);
    echo $responseJson;
};


?><?php
