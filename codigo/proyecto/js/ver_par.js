window.addEventListener("DOMContentLoaded",function (e){
    document.getElementById('vpar').addEventListener('click',function (e){
        document.getElementById('verpar').style.display="block";
        let phpante;
        let carpar=setInterval(function (e){
            if (document.getElementById('verpar').style.display == "none"){
                clearInterval(carpar)
            }else {
                $.ajax({
                    url: 'ver_par.php',
                    success: function (php) {
                        if (php.length!=0) {
                            if (phpante != php) {
                                phpante = php;
                                document.querySelector("#verpar div div").innerHTML = php;
                            }
                        }else {
                            document.querySelector("#verpar div div").innerHTML = "<p>Sin partidas</p>";
                        }
                    }
                });
            }
        },100)
    });
    document.getElementById('verpar').addEventListener("click", function (e) {
        if (e.target == document.getElementById('verpar')) {
            document.getElementById('verpar').style.display = "none";
        }else {
            for (let partida of document.querySelectorAll("#verpar div div div p:first-child")) {
                if (e.target == partida){
                    let titulo=e.target.nextSibling.textContent.split('vs');
                    document.getElementById('verpar').style.display = "none";
                    let enviar={"usu1":titulo[0],"usu2":titulo[1],"partida":e.target.parentNode.lastChild.textContent}
                    $.ajax({
                        data: enviar,
                        url: 'car_ver_par.php',
                        type: 'post',
                        success: function (php) {
                            if (php!=0){
                                let arphp = php.split(';');
                                document.getElementById('centro').innerHTML = "<h1>"+arphp[0]+"</h1> <section id=\"tablero\">\n" +
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
                                    "            <button id=\"giro\" >Girar</button><button id=\"retroceder\" disabled><<</button><button id=\"adelantar\">>></button>\n" +
                                    "        </div>\n" +
                                    "        <div id=\"movi\">\n" +
                                    "        </div>\n" +
                                    "        <div id=\"chat\"><div></div>" +
                                    "        </div>\n" +
                                    "    </section>"

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
                                document.getElementById('movi').innerHTML=arphp[2];
                                document.querySelector('#chat div').innerHTML=arphp[3];
                            }else {
                                location.reload();
                            }
                        }
                    });
                }
            }
        }
    })
    let obsevar = new MutationObserver(function (mutations){
        if (document.getElementById("giro")!=null) {
            document.getElementById("giro").addEventListener("click", function (e) {
                document.getElementById("tablero").classList.toggle("girar")
            })
            document.getElementById("retroceder").addEventListener("click", function (e) {
                reproducir(-1)
            })
            document.getElementById("adelantar").addEventListener("click", function (e) {
                reproducir(1)
            })
            function reproducir(movi){
                let enviar={"movi":movi}
                $.ajax({
                    data: enviar,
                    url: 'reproducir.php',
                    type: 'post',
                    success: function (php) {
                        if (php != 0) {
                            let arphp = php.split(';');
                            while (document.getElementsByClassName('fichan').length) {
                                document.getElementsByClassName('fichan')[0].classList.remove("fichan");
                            }
                            while (document.getElementsByClassName('fichaw').length) {
                                document.getElementsByClassName('fichaw')[0].classList.remove("fichaw");
                            }

                            while (document.getElementsByClassName('corona').length) {
                                document.getElementsByClassName('corona')[0].classList.remove("corona");
                            }
                            let tab = arphp[0].split(',');

                            let i3 = 0;
                            for (let i = 8; i > 0; i--) {
                                for (let i2 = 1; i2 <= 8; i2++) {
                                    if (tab[i3] == 1) {
                                        document.getElementById('' + i + i2 + '').classList.add("fichan")
                                    } else if (tab[i3] == 11) {
                                        document.getElementById('' + i + i2 + '').classList.add("fichan")
                                        document.getElementById('' + i + i2 + '').classList.add("corona")
                                    } else if (tab[i3] == 2) {
                                        document.getElementById('' + i + i2 + '').classList.add("fichaw")
                                    } else if (tab[i3] == 22) {
                                        document.getElementById('' + i + i2 + '').classList.add("fichaw")
                                        document.getElementById('' + i + i2 + '').classList.add("corona")
                                    }
                                    i3++;
                                }
                            }
                            for (let movimi of document.querySelectorAll("#movi p")) {
                                movimi.classList.remove("rojo")
                            }
                            document.getElementById("retroceder").disabled=false;
                            document.getElementById("adelantar").disabled=false;
                            if (document.querySelectorAll("#movi p").length==arphp[1]){
                                document.getElementById("adelantar").disabled=true;
                            }
                            if (document.querySelectorAll("#movi p")[parseInt(arphp[1]) -1]!=null) {
                                document.querySelectorAll("#movi p")[parseInt(arphp[1]) - 1].classList.add("rojo")
                            }else{
                                document.getElementById("retroceder").disabled=true;
                            }
                        }
                    }
                })
            }
        }
    })
    obsevar.observe(document.getElementById('centro'),{
        childList: true,
    });
})