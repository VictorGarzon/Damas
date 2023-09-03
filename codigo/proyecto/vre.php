<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $id = $_SESSION["id"];
    $partida = $_SESSION["partida"];
    $sql = "select id_usuario1,id_usuario2,resultado from asignar where id_partida='$partida' and resultado is not null ;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    if ($fila){
        if ($fila["resultado"]==0){
            echo "Empate:Tablas";
        }else{
            $ganador=$fila["resultado"];
            //$sql2 = "select nombre from usuarios where id_usuario='$ganador';";
            $sql2 = "select u.nombre nombre1, u2.nombre nombre2 from asignar a
                        join usuarios u on u.id_usuario = a.id_usuario1
                        join usuarios u2 on u2.id_usuario = a.id_usuario2 
                        where id_partida='$partida';";
            $res2 = $mysqli->query($sql2);
            $fila2 = $res2->fetch_assoc();
            $nombre=null;
            $color= null;
            if ($ganador==1){
                $nombre=$fila2["nombre1"];
                $color="Negro";
            }else if ($ganador==2){
                $nombre=$fila2["nombre2"];
                $color="Blanco";
            }
            $res2->close();
            echo "Gana ".$nombre." : ".$color;
        }
    }
    $res->close();
    $mysqli->close();
}
?>