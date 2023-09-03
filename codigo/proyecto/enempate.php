<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error base de datos";
}else{
    $id = $_SESSION["id"];
    $id_partida = $_SESSION["partida"];
    $sql = "select id_usuario1,id_usuario2,ac_empate1,ac_empate2 from asignar where id_partida='$id_partida';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    $sql2=null;
    if ($fila["id_usuario1"]==$id){
        if ($fila["ac_empate1"]==1){
            $sql2 = "update asignar set ac_empate1=0 where id_partida='$id_partida';";
        }else{
            $sql2 = "update asignar set ac_empate1=1 where id_partida='$id_partida';";
        }
    }else if ($fila["id_usuario2"]==$id){
        if ($fila["ac_empate2"]==1){
            $sql2 = "update asignar set ac_empate2=0 where id_partida='$id_partida';";
        }else{
            $sql2 = "update asignar set ac_empate2=1 where id_partida='$id_partida';";
        }
    }
    $mysqli->query($sql2);
    $res->close();
    $mysqli->close();
}
?>