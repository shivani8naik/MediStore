<?php
$conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));
if (!$conn) {
    die(json_encode(['success' => false, 'error' => mysqli_connect_error()]));
}
$medicine_id = $_POST['medicine_id'];

if (empty($medicine_id)) {
    die(json_encode(['success' => false, 'error' => 'Medicine ID cannot be empty']));
}
$sql = "DELETE FROM medicines WHERE medicine_id = '$medicine_id'";
$result = $conn->query($sql);
if ($result === false) {
    die(json_encode(['success' => false, 'error' => mysqli_error($conn)]));
}
echo json_encode(['success' => true, 'affectedRows' => mysqli_affected_rows($conn)]);
$conn->close();
?>
