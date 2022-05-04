<?php
    require_once "./connection.php";

    $sql = "SELECT * FROM posts;";
    $data = array();
    $i = 0;

    $stmt = $conn->prepare($sql);
    if($stmt->execute()){
        $result = $stmt->get_result();

        if($result->num_rows > 0){
            while($rows = $result->fetch_assoc()){
                $data[$i]["postTitle"] = $rows["Title"];
                $data[$i]["postCategory"] = $rows["Category"];
                $data[$i]["timePosted"] = $rows["timePosted"];
                $data[$i]["postBody"] = $rows["Body"];

                $i++;
            }

            echo json_encode($data);
        }
        else{
            exit(json_encode([
                "No Posts Available"
            ]));
        }
    }
    else{
        exit(json_encode([
            "Error Getting Posts"
        ]));
    }
?>