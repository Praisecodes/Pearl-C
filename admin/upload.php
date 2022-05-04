<?php

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(isset($_POST["update"])){
            $file = $_FILES["Image"];

            $fileTmpName = $file["tmp_name"];
            $fileName = $file["name"];
            $fileType = $file["type"];
            $fileSize = $file["size"];
            $fileError = $file["error"];

            $fileExt = explode(".", $fileName);
            $fileExtension = strtolower(end($fileExt));

            if($fileExtension == "jpg"){
                if($fileError === 0){
                    if($fileSize <= 300000){
                        $fileNewName = "profileImage" . "." . $fileExtension;
                        
                        $fileDestination = "user/" . $fileNewName;
                        move_uploaded_file($fileTmpName, $fileDestination);
                        header("Location: ./");
                    }
                    else{
                        print_r($file);
                    }
                }
                else{
                    echo "Error: " . $fileError;
                }
            }
            else{
                echo "Please choose a .jpg file";
            }
        }
        else{
            echo "No Image Chosen";
        }
    }
?>