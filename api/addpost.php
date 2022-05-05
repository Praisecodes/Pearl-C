<?php
    require_once "./connection.php";

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "Not Set";

    if($contentType === "application/json"){
        $contents = trim(file_get_contents("php://input"));

        $decoded = json_decode($contents, true);

        $sql = "INSERT INTO posts(Title, Category, Body) VALUES(?,?,?);";

        $stmt = $conn->prepare($sql);
        if($stmt->bind_param("sss", $decoded["Title"], $decoded["Category"], $decoded["Body"])){
            if($stmt->execute()){
                echo json_encode([
                    $decoded["Body"]
                ]);
                exit;
            }
            else{
                echo json_encode([
                    "There's a problem with storing your post"
                ]);
                exit;
            }
        }
        else{
            echo json_encode([
                "A fatal error occured"
            ]);
            exit;
        }
    }
    else{
        exit(json_encode([
            "Invalid Type"
        ]));
    }
?>