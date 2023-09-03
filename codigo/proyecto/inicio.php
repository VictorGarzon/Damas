<?php
session_start();
mysqli_report(MYSQLI_REPORT_ERROR);
$_SESSION["pa"] = 1;
if (!isset($_POST["usuario"])||!isset($_POST["pass"])||strlen(trim($_POST["usuario"])) == 0 || strlen(trim($_POST["pass"])) == 0 ){
    $_SESSION["mensaje"]="Campos mal metidos";
}else {
    $mysqli = new mysqli("localhost","registro","damas1","damas");
    if ($mysqli->connect_errno){
        $_SESSION["mensaje"]="Error base de datos";
    } else {
        $salt="proyecto";
        $usu = htmlentities($_POST["usuario"]);
        $pass = htmlentities($_POST["pass"]);
        $query = "SELECT id_usuario,password FROM usuarios WHERE nombre =?;";
        $st=$mysqli->prepare($query);
        $st->bind_param("s",$usu);
        $st->execute();
        $st->bind_result($id_usuario,$password);
        $st->store_result();
        $st->fetch();
        if ($st->num_rows==1 && password_verify($salt . $pass, $password )) {
            $_SESSION["id"] = $id_usuario;
        } else {
            $_SESSION["mensaje"]="Usuario o contraseña incorrectos";
        }
        $st->close();
        $mysqli->close();
    }
}
header("location:index.php");
?>