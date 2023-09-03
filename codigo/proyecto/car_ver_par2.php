<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $nombre1= trim($_POST["usu1"]);
    $nombre2= trim($_POST["usu2"]);
    echo $nombre1." vs ".$nombre2;
    echo ";";
    $partida= trim($_POST["partida"]);
    $partida=$_SESSION["partida"];
    $sql = "select tablero from movimientos where id_partida='$partida' order by id_movimiento;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    echo $fila["tablero"];
    echo ";";
    $res->close();
    $sql = "select moviento from movimientos where id_partida='$partida' order by id_movimiento;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    $fila = $res->fetch_assoc();
    while ($fila){
        echo "<p>".$fila["moviento"]."</p>";
        $fila = $res->fetch_assoc();
    }
    echo ";";
    $res->close();

    $sql = "select mensaje,origen from mensajes_partidas where id_partida='$partida' order by id_mensaje;";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    while ($fila){
        $nombre=null;
        if ($fila["origen"]==1){
            $nombre=$nombre1;
        }else if ($fila["origen"]==2){
            $nombre=$nombre2;
        }
        echo "<div>".$nombre."<p>".$fila["mensaje"]."</p></div>";
        $fila = $res->fetch_assoc();
    }

    $res->close();
    $mysqli->close();
}
?>