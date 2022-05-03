<?php
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(isset($_POST["update"])){
            $file = $_FILES["Image"];

            $fileName = $file['name'];
            $fileTmpName = $file['tmp_name'];
            $fileSize = $file['size'];
            $fileError = $file['error'];
            $fileType = $file['type'];

            $fileExt = explode(".", $fileName);
            $fileExtension = strtolower(end($fileExt));

            $allowed = array('jpg');

            if(in_array($fileExtension, $allowed)){
                if($fileError === 0){
                    if($fileSize <= 500000){
                        $fileNewName = "profileImage." . $fileExtension;

                        $fileDestination = "user/" . $fileNewName;
                        move_uploaded_file($fileTmpName, $fileDestination);
                        header("Location: ./");
                    }
                    else{
                        header("Location: ./");
                    }
                }
                // elseif($fileError === 4){
                //     echo "No file Choseen";
                //     header("Location: ./");
                // }
                else{
                    echo $fileError;
                }
            }
            else{
                echo "Only .jpg Allowed";
            }
        }
        else{
            echo "Not Set";
        }
    }
    else{
        header("Location: ./");
    }
?>