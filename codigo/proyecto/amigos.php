<?php
session_start();

if (!isset($_POST["usuario"])) {
    echo "Rellenar campos obligatorios";
} else {
    $usu = htmlentities($_POST["usuario"]);
    $mysqli = new mysqli("localhost","amigos","damas2","damas");
    if ($mysqli->connect_errno){
        echo "Error base de datos";
    }else{
        $query = "SELECT id_usuario FROM usuarios WHERE nombre =?;";
        $st=$mysqli->prepare($query);
        $st->bind_param("s",$usu);
        $st->execute();
        $st->bind_result($id_usuario2);
        $st->store_result();
        $st->fetch();
        $st->close();
        if (mysqli_errno($mysqli)) {
            echo "Error base de datos";
        } else {
            if ($id_usuario2==null){
                echo "Usuario no existe";
            }else{
                $id_usuario1=$_SESSION["id"];
                if ($id_usuario1!=$id_usuario2) {
                    $sql="select id_usuario1,id_usuario2 from amigos where id_usuario2='$id_usuario1' and id_usuario1='$id_usuario2'";
                    $res=$mysqli->query($sql);
                    $fila=$res->fetch_assoc();
                    if ($fila){
                        $sql = "update amigos set ac2=1 where id_usuario1='$id_usuario2' and id_usuario2='$id_usuario1';";
                        $mysqli->query($sql);
                    }else{
                        $sql = "INSERT INTO amigos(id_usuario1,id_usuario2,ac1,ac2,visto1,visto2) VALUES('$id_usuario1','$id_usuario2',1,0,0,0);";
                        $mysqli->query($sql);
                    }
                    if (mysqli_errno($mysqli)) {
                        if (mysqli_errno($mysqli) == 1062) {
                            echo "Tienes que esperar a que te acepte";
                        } else {
                            echo "Error base de datos";
                        }
                    }
                    $res->close();
                }else{
                    echo "Eres tu";
                }
            }
        }
        $mysqli->close();
    }
}
?>