window.addEventListener("DOMContentLoaded",function (e) {
    let buscando = 0;
    if (document.getElementById('otros') != null) {
        document.getElementById('otros').addEventListener('click', function (e) {
            if (document.getElementById('jugar').style.display == "block") {
                document.getElementById('bpar').addEventListener("click", function (e) {
                    $.ajax({
                        url: 'buscar.php',
                        success: function (php) {
                            if (php == 1) {
                                buscando = 1;
                                document.getElementById('bpar').style.display = "none";
                                document.getElementById('can').style.display = "inline-block";
                                document.querySelector('#jugar div p').textContent = "En espera";
                                let espera2;
                                let espera = setInterval(function (e) {
                                    $.ajax({
                                        url: 'espera.php',
                                        success: function (php) {
                                            if (php == 1) {
                                                clearInterval(espera);
                                                document.querySelector('#jugar div p').textContent = "Buscar otros jugadores";
                                                document.getElementById('bpar').style.display = "inline-block";
                                                document.getElementById('can').style.display = "none";
                                                document.getElementById('jugar').style.display = "none";
                                                $.ajax({
                                                    url: 'nombre.php',
                                                    success: function (php) {
                                                        document.getElementById('centro').innerHTML = "<h1>" + php + "</h1><section id=\"tablero\">\n" +
                                                            "                <div id=\"81\" class=\"blanco\" ></div><div id=\"82\" class=\"negro fichaw\"></div><div id=\"83\" class=\"blanco\"></div><div id=\"84\" class=\"negro fichaw\"></div><div id=\"85\" class=\"blanco\"></div><div id=\"86\" class=\"negro fichaw\"></div><div id=\"87\" class=\"blanco\"></div><div id=\"88\" class=\"negro fichaw\"></div>\n" +
                                                            "                <div id=\"71\" class=\"negro fichaw\"></div><div id=\"72\" class=\"blanco\"></div><div id=\"73\" class=\"negro fichaw\"></div><div id=\"74\" class=\"blanco\"></div><div id=\"75\" class=\"negro fichaw\"></div><div id=\"76\" class=\"blanco\"></div><div id=\"77\" class=\"negro fichaw\"></div><div id=\"78\" class=\"blanco\"></div>\n" +
                                                            "                <div id=\"61\" class=\"blanco\"></div><div id=\"62\" class=\"negro fichaw\"></div><div id=\"63\" class=\"blanco\"></div><div id=\"64\" class=\"negro fichaw\"></div><div id=\"65\" class=\"blanco\"></div><div id=\"66\" class=\"negro fichaw\"></div><div id=\"67\" class=\"blanco\"></div><div id=\"68\" class=\"negro fichaw\"></div>\n" +
                                                            "                <div id=\"51\" class=\"negro\"></div><div id=\"52\" class=\"blanco\"></div><div id=\"53\" class=\"negro\"></div><div id=\"54\" class=\"blanco\"></div><div id=\"55\" class=\"negro\"></div><div id=\"56\" class=\"blanco\"></div><div id=\"57\" class=\"negro\"></div><div id=\"58\" class=\"blanco\"></div>\n" +
                                                            "                <div id=\"41\" class=\"blanco\"></div><div id=\"42\" class=\"negro\"></div><div id=\"43\" class=\"blanco\"></div><div id=\"44\" class=\"negro\"></div><div id=\"45\" class=\"blanco\"></div><div id=\"46\" class=\"negro\"></div><div id=\"47\" class=\"blanco\"></div><div id=\"48\" class=\"negro\"></div>\n" +
                                                            "                <div id=\"31\" class=\"negro fichan \"></div><div id=\"32\" class=\"blanco\"></div><div id=\"33\" class=\"negro fichan \"></div><div id=\"34\" class=\"blanco\"></div><div id=\"35\" class=\"negro fichan \"></div><div id=\"36\" class=\"blanco\"></div><div id=\"37\" class=\"negro fichan \"></div><div id=\"38\" class=\"blanco\"></div>\n" +
                                                            "                <div id=\"21\" class=\"blanco\"></div><div id=\"22\" class=\"negro fichan \"></div><div id=\"23\" class=\"blanco\"></div><div id=\"24\" class=\"negro fichan \"></div><div id=\"25\" class=\"blanco\"></div><div id=\"26\" class=\"negro fichan \"></div><div id=\"27\" class=\"blanco\"></div><div id=\"28\" class=\"negro fichan \"></div>\n" +
                                                            "                <div id=\"11\" class=\"negro fichan \"></div><div id=\"12\" class=\"blanco\"></div><div id=\"13\" class=\"negro fichan \"></div><div id=\"14\" class=\"blanco\"></div><div id=\"15\" class=\"negro fichan \"></div><div id=\"16\" class=\"blanco\"></div><div id=\"17\" class=\"negro fichan \"></div><div id=\"18\" class=\"blanco\"></div>\n" +

                                                            "    </section>\n" +
                                                            "    <section id=\"tade\">\n" +
                                                            "        <div id=\"turn\">\n" +
                                                            "            TURNO DE: <p>NEGRAS</p>\n" +
                                                            "            <button id=\"soplar\" >Soplar</button><button id=\"rendirse\">Rendirse</button><button id=\"tablas\">Empate(0/2)</button>\n" +
                                                            "        </div>\n" +
                                                            "        <div id=\"movi\">\n" +
                                                            "        </div>\n" +
                                                            "        <div id=\"chat\"><div></div>\n" +
                                                            "<form>" +
                                                            "            <input type=\"text\" id=\"parmen\" name=\"mensaje\"><button>></button>" +
                                                            "</form>" +
                                                            "        </div>\n" +
                                                            "    </section>"
                                                        //modo = 2;
                                                        jugar();
                                                    }
                                                });
                                            } else if (document.getElementById('can').style.display == "none") {
                                                clearInterval(espera);
                                                clearInterval(espera2);
                                            }
                                        }
                                    });
                                }, 100)
                                espera2 = setTimeout(function (e) {
                                    if (document.getElementById('can').style.display != "none") {
                                        clearInterval(espera);
                                        $.ajax({
                                            url: 'cancelar.php',
                                        });
                                        document.getElementById('bpar').style.display = "inline-block";
                                        document.getElementById('can').style.display = "none";
                                        document.querySelector('#jugar div p').textContent = "Buscar en otro momento";
                                    }
                                }, 60000)
                            } else if (php == 2) {
                                document.querySelector('#jugar div p').textContent = "Buscar otros jugadores";
                                document.getElementById('bpar').style.display = "inline-block";
                                document.getElementById('can').style.display = "none";
                                document.getElementById('jugar').style.display = "none";
                                $.ajax({
                                    url: 'nombre.php',
                                    success: function (php) {

                                        document.getElementById('centro').innerHTML = "<h1>" + php + "</h1><section id=\"tablero\" class='girar'>\n" +


                                            "                <div id=\"81\" class=\"blanco\" ></div><div id=\"82\" class=\"negro fichaw\"></div><div id=\"83\" class=\"blanco\"></div><div id=\"84\" class=\"negro fichaw\"></div><div id=\"85\" class=\"blanco\"></div><div id=\"86\" class=\"negro fichaw\"></div><div id=\"87\" class=\"blanco\"></div><div id=\"88\" class=\"negro fichaw\"></div>\n" +
                                            "                <div id=\"71\" class=\"negro fichaw\"></div><div id=\"72\" class=\"blanco\"></div><div id=\"73\" class=\"negro fichaw\"></div><div id=\"74\" class=\"blanco\"></div><div id=\"75\" class=\"negro fichaw\"></div><div id=\"76\" class=\"blanco\"></div><div id=\"77\" class=\"negro fichaw\"></div><div id=\"78\" class=\"blanco\"></div>\n" +
                                            "                <div id=\"61\" class=\"blanco\"></div><div id=\"62\" class=\"negro fichaw\"></div><div id=\"63\" class=\"blanco\"></div><div id=\"64\" class=\"negro fichaw\"></div><div id=\"65\" class=\"blanco\"></div><div id=\"66\" class=\"negro fichaw\"></div><div id=\"67\" class=\"blanco\"></div><div id=\"68\" class=\"negro fichaw\"></div>\n" +
                                            "                <div id=\"51\" class=\"negro\"></div><div id=\"52\" class=\"blanco\"></div><div id=\"53\" class=\"negro\"></div><div id=\"54\" class=\"blanco\"></div><div id=\"55\" class=\"negro\"></div><div id=\"56\" class=\"blanco\"></div><div id=\"57\" class=\"negro\"></div><div id=\"58\" class=\"blanco\"></div>\n" +
                                            "                <div id=\"41\" class=\"blanco\"></div><div id=\"42\" class=\"negro\"></div><div id=\"43\" class=\"blanco\"></div><div id=\"44\" class=\"negro\"></div><div id=\"45\" class=\"blanco\"></div><div id=\"46\" class=\"negro\"></div><div id=\"47\" class=\"blanco\"></div><div id=\"48\" class=\"negro\"></div>\n" +
                                            "                <div id=\"31\" class=\"negro fichan \"></div><div id=\"32\" class=\"blanco\"></div><div id=\"33\" class=\"negro fichan \"></div><div id=\"34\" class=\"blanco\"></div><div id=\"35\" class=\"negro fichan \"></div><div id=\"36\" class=\"blanco\"></div><div id=\"37\" class=\"negro fichan \"></div><div id=\"38\" class=\"blanco\"></div>\n" +
                                            "                <div id=\"21\" class=\"blanco\"></div><div id=\"22\" class=\"negro fichan \"></div><div id=\"23\" class=\"blanco\"></div><div id=\"24\" class=\"negro fichan \"></div><div id=\"25\" class=\"blanco\"></div><div id=\"26\" class=\"negro fichan \"></div><div id=\"27\" class=\"blanco\"></div><div id=\"28\" class=\"negro fichan \"></div>\n" +
                                            "                <div id=\"11\" class=\"negro fichan \"></div><div id=\"12\" class=\"blanco\"></div><div id=\"13\" class=\"negro fichan \"></div><div id=\"14\" class=\"blanco\"></div><div id=\"15\" class=\"negro fichan \"></div><div id=\"16\" class=\"blanco\"></div><div id=\"17\" class=\"negro fichan \"></div><div id=\"18\" class=\"blanco\"></div>\n" +

                                            "    </section>\n" +
                                            "    <section id=\"tade\">\n" +
                                            "        <div id=\"turn\">\n" +
                                            "            TURNO DE: <p>NEGRAS</p>\n" +
                                            "            <button id=\"soplar\" disabled >Soplar</button><button id=\"rendirse\">Rendirse</button><button id=\"tablas\">Empate(0/2)</button>\n" +
                                            "        </div>\n" +
                                            "        <div id=\"movi\">\n" +
                                            "        </div>\n" +
                                            "        <div id=\"chat\"><div></div>\n" +
                                            "<form>" +
                                            "            <input type=\"text\" id=\"parmen\" name=\"mensaje\"><button>></button>" +
                                            "</form>" +
                                            "        </div>\n" +
                                            "    </section>";
                                        let i3 = 8;
                                        for (let i = 1; i < 9; i++) {
                                            let i4 = 8;
                                            for (let i2 = 1; i2 < 9; i2++) {
                                                document.getElementById('' + i + i2 + '').id = '' + i3 + i4 + '';
                                                i4--;
                                            }
                                            i3--;
                                        }
                                        jugar();
                                    }
                                });
                            }
                        }
                    });
                })
            }
        })
    }
    document.getElementById('jugar').addEventListener("click", function (e) {
        if (e.target == document.getElementById('jugar')) {
            document.getElementById('jugar').style.display = "none";
            if (buscando == 1) {
                $.ajax({
                    url: 'cancelar.php',
                });
                document.querySelector('#jugar div p').textContent = "Buscar otros jugadores";
                document.getElementById('bpar').style.display = "inline-block";
                document.getElementById('can').style.display = "none";
            }
        }
    })
    document.getElementById('can').addEventListener("click", function (e) {
        $.ajax({
            url: 'cancelar.php',
        });
        document.querySelector('#jugar div p').textContent = "Buscar otros jugadores";
        document.getElementById('bpar').style.display = "inline-block";
        document.getElementById('can').style.display = "none";
    })
    if (document.getElementById('pg')!=null) {
    document.getElementById('pg').addEventListener('click', function (e) {
        document.getElementById('pargu').style.display = "block";
        let phpante;
        let carpar = setInterval(function (e) {
            if (document.getElementById('pargu').style.display == "none") {
                clearInterval(carpar)
            } else {
                $.ajax({
                    url: 'par.php',
                    success: function (php) {
                        if (php.length != 0) {
                            if (phpante != php) {
                                document.querySelector("#pargu div div").innerHTML = php;
                                phpante = php;
                            }
                        } else {
                            document.querySelector("#pargu div div").innerHTML = "<p>Sin partidas</p>";
                        }
                    }
                });
            }
        }, 100)
    });
}
    document.getElementById('pargu').addEventListener("click", function (e) {
        if (e.target == document.getElementById('pargu')) {
            document.getElementById('pargu').style.display = "none";
        }else {
            for (let partida of document.querySelectorAll("#pargu div div div p:first-child")) {
                if (e.target == partida){
                    let titulo=e.target.nextSibling.textContent.split('vs');
                    document.getElementById('pargu').style.display = "none";
                    let enviar={"usu1":titulo[0],"usu2":titulo[1]}
                    $.ajax({
                        data: enviar,
                        url: 'carmo2.php',
                        type: 'post',
                        success: function (php) {
                            if (php!=0){
                                let arphp = php.split(':');
                                let girar='';
                                if (arphp[1]==2){
                                    girar='girar';
                                }
                                document.getElementById('centro').innerHTML = "<h1>"+arphp[0]+"</h1> <section id=\"tablero\" class="+girar+">\n" +
                                    "                <div id=\"81\" class=\"blanco\" ></div><div id=\"82\" class=\"negro fichaw\"></div><div id=\"83\" class=\"blanco\"></div><div id=\"84\" class=\"negro fichaw\"></div><div id=\"85\" class=\"blanco\"></div><div id=\"86\" class=\"negro fichaw\"></div><div id=\"87\" class=\"blanco\"></div><div id=\"88\" class=\"negro fichaw\"></div>\n" +
                                    "                <div id=\"71\" class=\"negro fichaw\"></div><div id=\"72\" class=\"blanco\"></div><div id=\"73\" class=\"negro fichaw\"></div><div id=\"74\" class=\"blanco\"></div><div id=\"75\" class=\"negro fichaw\"></div><div id=\"76\" class=\"blanco\"></div><div id=\"77\" class=\"negro fichaw\"></div><div id=\"78\" class=\"blanco\"></div>\n" +
                                    "                <div id=\"61\" class=\"blanco\"></div><div id=\"62\" class=\"negro fichaw\"></div><div id=\"63\" class=\"blanco\"></div><div id=\"64\" class=\"negro fichaw\"></div><div id=\"65\" class=\"blanco\"></div><div id=\"66\" class=\"negro fichaw\"></div><div id=\"67\" class=\"blanco\"></div><div id=\"68\" class=\"negro fichaw\"></div>\n" +
                                    "                <div id=\"51\" class=\"negro\"></div><div id=\"52\" class=\"blanco\"></div><div id=\"53\" class=\"negro\"></div><div id=\"54\" class=\"blanco\"></div><div id=\"55\" class=\"negro\"></div><div id=\"56\" class=\"blanco\"></div><div id=\"57\" class=\"negro\"></div><div id=\"58\" class=\"blanco\"></div>\n" +
                                    "                <div id=\"41\" class=\"blanco\"></div><div id=\"42\" class=\"negro\"></div><div id=\"43\" class=\"blanco\"></div><div id=\"44\" class=\"negro\"></div><div id=\"45\" class=\"blanco\"></div><div id=\"46\" class=\"negro\"></div><div id=\"47\" class=\"blanco\"></div><div id=\"48\" class=\"negro\"></div>\n" +
                                    "                <div id=\"31\" class=\"negro fichan \"></div><div id=\"32\" class=\"blanco\"></div><div id=\"33\" class=\"negro fichan \"></div><div id=\"34\" class=\"blanco\"></div><div id=\"35\" class=\"negro fichan \"></div><div id=\"36\" class=\"blanco\"></div><div id=\"37\" class=\"negro fichan \"></div><div id=\"38\" class=\"blanco\"></div>\n" +
                                    "                <div id=\"21\" class=\"blanco\"></div><div id=\"22\" class=\"negro fichan \"></div><div id=\"23\" class=\"blanco\"></div><div id=\"24\" class=\"negro fichan \"></div><div id=\"25\" class=\"blanco\"></div><div id=\"26\" class=\"negro fichan \"></div><div id=\"27\" class=\"blanco\"></div><div id=\"28\" class=\"negro fichan \"></div>\n" +
                                    "                <div id=\"11\" class=\"negro fichan \"></div><div id=\"12\" class=\"blanco\"></div><div id=\"13\" class=\"negro fichan \"></div><div id=\"14\" class=\"blanco\"></div><div id=\"15\" class=\"negro fichan \"></div><div id=\"16\" class=\"blanco\"></div><div id=\"17\" class=\"negro fichan \"></div><div id=\"18\" class=\"blanco\"></div>\n" +

                                    "    </section>\n" +
                                    "    <section id=\"tade\">\n" +
                                    "        <div id=\"turn\">\n" +
                                    "            TURNO DE: <p>NEGRAS</p>\n" +
                                    "            <button id=\"soplar\" >Soplar</button><button id=\"rendirse\">Rendirse</button><button id=\"tablas\">Empate(0/2)</button>\n" +
                                    "        </div>\n" +
                                    "        <div id=\"movi\">\n" +
                                    "        </div>\n" +
                                    "        <div id=\"chat\"><div></div>" +
                                    "         <form>"+
                                    "            <input type=\"text\" id=\"parmen\" name=\"mensaje\"><button>></button>"+
                                    "         </form>"+
                                    "        </div>\n" +
                                    "    </section>"
                                if (arphp[1]==2){
                                    let i3 = 8;
                                    for (let i = 1; i < 9; i++) {
                                        let i4 = 8;
                                        for (let i2 = 1; i2 < 9; i2++) {
                                            document.getElementById('' + i + i2 + '').id = '' + i3 + i4 + '';
                                            i4--;
                                        }
                                        i3--;
                                    }
                                }
                            }else {
                                location.reload();
                            }
                        }
                    });
                    jugar();
                }
            }
        }
    })


function jugar(){
    setInterval(function (e){
        $.ajax({
            url:'carmo.php',
            success: function (php) {
                if (php.length!=0){
                    let arphp = php.split(':');
                    if (arphp[0]==1){
                        modo=2;
                    } else if (arphp[0]==2){
                        modo=2;
                    } else if (document.getElementById('tablero').classList.contains('girar')) {
                        document.querySelector("#turn p").innerHTML = "NEGRAS";
                    }else {
                        document.querySelector("#turn p").innerHTML = "BLANCAS";
                    }

                    while (document.getElementsByClassName('fichan').length) {
                        document.getElementsByClassName('fichan')[0].classList.remove("fichan");
                    }
                    while (document.getElementsByClassName('fichaw').length) {
                        document.getElementsByClassName('fichaw')[0].classList.remove("fichaw");
                    }

                    while (document.getElementsByClassName('corona').length) {
                        document.getElementsByClassName('corona')[0].classList.remove("corona");
                    }
                    let tab = arphp[1].split(',');
                    if (document.getElementById('tablero').classList.contains('girar')) {
                        tab.reverse();
                    }
                    let i3=0;
                    for (let i = 8; i > 0; i--) {
                        for (let i2 = 1; i2 <= 8; i2++) {
                            if (tab[i3]==1){
                                document.getElementById('' + i + i2 + '').classList.add("fichan")
                            }else if (tab[i3]==11){
                                document.getElementById('' + i + i2 + '').classList.add("fichan")
                                document.getElementById('' + i + i2 + '').classList.add("corona")
                            }else if(tab[i3]==2){
                                document.getElementById('' + i + i2 + '').classList.add("fichaw")
                            }else if (tab[i3]==22){
                                document.getElementById('' + i + i2 + '').classList.add("fichaw")
                                document.getElementById('' + i + i2 + '').classList.add("corona")
                            }
                            i3++;
                        }
                    }
                    $.ajax({
                        url: 'movi.php',
                        success: function (php) {
                            $("#movi").html(php);
                        }
                    });
                }
            }
        });
    },100)
}
    document.body.addEventListener("click",function (e){
        if (document.getElementById("alerta").style.display=="block"){
            document.getElementById("alerta").style.display="none";
            location.reload();
        }
    })
})