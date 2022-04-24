<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    $ContentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "not set";

    if($ContentType === "application/json"){
        $contents = trim(file_get_contents("php://input"));

        $decoded = json_decode($contents, true);

        // Create Connection With Database And Store All Subscribed Emails.

        //Get Heroku ClearDB connection information
        $cleardb_url = parse_url(getenv("CLEARDB_DATABASE_URL"));
        $cleardb_server = $cleardb_url["host"];
        $cleardb_username = $cleardb_url["user"];
        $cleardb_password = $cleardb_url["pass"];
        $cleardb_db = substr($cleardb_url["path"],1);

        $conn = new mysqli($cleardb_url, $cleardb_username, $cleardb_password, $cleardb_db);
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