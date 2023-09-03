<?php
session_start();
$mysqli = new mysqli("localhost","amigos","damas2","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    if (isset($_POST["intentos"])){
        $intentos=$_POST["intentos"];
    }else{
        $intentos=1;
    }
    $id_tu = $_SESSION["id"];
    $id_usuario1 = $_SESSION["id_usuario1"];
    $id_usuario2 = $_SESSION["id_usuario2"];
        $sql = "select count(*) mensajes,visto1,visto2 from mensajes_amigos ma
                join amigos a on a.id_usuario1 = ma.id_usuario1 and a.id_usuario2 = ma.id_usuario2
                where a.id_usuario1='$id_usuario1' and a.id_usuario2='$id_usuario2'
                group by a.id_usuario1,a.id_usuario2,visto1,visto2;";
        $res = $mysqli->query($sql);
        $fila = $res->fetch_assoc();
        $mesajes=0;
        $vista = 0;
        if (isset($fila["mensajes"])) {
            if ($id_tu == $id_usuario1) {
                $vista = $fila["visto1"];
            } else {
                $vista = $fila["visto2"];
            }
            $mesajes = $fila["mensajes"];
        }
        $res->close();
if ( $intentos==0 || $mesajes!=$vista){
    if ($id_tu==$id_usuario1){
        $sql = "update amigos set visto1='$mesajes' where id_usuario1='$id_usuario1' and id_usuario2='$id_usuario2';";
    }else{
        $sql = "update amigos set visto2='$mesajes' where id_usuario1='$id_usuario1' and id_usuario2='$id_usuario2';";
    }
    $mysqli->query($sql);

    $sql = "select mensaje,origen from mensajes_amigos where id_usuario1='$id_usuario1' and id_usuario2='$id_usuario2';";
    $res = $mysqli->query($sql);
    $fila = $res->fetch_assoc();
    while ($fila) {
        echo "<p ";
        if ($fila["origen"] == $id_tu) {
            echo "class='enviado' ";
        } else {
            echo "class='recibido' ";
        }
        echo "><span>" . $fila["mensaje"] . "</span></p>";
        $fila = $res->fetch_assoc();
    }
    $res->close();
}

    $mysqli->close();
}
?>