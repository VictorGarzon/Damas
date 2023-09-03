<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $movi= $_POST["movi"];
    $partida= $_SESSION["partida"];
    $movimiento= $_SESSION["movimiento"] + $_POST["movi"];
    $sql = "select tablero from movimientos where id_partida='$partida' and id_movimiento='$movimiento';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    if ($fila){
        $_SESSION["movimiento"]=$movimiento;
        echo $fila["tablero"];
        echo ";";
        echo $movimiento;
    }else{
        echo 0;
    }
    $res->close();
    $mysqli->close();
}
?>