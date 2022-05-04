<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    $conn = new mysqli("localhost", "root", "", "pearlcdb");

    if($conn->connect_error){
        exit(json_encode([
            "Error Connecting To Database"
        ]));
    }
?>