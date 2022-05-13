<?php
    require_once "./connection.php";

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "Not Set";

    if($contentType === "application/json"){
        $contents = trim(file_get_contents("php://input"));
        $data = array();
        $i = 0;

        $decoded = json_decode($contents, true);

        $sql = "INSERT INTO posts(Title, Category, Body) VALUES(?,?,?);";
        $SelectSql = "SELECT Title FROM posts;";

        $stmt = $conn->prepare($SelectSql);
        if($stmt->execute()){
            $results = $stmt->get_result();

            if($results->num_rows > 0){
                while($rows = $results->fetch_array()){
                    if($decoded["Title"] == $rows["Title"]){
                        echo json_encode([
                            "This Title Already Exists"
                        ]);
                        $stmt->close();
                        $conn->close();
                        exit;
                    }
                }

                $stmt = $conn->prepare($sql);
                if($stmt->bind_param("sss", $decoded["Title"], $decoded["Category"], $decoded["Body"])){
                    if($stmt->execute()){
                        echo json_encode([
                            "Success"
                        ]);
                        $stmt->close();
                        $conn->close();
                    }
                    else{
                        echo json_encode([
                            "Failed To Write To Database"
                        ]);
                        $stmt->close();
                        $conn->close();
                    }
                }
                else{
                    echo json_encode([
                        "A Fatal Error Has Occured (Bind_Param: 0x1)"
                    ]);
                    $stmt->close();
                    $conn->close();
                }
            }
            else{
                $stmt = $conn->prepare($sql);
                if($stmt->bind_param("sss", $decoded["Title"], $decoded["Category"], $decoded["Body"])){
                    if($stmt->execute()){
                        echo json_encode([
                            "Success"
                        ]);
                        $stmt->close();
                        $conn->close();
                    }
                    else{
                        echo json_encode([
                            "An error occured while writing post"
                        ]);
                        $stmt->close();
                        $conn->close();
                    }
                }
                else{
                    echo json_encode([
                        "A Fatal Error Occured!"
                    ]);
                    $stmt->close();
                    $conn->close();
                }
            }
        }
    }
    else{
        exit(json_encode([
            "Invalid Type"
        ]));
    }
?>