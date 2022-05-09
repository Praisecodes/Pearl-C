<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    require_once "./connection.php";

    $ContentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "Not Set";

    if($ContentType === "application/json"){
        $contents = trim(file_get_contents("php://input"));

        $decoded = json_decode($contents, true);

        $sql = "DELETE FROM posts WHERE Title=?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $decoded["Title"]);
        if($stmt->execute()){
            echo json_encode([
                "Success"
            ]);
        }
        else{
            echo json_encode([
                "Not Successful"
            ]);
        }
    }
    else{
        echo json_encode([
            "Not in JSON format"
        ]);
    }
?>