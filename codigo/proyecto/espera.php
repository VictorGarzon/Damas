<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error base de datos";
}else{
    $id = $_SESSION["id"];
    $id_partida = $_SESSION["par"];
    $sql = "select id_usuario2,ac2 from asignar where id_partida='$id_partida';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    if ($fila){
        if ( isset($fila["id_usuario2"])){
            $_SESSION["movimiento"]=0;
            $sql = "insert into movimientos(id_partida, id_movimiento, tablero, moviento, turno, soplar,so_con) value ('$id_partida',0,'0,2,0,2,0,2,0,2,2,0,2,0,2,0,2,0,0,2,0,2,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0','Bienvenidos',0,0,0);";
            $mysqli->query($sql);
            $_SESSION["partida"] = $_SESSION["par"];
            echo 1;
        }
    }
    $res->close();
    $mysqli->close();
}
?>