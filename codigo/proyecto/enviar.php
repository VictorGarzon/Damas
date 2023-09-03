<?php
session_start();
if (!isset($_POST["texto"])|| strlen(trim($_POST["texto"])) == 0 ){
    echo "Error";
}else{
    $id_tu = $_SESSION["id"];
    $id_usuario1 = $_SESSION["id_usuario1"];
    $id_usuario2 = $_SESSION["id_usuario2"];
    $texto = htmlentities(trim($_POST["texto"]));
    $mysqli = new mysqli("localhost","amigos","damas2","damas");
    if ($mysqli->connect_errno){
        echo "Error";
    }else{
            $sql = "select count(*) mensajes from mensajes_amigos where id_usuario1='$id_usuario1' and id_usuario2='$id_usuario2';";
            $res = $mysqli->query($sql);
            $fila = $res->fetch_assoc();
            $id_mensajes = $fila["mensajes"];
            $res->close();
            $id_mensajes = $id_mensajes + 1;
            if (mysqli_errno($mysqli)) {
                echo "Error";
            }else {
                $insert = "insert into mensajes_amigos(id_usuario1, id_usuario2, id_mensaje, mensaje, origen) VALUE (?,?,?,?,?);";
                $st = $mysqli->prepare($insert);
                $st->bind_param("iiisi", $id_usuario1, $id_usuario2, $id_mensajes, $texto, $id_tu);
                $st->execute();
                $st->close();
                if (mysqli_errno($mysqli)) {
                    echo "Error";
                }
                $mysqli->close();
            }
    }
}
?>