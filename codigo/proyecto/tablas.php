<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $id = $_SESSION["id"];
    $partida = $_SESSION["partida"];
    $movimiento = $_SESSION["movimiento"];
    $tablero=$_POST["tablero"];
    $mensaje=$_POST["mensaje"];
    $turno=3;
    $sql = "insert into movimientos(id_partida, id_movimiento, tablero, moviento, turno, soplar,so_con) value ('$partida','$movimiento','$tablero','$mensaje','$turno',0,0);";
    $mysqli->query($sql);
    $mysqli->close();
}
?>