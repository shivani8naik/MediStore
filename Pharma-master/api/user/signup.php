<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $email = $_POST["email"];
    $password = $_POST['password'];
    $name = $_POST['name'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $contact = $_POST['contact'];
    $address = $_POST['address'];
    //creating connection
    $conn = mysqli_connect(getenv('SERVER_NAME'), getenv('USER_NAME'), getenv('PASSWORD'), getenv('DB_NAME'));
    $sql = "SELECT * from user where email='$email'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo "Email exists already";
    } else {
    $sql="INSERT into user (email,password,name,age,gender,contactno,address) values ('$email' , '$password' , '$name', '$age' , '$gender', '$contact', '$address')";
    $result = $conn->query($sql);
    echo "Account created successfully..!";
        
    }
}

?>