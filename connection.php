<?php 
    $host = "localhost";
    $db = "inf02";
    $user = "root";
    $passwd = "qqq123";

    try{
        $pdo = new PDO ("mysql:host$host;dbname=$db;charset=UTF8",$user,$passwd);

        if($pdo){
            echo "Connected to database succesful";
        }
    }catch(PDOException $e){
        echo $e;
    }
?>