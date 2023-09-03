<?php
session_start();
$mysqli = new mysqli("localhost","amigos","damas2","damas");
$sql="select amigo from versiones";
$res=$mysqli->query($sql);
$fila=$res->fetch_assoc();
$version=$fila["amigo"];
$res->close();
if ($_SESSION["ver"]!=$version){
    $_SESSION["ver"] = $version;
    echo 1;
}else{
    echo 0;
}
$mysqli->close();
?>