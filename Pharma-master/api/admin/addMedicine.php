<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));
    if (!$conn) {
        die(json_encode(['success' => false, 'error' => mysqli_connect_error()]));
    }

    $medicine_name = $_POST["medicine_name"];
    $price = $_POST["price"];
    
    $category_id = $_POST["category_id"];

    if (isset($_POST["medicine_id"]) && isset($_FILES['image']['tmp_name'])) {
        $medicine_id = $_POST["medicine_id"];
        $image = file_get_contents($_FILES['image']['tmp_name']);
        $image = $conn->real_escape_string($image);
        $sql = "UPDATE medicines SET medicine_name = '$medicine_name', price = '$price', image = '$image', category_id = '$category_id' WHERE medicine_id = '$medicine_id'";
    }
    else if (isset($_POST["medicine_id"])) {
        $medicine_id = $_POST["medicine_id"];
        $sql = "UPDATE medicines SET medicine_name = '$medicine_name', price = '$price', category_id = '$category_id' WHERE medicine_id = '$medicine_id'";
    }
    else{
        $image = file_get_contents($_FILES['image']['tmp_name']);
        $image = $conn->real_escape_string($image);
        $sql = "INSERT INTO medicines (medicine_name, price, image, category_id) VALUES ('$medicine_name', '$price', '$image', '$category_id')";
    }
    $result = $conn->query($sql);
    if ($result === false) {
        die(json_encode(['success' => false, 'error' => mysqli_error($conn)]));
    }
    echo json_encode(['success' => true, 'affectedRows' => mysqli_affected_rows($conn)]);

    $conn->close();
}
?>
