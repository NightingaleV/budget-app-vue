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
if ($username) {

    // Query to DB
    // $stmt = $db->prepare('select id, title, accountId,
    // amount, createdAt FROM `transaction`
    // WHERE accountId=? order by createdAt asc');
    $stmt = $db->prepare('select t.id as id, title, accountId, amount, createdAt, GROUP_CONCAT(category_id SEPARATOR ",") as categories
    FROM `transaction` t
    left JOIN transaction_category_map tcm on tcm.transaction_id=t.id
    WHERE accountId=?
    GROUP by t.id, title, accountId, amount, createdAt
     order by createdAt asc');
    $stmt->bind_param("s",
        $payload['accountId']
    );
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
          $row['categories'] = explode(',', $row['categories']); ;
          $rows[$row['id']] = $row;

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
