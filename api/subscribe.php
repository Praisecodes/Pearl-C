<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    use PHPMailer\PHPMailer\PHPMailer;

    require_once "../libs/PHPMailer/PHPMailer.php";
    require_once "../libs/PHPMailer/Exception.php";
    require_once "../libs/PHPMailer/SMTP.php";
    // require_once "./ignore.php";

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

        $conn = new mysqli($cleardb_server, $cleardb_username, $cleardb_password, $cleardb_db);
        // $conn = new mysqli("localhost", "root", "", "pearlcdb");

        if($conn->connect_error){
            echo json_encode([
                "Error Connecting To Database"
            ], true);
        }

        $sql = "INSERT INTO emails_subscribed(emails) VALUES(?);";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $decoded["Email"]);

        if($stmt->execute()){
            //SMTP SetUp For Sending Emails
            $mail = new PHPMailer();

            $mail->isSMTP();
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPAuth = true;
            $mail->Username = "praisetesting24@gmail.com";
            $mail->Password = getenv("EMAIL_PASSWORD");
            $mail->Port = 465;
            $mail->SMTPSecure = "ssl";

            //Sending Email Settings
            $mail->isHTML(true);
            $mail->setFrom("praisetesting24@gmail.com", "Pearl .C.");
            $mail->addAddress($decoded["Email"]);
            $mail->Subject = "You've subscribed to Pearl C's Newsletter";
            $mail->Body = "Thank you " . $decoded["Email"] . " for subscribing to my newsletter.<br/>You'll get all newest updates ranging from my books, to experiences shared, short stories as well as personal favorites!!";

            if($mail->send()){
                echo json_encode([
                    "Success"
                ], true);
            }
            else{
                echo json_encode([
                    "Message Not Sent"
                ], true);
            }

            $stmt->close();
            $conn->close();
        }
        else{
            echo json_encode([
                "Failure"
            ], true);
            $stmt->close();
            $conn->close();
        }
    }
    else{
        echo json_encode([
            "Nope!!"
        ], true);
    }
?>