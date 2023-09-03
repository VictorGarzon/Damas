<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error base de datos";
}else{
    $id = $_SESSION["id"];
    $sql = "select id_partida,id_usuario1,id_usuario2 from asignar where tipo=1 and resultado is null and ac2 is null ;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    $encontrar=0;
    while ($fila and $encontrar==0){
        $id_partida =$fila["id_partida"];
        if ($fila["id_usuario1"]!=$id) {
            $usu1=$fila["id_usuario1"];
            $sql2 = "select id_partida from asignar where resultado is null and ((id_usuario1='$id' and id_usuario2='$usu1') or (id_usuario1='$usu1' and id_usuario2='$id'));";
            $res2 = $mysqli->query($sql2);
            $fila2 = $res2->fetch_assoc();
            if (!$fila2){
                $sql3 = "update asignar set id_usuario2='$id',ac2=1 where id_partida='$id_partida';";
                $mysqli->query($sql3);
                $_SESSION["partida"]=$id_partida;
                $_SESSION["movimiento"]=0;
                echo 2;
                $encontrar=1;
            }
            $res2->close();
        }else{
            $sql4 = "delete from asignar where id_usuario1='$id' and ac1=1 and id_usuario2 is null and ac2 is null and tipo=1 and resultado is null;";
            $mysqli->query($sql4);
        }
        $fila = $res->fetch_assoc();
    }
    if ($encontrar==0){
        $sql2 = "INSERT INTO asignar(id_usuario1,ac1,tipo) VALUES('$id',1,1);";
        $mysqli->query($sql2);
        $sql3 = "select id_partida from asignar where tipo=1 and resultado is null and ac2 is null and id_usuario1='$id' ;";
        $res3 = $mysqli->query($sql3);
        $fila3 = $res3->fetch_assoc();
        $_SESSION["par"]=$fila3["id_partida"];
        $res3->close();
        echo 1;
    }
    $res->close();
    $mysqli->close();
}
?>