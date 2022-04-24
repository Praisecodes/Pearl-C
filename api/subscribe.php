<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    $ContentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "not set";

    if($ContentType === "application/json"){
        $contents = trim(file_get_contents("php://input"));

        $decoded = json_decode($contents, true);

        // Create Connection With Database And Store All Subscribed Emails.
        $servername = "sql306.epizy.com";
        $username = "epiz_31583479";
        $password = "NKq8b0FOwoBiN";
        $databasename = "epiz_31583479_pearlcdb";

        $conn = new mysqli($servername, $username, $password, $databasename);
        // $conn = new mysqli("localhost", "root", "", "pearlcdb");
        if($conn->connect_error){
            die(json_encode([
                "Error" . $conn->connect_error
            ], true));
        }
        else{
            $sql = "INSERT INTO emails_subscribed(emails) VALUES (?);";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $decoded["Email"]);

            if($stmt->execute()){
                echo json_encode([
                    "Success"
                ], true);
                $stmt->close();
                $conn->close();
            }
            else{
                die(json_encode([
                    "Error"
                ], true));
                $stmt->close();
                $conn->close();
            }
        }
    }
    else{
        echo (json_encode([
            "Nope!!"
        ], true));
    }
?>