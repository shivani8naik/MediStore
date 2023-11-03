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
$sql = "SELECT * FROM contactus";
$result = $conn->query($sql);
$Data = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $NewData = (object) [
      'email' => $row["email"],
      'name' => $row["name"],
      'contact' => $row["contactno"],
      'message' => $row["msg"],
    ];
    array_push($Data, $NewData);
  }
} else {

}
$conn->close();
echo json_encode($Data);

?>
