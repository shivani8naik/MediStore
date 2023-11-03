<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));
    if (!$conn) {
        die(json_encode(['success' => false, 'error' => mysqli_connect_error()]));
    }
    $category_name = $_POST["category_name"];
    if (empty($category_name)) {
        die(json_encode(['success' => false, 'error' => 'Category name cannot be empty']));
    }
    $sql = "INSERT INTO categories (category_name) VALUES ('$category_name')";
    if (isset($_POST["category_id"])) {
        $category_id = $_POST["category_id"];
        $sql = "UPDATE categories SET category_name = '$category_name' WHERE category_id = '$category_id'";
    }
    $result = $conn->query($sql);
    if ($result === false) {
        die(json_encode(['success' => false, 'error' => mysqli_error($conn)]));
    }
    echo json_encode(['success' => true, 'affectedRows' => mysqli_affected_rows($conn)]);
    $conn->close();
}
?>
