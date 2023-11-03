<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Creating connection
$conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));

// Checking connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
$sql = "SELECT * FROM medicines";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $Data = array();
  while($row = $result->fetch_assoc()) {
    $NewData = (object) [
      'medicine_id' => $row["medicine_id"],
      'name' => $row["medicine_name"],
      'price' => $row["price"],
      'category_id' => $row["category_id"],
      'image' => base64_encode($row["image"]),
    ];
    array_push($Data, $NewData);
  }
} else {

}
$conn->close();
echo json_encode($Data);

?>
