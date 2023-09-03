<?php
session_start();
$mysqli = new mysqli("localhost","amigos","damas2","damas");
if ($mysqli->connect_errno){
    echo "Error base de datos";
}else {
    $sql="select amigo from versiones";
    $res=$mysqli->query($sql);
    $fila=$res->fetch_assoc();
    $version=$fila["amigo"];
    $res->close();
    if ($_SESSION["ver"]!=$version) {
        $_SESSION["ver"] = $version;
        $id = $_SESSION["id"];
        $sql = "select u.id_usuario id, u2.id_usuario id2 ,u.nombre usuario ,u2.nombre amigo,ac1,ac2,visto1,visto2 from usuarios u
                join amigos a on u.id_usuario = a.id_usuario1
                join usuarios u2 on a.id_usuario2 = u2.id_usuario
                where u.id_usuario='$id' or u2.id_usuario='$id';";
        $res = $mysqli->query($sql);
        $fila = $res->fetch_assoc();
        $contador=0;
        while ($fila) {
            $contador = $contador+1;
            $idu1=$fila["id"];
            $idu2=$fila["id2"];
            $sql2 = "select count(*) mensajes from mensajes_amigos where id_usuario1='$idu1' and id_usuario2='$idu2';";
            $res2 = $mysqli->query($sql2);
            $fila2 = $res2->fetch_assoc();
            $mensajes=0;
            if ($fila2){
                $mensajes=$fila2["mensajes"];
            }
            $res2->close();
            $sinver = $mensajes - $fila["visto1"] ;
            $amigo = $fila["amigo"];
            if ($fila["id"] != $id) {
                $amigo = $fila["usuario"];
                $sinver = $mensajes - $fila["visto2"] ;
            }
            $mensinver=null;
            if ($sinver!=0){
                $mensinver=" Sin ver: ".$sinver;
            }
            if ($fila["ac1"] == 1 && $fila["ac2"] == 1) {
                echo "<p class='amigo'><span>" . $amigo . "</span>$mensinver</p>";
            } else if ($fila["ac1"] == 1 && $fila["id"] == $id) {
                echo "<p><span>" . $amigo . "</span><span class='espera'> En espera </span></p>";
            } else {
                echo "<p><span>" . $amigo . "</span><span class='soli'> Aceptar </span></p>";
            }
            $fila = $res->fetch_assoc();
        }
        if ($contador==0){
            echo "Sin amigos";
        }
        $res->close();
    }
        $mysqli->close();
}
?>