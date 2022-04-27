<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    use PHPMailer\PHPMailer\PHPMailer;

    require_once "../libs/PHPMailer/Exception.php";
    require_once "../libs/PHPMailer/PHPMailer.php";
    require_once "../libs/PHPMailer/SMTP.php";
    // require_once "../vendor/autoload.php";

    // use Dotenv\Dotenv;

    // $dotenv = Dotenv::createImmutable(__DIR__);
    // $dotenv->load();

    $ContentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "Not Set";

    if($ContentType === "application/json"){
        $contents = trim(file_get_contents("php://input"));

        $decoded = json_decode($contents, true);

        $mail = new PHPMailer();

        //SMTP Settings
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = "praisetesting24@gmail.com";
        $mail->Password = getenv("EMAIL_PASSWORD");
        $mail->Port = 465;
        $mail->SMTPSecure = "ssl";

        //Email Settings
        $mail->isHTML(true);
        $mail->setFrom($decoded["Email"], $decoded["Name"]);
        $mail->addAddress("praisetesting24@gmail.com");
        $mail->Subject = "Message From ". $decoded["Name"];
        $mail->Body = $decoded["Body"] . "<br/><br/>From: " . $decoded["Email"];

        if($mail->send()){
            echo json_encode([
                "Success"
            ], true);
        }
        else{
            echo json_encode([
                "Failed"
            ], true);
        }
    }
    else{
        echo json_encode([
            "Not In JSON Format!"
        ],true);
    }
?>