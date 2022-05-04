<?php
    require_once "./connection.php";

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "Not Set";

    if($contentType === "application/json"){
        $contents = trim(file_get_contents("php://input"));

        $decoded = json_decode($contents);
    }
    else{
        exit(json_encode([
            "Invalid Type"
        ]));
    }
?>