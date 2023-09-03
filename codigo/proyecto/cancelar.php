<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error base de datos";
}else{
    unset($_SESSION["par"]);
    $id = $_SESSION["id"];
    $sql = "delete from asignar where id_usuario1='$id' and ac1=1 and id_usuario2 is null and ac2 is null and tipo=1 and resultado is null;";
    $mysqli->query($sql);
    $mysqli->close();
}
?>