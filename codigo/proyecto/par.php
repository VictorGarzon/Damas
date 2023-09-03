<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{

    $id=$_SESSION["id"];
    $sql = "select id_partida, id_usuario1,id_usuario2 ,u.nombre nombre1,u2.nombre nombre2 from asignar a
                               join usuarios u on u.id_usuario = a.id_usuario1
                               join usuarios u2 on u2.id_usuario = a.id_usuario2
                            where resultado is null and (id_usuario1='$id' or id_usuario2='$id');";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    while ($fila){
        $nombre1=$fila["nombre1"];
        $nombre2=$fila["nombre2"];
        $partida=$fila["id_partida"];
        $sql2 = "select turno from asignar a join movimientos m on a.id_partida = m.id_partida where a.id_partida='$partida' order by id_movimiento desc ;";
        $res2 = $mysqli->query($sql2);
        $fila2 = $res2->fetch_assoc();
        $turno='';
        if ($fila2["turno"]==0){
            if ($id==$fila["id_usuario1"]){
                $turno="Tu turno";
            }else{
                $turno="Su turno";
            }
        }else if ($fila2["turno"]==1){
            if ($id==$fila["id_usuario1"]){
                $turno="Su turno";
            }else{
                $turno="Tu turno";
            }
        }else if ($fila2["turno"]==2){
            if ($id==$fila["id_usuario2"]){
                $turno="Su turno";
            }else{
                $turno="Tu turno";
            }
        }
        echo "<div><p> Jugar </p><p> ".$nombre1." vs ".$nombre2." </p><p> ".$turno." </p></div>";
        $res2->close();
        $fila = $res->fetch_assoc();
    }
    $res->close();
    $mysqli->close();
}
?>