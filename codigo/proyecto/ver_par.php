<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{

    $sql = "select id_partida, id_usuario1,id_usuario2 ,u.nombre nombre1,u2.nombre nombre2 from asignar a
                               join usuarios u on u.id_usuario = a.id_usuario1
                               join usuarios u2 on u2.id_usuario = a.id_usuario2
                            where resultado is not null;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    while ($fila){
        $nombre1=$fila["nombre1"];
        $nombre2=$fila["nombre2"];
        $partida=$fila["id_partida"];
        echo "<div><p> Ver </p><p> ".$nombre1." vs ".$nombre2."</p>-<p>".$partida."</p></div>";
        $fila = $res->fetch_assoc();
    }
    $res->close();
    $mysqli->close();
}
?>