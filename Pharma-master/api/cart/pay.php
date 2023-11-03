<?php
// Connect to the database
$conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));

$data = json_decode(file_get_contents("php://input"));
$user_id = $data->user_id;

$sql = "SELECT * from cart WHERE user_id = '$user_id' AND ispaid=0";
$result1 = $conn->query($sql);
if ($result1->num_rows > 0) {
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    while($row = $result1->fetch_assoc()) {
        $cart_id = $row["cart_id"];
        $ispaid = $row["ispaid"];
    }

    $sql = "UPDATE cart SET ispaid = 1, order_date = NOW() WHERE cart_id = '$cart_id' AND ispaid=0";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        echo "Record updated successfully";
        $sql = "INSERT INTO `cart` (`user_id`) VALUES ('$user_id')";
        $result = mysqli_query($conn, $sql);
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }

}

// Close the connection
mysqli_close($conn);

?>
