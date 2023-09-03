window.addEventListener("DOMContentLoaded",function (e) {
    if (document.getElementById('lupa')!=null) {
    // actuliazar amigos
    setInterval(function (e) {
        $.ajax({
            url: 'acami.php',
            success: function (php) {
                if (php.length!=0) {
                    $("#amigos").html(php);
                }
            }
        });
    }, 1000);
    //buscar amigos
        document.getElementById('lupa').addEventListener("click", function (e) {
            document.getElementById('buscar').style.display = "block";
        })

        document.getElementById('buscar').addEventListener("click", function (e) {
            if (e.target == document.getElementById('buscar')) {
                document.getElementById('buscar').style.display = "none";
                document.querySelector('#buscar p').innerHTML ='';
            }
        })

        document.querySelector('#buscar button').addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector('#buscar p').innerHTML ='';
            if (document.getElementById('busuario').value.length == 0) {
                document.querySelector('#buscar p').innerHTML = 'Campos no completados';
            }else {
                let envio = {"usuario":document.getElementById('busuario').value};
                $.ajax({
                    data:envio,
                    url:'amigos.php',
                    type: 'post',
                    success: function (resultado) {
                        if (resultado.length!=0){
                            document.querySelector('#buscar p').innerHTML = resultado;
                        }else {
                            document.getElementById('buscar').style.display = "none";
                        }
                    }
                });
            }
            document.getElementById('busuario').value='';
        })

        document.getElementById('amigos').addEventListener("click", function (e) {
            if (e.target.classList.contains('soli')){
                let usuario=e.target.parentNode.firstChild.textContent;
                let envio = {"usuario":usuario};
                $.ajax({
                    data:envio,
                    url:'aceptar.php',
                    type: 'post'
                });
            }
            if (e.target.classList.contains('amigo')){
                let envio = {"amigo":e.target.firstChild.textContent};
                $.ajax({
                    data:envio,
                    url:'saami.php',
                    type: 'post',
                    success: function (php) {
                        if (php.length!=0){
                            location.reload();
                        }
                    }
                });
                document.getElementById('mensajes').style.display = "block";

                let intentos = {"intentos":0};
                $.ajax({
                    data:intentos,
                    url:'cargar_men.php',
                    type: 'post',
                    success: function (php) {
                        $("#mensajes div div").html(php);
                    }
                });
                let obsevar = new MutationObserver(function (e){
                    document.querySelector('#mensajes div div').scrollTop=document.querySelector('#mensajes div div').scrollHeight;
                    obsevar.disconnect();
                });
                obsevar.observe(document.querySelector('#mensajes div div'),{
                    childList: true,
                });
            }
        });

        setInterval(function (e) {
            if (document.getElementById('mensajes').style.display=="block"){
                $.ajax({
                    url:'cargar_men.php',
                    type: 'post',
                    success: function (php) {
                        if (php.length!=0) {
                            $("#mensajes div div").html(php);
                        }
                    }
                });
            }
        }, 1000);
        document.querySelector('#mensajes button').addEventListener("click", function (e) {
            e.preventDefault();
            if (document.getElementById('envimen').value.length!=0){
                let fondo=document.querySelector('#mensajes div div').scrollHeight;
                let envio = {"texto":document.getElementById('envimen').value};
                $.ajax({
                    data:envio,
                    url:'enviar.php',
                    type: 'post',
                    success: function (php) {
                        if (php.length!=0){
                            location.reload();
                        }
                    }
                });
                document.getElementById('envimen').value='';
                let obsevar = new MutationObserver(function (e){
                    document.querySelector('#mensajes div div').scrollTop=document.querySelector('#mensajes div div').scrollHeight;
                    obsevar.disconnect();
                });
                obsevar.observe(document.querySelector('#mensajes div div'),{
                    childList: true,
                });

            }
        })

        document.getElementById('mensajes').addEventListener("click", function (e) {
            if (e.target == document.getElementById('mensajes')) {
                document.querySelector("#mensajes div div").innerHTML='';
                document.getElementById('mensajes').style.display = "none";
            }
        })
    }
});