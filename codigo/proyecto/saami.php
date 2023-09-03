<?php
session_start();
if (!isset($_POST["amigo"])||strlen(trim($_POST["amigo"])) == 0 ){
    echo "Error";
}else{
    $amigo = htmlentities($_POST["amigo"]);
    $id_tu = $_SESSION["id"];
    $mysqli = new mysqli("localhost","amigos","damas2","damas");
    if ($mysqli->connect_errno){
        echo "Error";
    }else{
        $query = "SELECT id_usuario1,id_usuario2
        FROM usuarios u
        join amigos a on u.id_usuario = a.id_usuario1
        join usuarios u2  on u2.id_usuario = a.id_usuario2
        WHERE u.nombre = ? and id_usuario2=? or u2.nombre=? and id_usuario1=?";
        $st=$mysqli->prepare($query);
        $st->bind_param("sisi",$amigo,$id_tu,$amigo,$id_tu);
        $st->execute();
        $st->bind_result($id_usuario1,$id_usuario2);
        $st->store_result();
        $st->fetch();
        if (mysqli_errno($mysqli)) {
            echo "Error";
        }else{
            $_SESSION["id_usuario1"]=$id_usuario1;
            $_SESSION["id_usuario2"]=$id_usuario2;
        }
        $st->close();
        $mysqli->close();
    }
}
?>