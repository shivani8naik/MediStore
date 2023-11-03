<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));
    $cart_id = $data->cart_id;
    $status = $data->status;
    $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "UPDATE cart SET status = '$status' WHERE cart_id = $cart_id";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        echo json_encode(array('message' => 'Update was successful'));
    } else {
        echo json_encode(array('message' => 'Update failed'));
    }
    
        
    $conn->close();
}
?>