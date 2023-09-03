<?php
session_start();
mysqli_report(MYSQLI_REPORT_ERROR);
$_SESSION["pa"] = 2;
if (!isset($_POST["usuario"]) || !isset($_POST["pass"]) || !isset($_POST["passr"]) || strlen(trim($_POST["usuario"])) == 0 || strlen(trim($_POST["pass"])) == 0|| strlen(trim($_POST["passr"])) == 0) {
    $_SESSION["mensaje"]="Rellenar campos obligatorios";
} else {
    $usu = htmlentities($_POST["usuario"]);
    $pass = htmlentities($_POST["pass"]);
    $passr = htmlentities($_POST["passr"]);
    if (strlen($usu) <= 20) {
    if ($pass == $passr) {
        $mysqli = new mysqli("localhost", "registro", "damas1", "damas");
        if ($mysqli->connect_errno) {
            $_SESSION["mensaje"] = "Error base de datos";
        } else {
            $salt = "proyecto";
            $pass = password_hash($salt . $pass, PASSWORD_DEFAULT);
            $insert = "INSERT INTO usuarios(nombre,password) VALUES(?,?)";
            $st = $mysqli->prepare($insert);
            $st->bind_param("ss", $usu, $pass);
            $st->execute();
            if (mysqli_errno($mysqli)) {
                if (mysqli_errno($mysqli) == 1062) {
                    $_SESSION["mensaje"] = "Ya existe";
                } else {
                    $_SESSION["mensaje"] = "Error base de datos";
                }
            } else {
                $sql = "select id_usuario from usuarios where nombre='$usu';";
                $res = $mysqli->query($sql);
                $fila = $res->fetch_assoc();
                $_SESSION["id"] = $fila["id_usuario"];
                $res->close();
            }
            $st->close();
            $mysqli->close();
        }
    } else {
        $_SESSION["mensaje"] = "Contraseñas diferentes";
    }
}else {
        $_SESSION["mensaje"] = "nombre de 20 caracteres";
    }
}
header("location:index.php");
?>