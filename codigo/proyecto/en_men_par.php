<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error base de datos";
}else{
    $id = $_SESSION["id"];
    $partida = $_SESSION["partida"];
    $mensaje=$_POST["mensaje"];
    $sql = "select id_usuario1,id_usuario2 from asignar where id_partida='$partida' ;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    $origen=null;
    if ($fila["id_usuario1"]==$id){
        $origen=1;
    }else if ($fila["id_usuario2"]==$id){
        $origen=2;
    }
    $res->close();
    $sql = "select id_mensaje from mensajes_partidas where id_partida='$partida' order by id_mensaje desc ;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    $id_men=0;
    if ($fila){
        $id_men=$fila["id_mensaje"];
    }
    $id_men= $id_men +1;
    $res->close();

    $sql = "insert into mensajes_partidas(id_partida, id_mensaje, mensaje, origen) VALUE ('$partida','$id_men','$mensaje','$origen');";
    $mysqli->query($sql);
    $mysqli->close();
}
?>