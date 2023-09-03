<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error base de datos";
}else{
    $partida = $_SESSION["partida"];
    $sql = "select id_usuario1,id_usuario2,ac_empate1,ac_empate2 from asignar where id_partida='$partida';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    if ($fila["ac_empate1"]==1 && $fila["ac_empate2"]==1){
        $sql2 = "update asignar set resultado=0 where id_partida='$partida';";
        $mysqli->query($sql2);
        echo 2;
    }else if ($fila["ac_empate1"]==1 || $fila["ac_empate2"]==1){
        echo 1;
    }else{
        echo 0;
    }
    $res->close();
    $mysqli->close();
}
?>