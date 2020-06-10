<?php
if ( !isset( $db ) ) {
    require( dirname( __FILE__ ) . "/../db-connection.php" );
}

// Transformation From Json
$inputFile = file_get_contents('php://input');
$requestData = json_decode($inputFile, true);

// Set
$username = $requestData['user'];
if ($username) {

    // Query to DB
    $stmt = $db->prepare('select id, owner_id as ownerId, name, balance FROM `account`
    WHERE owner_id=(select id from user where email = ?) order by name asc');
    $stmt->bind_param("s",
        $username
    );
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
           $rows[$row['id']] = $row;
   }
    // Send a response
    $responseData = new \stdClass();;
    $responseData->response = "success";
    // Put it into json
    $responseData->payload = $rows;
    $responseJson = json_encode($responseData);
    echo $responseJson;
};


?><?php
