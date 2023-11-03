<?php
$conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));
if (!$conn) {
    die(json_encode(['success' => false, 'error' => mysqli_connect_error()]));
}
$category_id = $_POST['category_id'];
if (empty($category_id)) {
    die(json_encode(['success' => false, 'error' => 'Category ID cannot be empty']));
}
$sql = "DELETE FROM categories WHERE category_id = '$category_id'";
$result = $conn->query($sql);
if ($result === false) {
    die(json_encode(['success' => false, 'error' => mysqli_error($conn)]));
}
echo json_encode(['success' => true, 'affectedRows' => mysqli_affected_rows($conn)]);
$conn->close();
?>
