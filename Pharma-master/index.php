<?php
// header('Access-Control-Allow-Origin: *');
// header('Content-type: *');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
apache_setenv('NAME', 'Robert Smith');
$myObj = array([
    "name" => "John",
    "age" => 30,
    "city" => "New York"
], [
    "name" => "Peter",
    "age" => 40,
    "city" => "London"
], [
    "name" => "Sally",
    "age" => 50,
    "city" => "Los Angeles"
]);
echo json_encode($myObj);

?>