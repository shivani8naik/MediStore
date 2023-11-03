<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $email = $_POST["email"];
    $name = $_POST['name'];
    $contact = $_POST['contact'];
    $message = $_POST['message'];
    //creating connection
    $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));
    $sql = "SELECT * from contactus where email='$email'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo "Email exists already";
    } else {
    $sql="INSERT into contactus (email,name,contactno,msg) values ('$email' ,  '$name', '$contact', '$message')";
    $result = $conn->query($sql);
    echo " successfull..!";
        
    }
}

?>