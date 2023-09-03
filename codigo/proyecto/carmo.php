<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $id=$_SESSION["id"];
    $partida = $_SESSION["partida"];
    $movimiento = $_SESSION["movimiento"];
    $sql = "select count(*) movimientos from movimientos where id_partida='$partida';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    $movimientos = $fila["movimientos"];
    $res->close();
    if ($movimiento<$movimientos){
        $_SESSION["movimiento"] =$movimientos;
        $movimientos = $movimientos -1;
        $turno=0;
        $sql = "select id_usuario1,id_usuario2 , tablero,turno from movimientos m
                join asignar a on a.id_partida = m.id_partida 
                where m.id_partida='$partida' and id_movimiento='$movimientos' order by id_movimiento desc;";
        $res = $mysqli->query($sql);
        $fila = $res->fetch_assoc();
        $tablero = $fila["tablero"];
        if ($fila["turno"]==0){
            if ($fila["id_usuario1"]==$id){
                $turno=1;
            }
        }else if ($fila["turno"]==1){
            if ($fila["id_usuario2"]==$id){
                $turno=1;
            }
        }else if ($fila["turno"]==2) {
            if ($fila["id_usuario1"] == $id) {
                $turno = 1;
            }
        }else if ($fila["turno"]==3) {
            $turno=2;
        }
        echo $turno.":".$tablero;
        $res->close();
    }
    $mysqli->close();
}
?>