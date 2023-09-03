<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $partida = $_SESSION["partida"];
    $movimiento = $_SESSION["movimiento"];
    $soplar=0;
    $socon=0;
    $movimiento = $movimiento -1;
    $sql = "select soplar from movimientos where id_partida='$partida' and id_movimiento='$movimiento' ;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    if ($fila){
        $soplar=$fila["soplar"];
    }
    $res->close();
    $movimiento = $movimiento -1;
    $sql = "select so_con from movimientos where id_partida='$partida' and id_movimiento='$movimiento' ;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    if ($fila){
        $socon=$fila["so_con"];
    }
    echo $soplar.':'.$socon;
    $res->close();
    $mysqli->close();
}
?>