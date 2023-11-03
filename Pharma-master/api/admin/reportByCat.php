<?php
// Connect to the database
$conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));

// Check the connection
if (!$conn) {
    // Return an error response if the connection failed
    $response = array('error' => 'Could not connect to the database');
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Get the request body as a JSON object
$data = json_decode(file_get_contents("php://input"));

// Get the category ID from the request body
$category_id = $data->category_id;

// Build the SQL query
$sql = "SELECT m.`medicine_id`, m.`medicine_name`, m.`price`, m.`category_id`, m.`image` , SUM(cc.`quantity`) AS `total_quantity`,
SUM(cc.`quantity` * m.`price`) AS `grand_total`
FROM `cart` c
JOIN `cart_contains` cc ON c.`cart_id` = cc.`cart_id`
JOIN `medicines` m ON cc.`medicine_id` = m.`medicine_id`
WHERE c.`ispaid` = 1  AND m.`category_id` = $category_id
GROUP BY m.`medicine_id`

";

// Execute the query and retrieve the results
$result = mysqli_query($conn, $sql);

if (!$result) {
    // Return an error response if the query failed
    $response = array('error' => 'Could not execute the query');
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

$response = array();
while($row = $result->fetch_assoc()) {
    $newData = (object) [
      'medicine_id' => $row["medicine_id"],
      'name' => $row["medicine_name"],
      'price' => $row["price"],
      'category_id' => $row["category_id"],
      'image' => base64_encode($row["image"]),
      'total_quantity' => $row["total_quantity"],
      'grand_total' => $row["grand_total"],
    ];
    array_push($response, $newData);
  }

// Close the connection
mysqli_close($conn);

// Return the results as a JSON response
header('Content-Type: application/json');
echo json_encode($response);


?>