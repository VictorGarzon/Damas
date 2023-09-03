<?php
session_start();
$mysqli = new mysqli("localhost","partidas","damas3","damas");
if ($mysqli->connect_errno){
    echo "Error";
}else{
    $partida = $_SESSION["partida"];
    if (isset($_POST["resultado"])){
        if ($_POST["resultado"]==0) {
            $resultado = $_POST["resultado"];
        }else{
            $id=$_SESSION["id"];
            $sql = "select id_usuario1,id_usuario2 from asignar where id_partida='$partida';";
            $res = $mysqli->query($sql);
            $fila = $res->fetch_assoc();
            if ($_POST["resultado"]==1){
                if ($id==$fila["id_usuario1"]){
                    $resultado=1;
                }else{
                    $resultado=2;
                }
            }else{
                if ($id==$fila["id_usuario1"]){
                    // $resultado=$fila["id_usuario2"];
                    $resultado=2;
                }else{
                    // $resultado=$fila["id_usuario1"];
                    $resultado=1;
                }
            }
            $res->close();
        }
    }
    //else{
      //  $resultado=$_SESSION["id"];
    //}
    $sql = "update asignar set resultado='$resultado' where id_partida='$partida';";
    $mysqli->query($sql);
    $mysqli->close();
}
?>