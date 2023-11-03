<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));
    $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql = "SELECT * FROM cart WHERE user_id = '$data->user_id' AND ispaid = 0";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $row["cart_id"];
                if ($row["cart_id"]) {
                    $cart_id = $row["cart_id"];
                    $sql = "SELECT * FROM cart_contains WHERE cart_id = '$cart_id' AND medicine_id = '$data->medicine_id'";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        $sql = "UPDATE cart_contains SET quantity = quantity + 1 WHERE cart_id = '$cart_id' AND medicine_id = '$data->medicine_id'";
                        $result = $conn->query($sql);
                        echo json_encode($result);
                    } else {
                        $sql = "INSERT INTO cart_contains (cart_id, medicine_id, quantity) VALUES ('$cart_id', '$data->medicine_id', 1)";
                        $result = $conn->query($sql);
                        echo json_encode($result);
                    }
                }
            }
        } else {
            var_dump(http_response_code(404));
        }
        $conn->close();
}


?>