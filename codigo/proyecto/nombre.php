<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $partida = $_SESSION["partida"];
    $id = $_SESSION["id"];
    $sql = "select u.nombre nombre1,u2.nombre nombre2 from asignar a
    join usuarios u on u.id_usuario = a.id_usuario1
    join usuarios u2 on u2.id_usuario = a.id_usuario2
    where id_partida='$partida';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    echo $fila["nombre1"]."=Negro vs ".$fila["nombre2"]."=Blanco";
    $res->close();
    $mysqli->close();
}
?>