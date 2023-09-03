<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error base de datos";
}else{
    $partida = $_SESSION["partida"];
    $sql = "select u.nombre nombre1,u2.nombre nombre2, mensaje,origen from mensajes_partidas mp
    join asignar a on a.id_partida = mp.id_partida
    join usuarios u on u.id_usuario = a.id_usuario1
    join usuarios u2 on u2.id_usuario = a.id_usuario2 
    where mp.id_partida='$partida' ;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    while ($fila){
        $nombre=null;
        if ($fila["origen"]==1){
            $nombre=$fila["nombre1"];
        }else if ($fila["origen"]==2){
            $nombre=$fila["nombre2"];
        }
        echo "<div>".$nombre."<p>".$fila["mensaje"]."</p></div>";
        $fila = $res->fetch_assoc();
    }
    $res->close();
    $mysqli->close();
}
?>