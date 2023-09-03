<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $id = $_SESSION["id"];
    $ganar=$_POST["ganar"];
    $tablero=$_POST["tablero"];
    $movi=$_POST["movi"];
    $turno=$_POST["turno"];
    $soplar=$_POST["soplar"];
    $socon=$_POST["socon"];
    $partida = $_SESSION["partida"];
    $movimiento = $_SESSION["movimiento"];
    if ($ganar==0) {
        $movimiento2 = $movimiento + 1;
        $_SESSION["movimiento"] = $movimiento2;
    }
    $sql = "insert into movimientos(id_partida, id_movimiento, tablero, moviento, turno, soplar,so_con) value ('$partida','$movimiento','$tablero','$movi','$turno','$soplar','$socon');";
    $mysqli->query($sql);
    $mysqli->close();
}
?>