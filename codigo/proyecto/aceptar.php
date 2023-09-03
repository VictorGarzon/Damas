<?php
session_start();
$nombre1 = $_POST["usuario"];
$usuario2 = $_SESSION["id"];
$mysqli = new mysqli("localhost","amigos","damas2","damas");
if ($mysqli->connect_errno){
    $_SESSION["mensaje"]="Error base de datos";
}else {
    $sql = "select id_usuario id from usuarios
         where nombre='$nombre1';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    if ($fila){
        $usuario1=$fila["id"];
        $sql = "update amigos set ac2=1 where id_usuario1='$usuario1' and id_usuario2='$usuario2';";
        $mysqli->query($sql);
    }
    $res->close();
    $mysqli->close();
}
?>