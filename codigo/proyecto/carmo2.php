<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $id=$_SESSION["id"];
    $nombre1= trim($_POST["usu1"]);
    $nombre2= trim($_POST["usu2"]);
    $sql = "select id_partida,id_usuario1,id_usuario2 from asignar a
    join usuarios u on a.id_usuario1 = u.id_usuario
    join usuarios u2 on u2.id_usuario = a.id_usuario2
    where resultado is null and u.nombre='$nombre1' and u2.nombre='$nombre2';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    if ($fila){
        if ($id==$fila["id_usuario1"] or $id==$fila["id_usuario2"]){
            $_SESSION["partida"]=$fila["id_partida"];
            $_SESSION["movimiento"]=0;
            $girar=1;
            if ($id==$fila["id_usuario2"]){
                $girar=2;
            }
            echo $nombre1."=Negras vs ".$nombre2."=Blancas:".$girar;
        }else{
            echo 0;
        }
    }else{
        echo 0;
    }
    $res->close();
    $mysqli->close();
}
?>