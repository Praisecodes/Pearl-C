<?php
    require_once "./connection.php";

    $sql = "SELECT * FROM posts;";
    $data = array();
    $i = 0;

    $stmt = $conn->prepare($sql);
    if($stmt->execute()){
        $result = $stmt->get_result();

        if($result->num_rows > 0){
            if($result->num_rows > 1){
                while($rows = $result->fetch_assoc()){
                    $data[$i]["id"] = $rows["id"];
                    $data[$i]["postTitle"] = $rows["Title"];
                    $data[$i]["postCategory"] = $rows["Category"];
                    $data[$i]["datePosted"] = $rows["datePosted"];
                    $data[$i]["postBody"] = $rows["Body"];
    
                    $i++;
                }

                exit(json_encode($data));
            }
            else{
                while($rows = $result->fetch_assoc()){
                    $data["id"] = $rows["id"];
                    $data["postTitle"] = $rows["Title"];
                    $data["postCategory"] = $rows["Category"];
                    $data["datePosted"] = $rows["datePosted"];
                    $data["postBody"] = $rows["Body"];
                }

                exit(json_encode($data));
            }
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