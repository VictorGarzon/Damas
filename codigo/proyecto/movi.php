<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $partida = $_SESSION["partida"];
    $movimiento = $_SESSION["movimiento"];
    $sql = "select moviento from movimientos where id_partida='$partida';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    $fila = $res->fetch_assoc();
    while ($fila){
        $menmo = $fila["moviento"];
        echo "<p>".$menmo."</p>";
        $fila = $res->fetch_assoc();
    }
    $res->close();
    $mysqli->close();
}
?>