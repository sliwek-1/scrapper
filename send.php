<?php 
    include_once('connection.php');

    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $pdo->exec("USE inf02");

    $i = 0;
    $j = 0;
    foreach ($data as $row) {

        $check = "SELECT COUNT(title) as 'count', title FROM inf03 group by title";

        $check_request = $pdo->prepare($check);

        $check_request->execute();

        $result = $check_request->fetchAll(PDO::FETCH_ASSOC);
        
        if($result[$i]['count'] < 1){
            echo "To pytanie już bylo ".$i;
        }else{
            $sql = "INSERT INTO inf03 (title, obrazek, poprawna_odp, A, B, C, D) VALUES (:title, :obrazek, :poprawna_odp, :A, :B, :C, :D)";
            $request = $pdo->prepare($sql);


            $request->bindParam(":title", $row->tresc);
            $request->bindParam(":obrazek", $row->obrazek);
            $request->bindParam(":poprawna_odp", $row->poprawna_odpowiedz);
            $request->bindParam(":A", $row->odpowiedzi->a);
            $request->bindParam(":B", $row->odpowiedzi->b);
            $request->bindParam(":C", $row->odpowiedzi->c);
            $request->bindParam(":D", $row->odpowiedzi->d);

            $request->execute();

        }
        $i++;
    }
?>