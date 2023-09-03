<?php
session_start();
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/estilos.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <?php
    $_SESSION["ver"]=0;
    $mensaje=null;
    $pa=null;
    if (isset($_SESSION["mensaje"])){
        $mensaje=$_SESSION["mensaje"];
        $pa=$_SESSION["pa"];
    }
    unset($_SESSION["mensaje"]);
    unset($_SESSION["pa"]);
    ?>
    <script>
        let modo=1;
        let mensaje ='<?=$mensaje?>';
        let pa='<?=$pa?>';
    </script>
</head>
<body>
<header></header>
    <aside id="iz">
        <img src="img/logo.png" >
        <div>
            <h1>Modos</h1> <h2>de juego</h2>
        </div>
        <ul>
            <li id="soli"><h3>Solitario</h3></li>
            <?php
            if (isset($_SESSION['id'])){
                echo "<li id='otros'><h3>B</h3><h4>uscar</h4><h3>Partidas</h3></li>";
                echo "<li id='pg'><h3>Partidas</h3><h3>C</h3><h4>urso</h4></li>";
            }
            ?>
            <li id="vpar"><h3>Ver</h3> <h4>partidas</h4></li>
        </ul>
    </aside>
    <aside id="de">
        <ul>
            <?php
            if (!isset($_SESSION['id'])){
                echo '<li id="bini"><h3>Iniciar</h3></li>';
                echo '<li id="bregi"><h3>Registar</h3></li>';
            }else{
                $mysqli = new mysqli("localhost","amigos","damas2","damas");
                if ($mysqli->connect_errno){
                    $_SESSION["mensaje"]="Error base de datos";
                }else{
                    $id=$_SESSION["id"];
                    $sql="select u.nombre usuario from usuarios u
                            where u.id_usuario='$id';";
                    $res=$mysqli->query($sql);
                    $fila=$res->fetch_assoc();
                    $nombre=$fila["usuario"];
                    $res->close();
                    $mysqli->close();
                }
                echo '<li><h3>'.$nombre.'</h3><a href="exit.php">Exit</a></li>';
                echo '<li><h3>Amigos</h3><img id="lupa" src="img/lupa.png">
                        <div id="amigos">Espere</div></li>';
            }
            ?>
        </ul>
    </aside>
    <article id="centro">

    </article>

<div id="iniciar">
    <form action="inicio.php" method="post">
        <h1>Iniciar Sesion</h1><br>
        <label for="iusuario">Nombre de usuario</label><br>
        <input type="text" id="iusuario" name="usuario"><br>
        <label for="ipassword">Contraseña</label><br>
        <input type="password" id="ipassword" name="pass"><br>
        <p style="color: red"></p>
        <button>Acceder</button>
    </form>
</div>

<div id="registro">
    <form action="registro.php" method="post">
        <h1>Registrarse</h1><br>
        <label for="rusuario">Nombre de usuario</label><br>
        <input type="text" id="rusuario" name="usuario"><br>
        <label for="rpassword">Contraseña</label><br>
        <input type="password" id="rpassword" name="pass"><br>
        <label for="rpasswordr">Repetir Contraseña</label><br>
        <input type="password" id="rpasswordr" name="passr"><br>
        <p style="color: red"></p>
        <button>Registrar</button>
    </form>
</div>
<div id="buscar">
    <form action="amigos.php" method="post">
        <h1>Añadir amigos</h1><br>
        <label for="busuario">Nombre del usuario</label><br>
        <input type="text" id="busuario" name="usuario"><br>
        <p style="color: red"></p>
        <button>Enviar solicitud</button>
    </form>
</div>
<div id="mensajes">
    <div>
    <div>

    </div>
    <form>
        <input type="text" id="envimen" name="mensaje"><button>></button>
    </form>
    </div>
</div>
<div id="jugar">
    <div>
        <p>Buscar otros jugadores</p>
        <button id="bpar">Buscar partida</button>
        <button id="can">Cancelar</button>
    </div>
</div>

<div id="alerta"></div>

<div id="pargu">
    <div>
        <div>

        </div>
    </div>
</div>
<div id="verpar">
    <div>
        <div>

        </div>
    </div>
</div>
<script src="js/in-re.js"></script>
<script src="js/ac_amigos.js"></script>
<script src="js/damas.js"></script>
<script src="js/damas_otros.js"></script>
<script src="js/cambiar.js" ></script>
<script src="js/jugar.js" ></script>
<script src="js/ver_par.js" ></script>
</body>
</html>