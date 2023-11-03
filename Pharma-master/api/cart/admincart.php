<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));

    $Data = array();
    $sql = "SELECT * FROM cart NATURAL JOIN cart_contains NATURAL JOIN medicines NATURAL JOIN user WHERE ispaid=1";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        while($row2 = $result->fetch_assoc()) {
            $cart_id = $row2["cart_id"];
            
            if (!isset($Data[$cart_id])) {
                $Data[$cart_id] = array(
                    "user_id" => $row2["user_id"],
                    "name" => $row2["name"],
                    "medicines" => array(),
                    "cart_id" => $cart_id,
                    "ispaid" => $row2["ispaid"],
                    "status" => $row2["status"],
                    "order_date" => $row2["order_date"],
                    "address" => $row2["address"],
                    "total" => $row2["total"]
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

    // Encode the data as a JSON object and return it
    echo json_encode(array_values($Data));

    $conn->close();
}
?>
