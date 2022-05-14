<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    require_once "./connection.php";

    $ContentType = isset($_SERVER["CONTENT_TYPE"])? trim($_SERVER["CONTENT_TYPE"]) : "Not Set";
    $data = array();
    $i = 0;

    if($ContentType === "application/json"){
        $contents = trim(file_get_contents("php://input"));

        $decoded = json_decode($contents, true);

        $sql = "SELECT * FROM posts WHERE Title = ?;";

        $stmt = $conn->prepare($sql);
        if($stmt->bind_param("s", $decoded["Title"])){
            if($stmt->execute()){
                $result = $stmt->get_result();

                if($result->num_rows > 0){
                    while($rows = $result->fetch_assoc()){
                        $data["Title"] = $rows["Title"];
                        $data["Category"] = $rows["Category"];
                        $data["datePosted"] = $rows["datePosted"];
                        $data["Body"] = $rows["Body"];
                    }

                    echo json_encode($data);
                    $stmt->close();
                    $conn->close();
                }
                else{
                    echo json_encode([
                        "Error"
                    ]);
                    $stmt->close();
                    $conn->close();
                }
            }
            else{
                echo json_encode([
                    "An error was encountered while executing the statement"
                ]);
                $stmt->close();
                $conn->close();
            }
        }
        else{
            echo json_encode([
                "A Fatal Error Has Occured"
            ]);
            $stmt->close();
            $conn->close();
        }
    }
    else{
        echo json_encode([
            "Invalid Type"
        ]);
        $conn->close();
    }
?>