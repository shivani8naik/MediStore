<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));
    $user_id = $data->user_id;
    $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $Data = array();
    $sql = "SELECT * FROM cart NATURAL JOIN cart_contains NATURAL JOIN medicines WHERE user_id = '$user_id'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row2 = $result->fetch_assoc()) {
            $cart_id = $row2["cart_id"];
            
            if (!isset($Data[$cart_id])) {
                $Data[$cart_id] = array(
                    'cart_id' => $cart_id,
                    'medicines' => array(),
                    'ispaid' => $row2["ispaid"],
                    'total' => $row2["total"],
                    'order_date' => $row2["order_date"],
                    'status' => $row2["status"]
                );
            }
            $NewData = (object) [
                'medicine_id' => $row2["medicine_id"],
                'medicine_name' => $row2["medicine_name"],
                'price' => $row2["price"],
                'quantity' => $row2["quantity"],
                'image' => base64_encode($row2["image"])
            ];
            array_push($Data[$cart_id]["medicines"], $NewData);
        }
    } else {
        var_dump(http_response_code(404));
    }
        
    $conn->close();
    echo json_encode(array_values($Data));
}
?>
