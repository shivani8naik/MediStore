<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST['password'];
    if (empty($email) || empty($password)) {
        echo "Email or Password is empty";
    } else {
        $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql = "SELECT * FROM user WHERE email = '$email' AND password = '$password' AND isSeller=1";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $Data = array();
            while($row = $result->fetch_assoc()) {
                $NewData = (object) [
                    'user_id' => $row["user_id"],
                    'isSeller' => $row["isSeller"],
                    'name' => $row["name"],
                    'email' => $row["email"]
                ];
                array_push($Data, $NewData);
            }
        } else {
            var_dump(http_response_code(404));
        }
        $conn->close();
        echo json_encode($NewData);
    }
  }

?>