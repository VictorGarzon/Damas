window.addEventListener("DOMContentLoaded",function (e){

    let obsevar = new MutationObserver(function (e){
        if (modo==1) {
            modo = 0;
            let tablero=[];
            for (let casilla of document.querySelectorAll("#tablero div")) {
                if (casilla.classList.contains("fichan")){
                    if (casilla.classList.contains("corona")){
                        tablero.push(11)
                    }else {
                        tablero.push(1)
                    }
                }else if (casilla.classList.contains("fichaw")){
                    if (casilla.classList.contains("corona")){
                        tablero.push(22)
                    }else {
                        tablero.push(2)
                    }
                }else {
                    tablero.push(0)
                }
            }
            let inicial;
            let inicio;
            let fin;

            let camino = [];
            let direccion = [];
            let salto = 0;
            let ronda = 0;
            let comidasop = [];

            let casos = [];
            let comidas = [];

            let eliminadas = 0;
            let mayor;
            let dama = 1;
            let soplada = 0;
            let men_sopladas=null;

            let ju1 = [0];
            let ju2 = [0];
            let jugador = ju1;

            let ft = "fichan";
            let nft = "fichaw";
            let activo = ft;

            let posibilidades = document.getElementsByClassName("posibilidad");
            let caminos = document.getElementsByClassName("camino");

            soplar();
            document.getElementById('soplar').addEventListener('click', function (e) {
                if (ronda == 0) {
                    if (soplada == 1) {
                        if (comidasop.length == 1) {
                            document.getElementById(comidasop[0]).classList.remove(nft);
                            document.getElementById(comidasop[0]).classList.remove('corona');
                            men_sopladas=comidasop[0];
                        } else {
                            for (let elegir of comidasop) {
                                document.getElementById(elegir).classList.add('elegir');
                            }
                        }
                        soplar();
                        tablero=[];
                        for (let casilla of document.querySelectorAll("#tablero div")) {
                            if (casilla.classList.contains("fichan")){
                                if (casilla.classList.contains("corona")){
                                    tablero.push(11)
                                }else {
                                    tablero.push(1)
                                }
                            }else if (casilla.classList.contains("fichaw")){
                                if (casilla.classList.contains("corona")){
                                    tablero.push(22)
                                }else {
                                    tablero.push(2)
                                }
                            }else {
                                tablero.push(0)
                            }
                        }
                    } else {
                        jugador[0]++;
                    }
                    eliminarposcam();
                }
                document.getElementById('soplar').disabled = true;
            })

            for (let casilla of document.querySelectorAll("#tablero div")) {
                casilla.addEventListener("click", function (e) {
                    if (e.target.classList.contains("posibilidad") == false && ronda == 0) {
                        eliminarposcam();
                        salto = 0;
                    }
                    if (document.getElementsByClassName('elegir').length == 0) {
                        if (e.target.classList.contains(ft) == false && e.target.classList.contains(nft) == false && e.target.classList.contains("posibilidad")) {
                            fin = e.target;
                            if (ronda == 0) {
                                soplada = 0;

                                let tablero2=[];
                                for (let casilla of document.querySelectorAll("#tablero div")) {
                                    if (casilla.classList.contains("fichan")){
                                        if (casilla.classList.contains("corona")){
                                            tablero2.push(11)
                                        }else {
                                            tablero2.push(1)
                                        }
                                    }else if (casilla.classList.contains("fichaw")){
                                        if (casilla.classList.contains("corona")){
                                            tablero2.push(22)
                                        }else {
                                            tablero2.push(2)
                                        }
                                    }else {
                                        tablero2.push(0)
                                    }
                                }
                                if (tablero.toString()!=tablero2.toString()){
                                    location.reload();
                                }

                            }
                            if (ronda == 0 && mayor > 0) {
                                if (dama == 1 && inicio.classList.contains('corona') == false) {
                                    soplada = 1;
                                } else {
                                    let casosm = casos.slice()
                                    let comidasm = comidas.slice()
                                    for (let i = 0; i < casosm.length; i++) {
                                        if (casosm[i][0] != inicio.id) {
                                            casosm.splice(i, 1,);
                                            comidasm.splice(i, 1,);
                                            --i;
                                        }
                                    }
                                    if (comidasm.length == 0) {
                                        soplada = 1;
                                    } else {
                                        mayor = comidasm[0].length;

                                        for (let i = 1; i < casosm.length; i++) {
                                            if (comidasm[i].length > mayor) {
                                                mayor = comidasm[i].length
                                            }
                                        }
                                        mayor--;
                                        if (mayor == 0) {
                                            soplada = 1;
                                        }
                                    }
                                }
                            }
                            if (ronda==0){
                                inicial=inicio;
                            }
                            ronda = 1;
                            document.getElementById('soplar').disabled = true;

                            if (inicio.classList.contains("corona")) {
                                inicio.classList.remove('corona')
                                fin.classList.add('corona')

                                if (camino.indexOf(fin.id) != -1) {
                                    let posicion = fin;
                                    while ( posicion!=null && inicio.id != posicion.id) {
                                        if ((Math.sign(direccion[camino.indexOf(posicion.id)]) == 1 && direccion[camino.indexOf(posicion.id)] > 12) || (Math.sign(direccion[camino.indexOf(posicion.id)]) == -1 && direccion[camino.indexOf(posicion.id)] < -12)) {
                                            document.getElementById(posicion.id - (direccion[camino.indexOf(posicion.id)] / 2)).classList.remove(nft);
                                            document.getElementById(posicion.id - (direccion[camino.indexOf(posicion.id)] / 2)).classList.remove("corona");
                                            eliminadas++;
                                            posicion = document.getElementById(parseInt(posicion.id) - direccion[camino.indexOf(posicion.id)])
                                        } else {
                                            posicion = document.getElementById(parseInt(posicion.id) - direccion[camino.indexOf(posicion.id)])
                                        }
                                    }
                                } else {
                                    ronda = 0;
                                }
                            } else {
                                if (camino.indexOf(fin.id) != -1) {
                                    document.getElementById(fin.id - direccion[camino.indexOf(fin.id)]).classList.remove(nft)
                                    document.getElementById(fin.id - direccion[camino.indexOf(fin.id)]).classList.remove("corona");
                                    eliminadas++;
                                } else {
                                    ronda = 0;
                                }
                            }


                            inicio.classList.remove(ft)
                            fin.classList.add(ft)

                            activo = null;
                            salto = 0;
                            eliminarposcam();

                            if (ronda == 1) {
                                inicio = fin;

                                escanear(inicio, 0)
                            }

                            if (salto == 0) {
                                eliminarposcam();
                                if (fin.id.substring(0, 1) == 8) {
                                    fin.classList.add("corona")
                                }

                                comidasop = [];
                                if (soplada == 0) {
                                    if (mayor > eliminadas) {
                                        soplada = 1;
                                        comidasop.push(fin.id)
                                    }
                                } else {
                                    for (let i = 0; i < casos.length; i++) {
                                        if (casos[i].length > 1) {
                                            if (comidasop.indexOf(casos[i][0]) == -1) {
                                                comidasop.push(casos[i][0])
                                            }
                                        }
                                    }
                                }

                                for (let i = 0; i < comidasop.length; i++) {
                                    let nu1 = comidasop[i].substr(0, 1)
                                    let nu2 = comidasop[i].substr(1, 1)
                                    nu1 = Math.abs(parseInt(nu1) - 9).toString()
                                    nu2 = Math.abs(parseInt(nu2) - 9).toString()
                                    comidasop.splice(i, 1, nu1 + nu2)
                                }
                                activo = nft;
                                if (men_sopladas!=null){
                                    men_sopladas=" Soplada: "+men_sopladas;
                                }else {
                                    men_sopladas='';
                                }
                                if (document.getElementById('tablero').classList.contains("girar")) {
                                    let i3 = 1;
                                    for (let i = 8; i > 0; i--) {
                                        let i4 = 1;
                                        for (let i2 = 8; i2 > 0; i2--) {
                                            document.getElementById('' + i + i2 + '').id = '' + i3 + i4 + '';
                                            i4++;
                                        }
                                        i3++;
                                    }
                                    document.getElementById('movi').innerHTML += '<p>Blancas: ' + inicial.id + '-->' + fin.id + ' Elininadas:'+eliminadas+men_sopladas+'</p>';
                                    ft = "fichan";
                                    nft = "fichaw";
                                    if (document.getElementsByClassName(ft).length == 0) {
                                        setTimeout(function () {
                                            document.getElementById("alerta").style.display="block";
                                            document.getElementById("alerta").textContent='blanco gana';
                                            
                                        }, 100);
                                    }
                                    document.querySelector("#turn p").innerHTML = "NEGRAS";
                                    jugador = ju1;
                                } else {
                                    document.getElementById('movi').innerHTML += '<p>Negras: ' + inicial.id + '-->' + fin.id + ' Elininadas:'+eliminadas+men_sopladas+'</p>';
                                    let i3 = 8;
                                    for (let i = 1; i < 9; i++) {
                                        let i4 = 8;
                                        for (let i2 = 1; i2 < 9; i2++) {
                                            document.getElementById('' + i + i2 + '').id = '' + i3 + i4 + '';
                                            i4--;
                                        }
                                        i3--;
                                    }
                                    ft = "fichaw";
                                    nft = "fichan";

                                    if (document.getElementsByClassName(ft).length == 0) {
                                        if (document.getElementsByClassName(ft).length == 0) {
                                            setTimeout(function () {
                                                document.getElementById("alerta").style.display="block";
                                                document.getElementById("alerta").textContent='negro gana';
                                            }, 100);
                                        }
                                    }
                                    document.querySelector("#turn p").textContent = "BLANCAS"
                                    jugador = ju2;
                                }
                                men_sopladas=null;
                                document.getElementById("tablero").classList.toggle("girar");
                                ronda = 0;
                                eliminadas = 0;
                                if (jugador[0] == 0) {
                                    document.getElementById('soplar').disabled = false;
                                } else {
                                    jugador[0]++;
                                    if (jugador[0] == 5) {
                                        jugador[0] = 0;
                                        document.getElementById('soplar').disabled = false;
                                    }
                                }
                                tablero=[];
                                for (let casilla of document.querySelectorAll("#tablero div")) {
                                    if (casilla.classList.contains("fichan")){
                                        if (casilla.classList.contains("corona")){
                                            tablero.push(11)
                                        }else {
                                            tablero.push(1)
                                        }
                                    }else if (casilla.classList.contains("fichaw")){
                                        if (casilla.classList.contains("corona")){
                                            tablero.push(22)
                                        }else {
                                            tablero.push(2)
                                        }
                                    }else {
                                        tablero.push(0)
                                    }
                                }
                                if (document.getElementsByClassName(ft).length != 0) {
                                    soplar();
                                }
                            }

                        }
                        if (e.target.classList.contains(ft) && activo == ft /* e.target.classList.contains("activo")*/) {
                            inicio = e.target
                            escanear(inicio, 0)
                        }

                    } else {
                        if (e.target.classList.contains("elegir")) {
                            e.target.classList.remove(nft);
                            men_sopladas=e.target.id;
                            while (document.getElementsByClassName('elegir').length) {
                                document.getElementsByClassName('elegir')[0].classList.remove("elegir");
                            }
                            soplar();
                            tablero=[];
                            for (let casilla of document.querySelectorAll("#tablero div")) {
                                if (casilla.classList.contains("fichan")){
                                    if (casilla.classList.contains("corona")){
                                        tablero.push(11)
                                    }else {
                                        tablero.push(1)
                                    }
                                }else if (casilla.classList.contains("fichaw")){
                                    if (casilla.classList.contains("corona")){
                                        tablero.push(22)
                                    }else {
                                        tablero.push(2)
                                    }
                                }else {
                                    tablero.push(0)
                                }
                            }
                        }
                    }
                })
            }

            function eliminarposcam() {
                while (posibilidades.length) {
                    posibilidades[0].classList.remove("posibilidad");
                }

                while (caminos.length) {
                    caminos[0].classList.remove("camino");
                }
            }


            function escanear(posicionI, dire) {
                camino = [posicionI.id];
                direccion = [dire];
                if (posicionI.classList.contains("corona")) {
                    let nums = [9, 11, -9, -11];
                    for (let num of nums) {
                        salto = 0;
                        let siguiente = document.getElementById(parseInt(posicionI.id) + num);
                        while (siguiente != null && siguiente.classList.contains(ft) == false) {
                            if (siguiente.classList.contains(nft)) {
                                let siguiente2 = document.getElementById(parseInt(siguiente.id) + num);
                                if (siguiente2 != null && siguiente2.classList.contains(ft) == false && siguiente2.classList.contains(nft) == false) {
                                    siguiente2.classList.add('posibilidad')
                                    camino.push(siguiente2.id)
                                    direccion.push(num * 2)
                                    salto = 1;
                                    siguiente = siguiente2
                                    if (ronda == 1) {
                                        let cami = document.getElementById(siguiente.id - direccion[camino.indexOf(siguiente.id)])
                                        while (camino.indexOf(cami.id) == -1) {
                                            cami.classList.add('camino')
                                            camino.push(cami.id)
                                            direccion.push(num)
                                            cami = document.getElementById(cami.id - direccion[camino.indexOf(cami.id)])
                                        }
                                    }
                                } else {
                                    siguiente = null;
                                }
                            } else {
                                if (ronda == 0 || salto == 1) {
                                    siguiente.classList.add('posibilidad')
                                    if (salto == 1) {
                                        camino.push(siguiente.id)
                                        direccion.push(num)
                                    }
                                }
                                siguiente = document.getElementById(parseInt(siguiente.id) + num);
                            }
                        }
                    }
                    if (camino.length > 1) {
                        salto = 1;
                    }
                } else {
                    let nums = [9, 11];
                    for (let num of nums) {
                        let siguiente = document.getElementById(parseInt(posicionI.id) + num);
                        if (siguiente != null && siguiente.classList.contains(ft) == false) {
                            if (siguiente.classList.contains(nft)) {
                                let siguiente2 = document.getElementById(parseInt(siguiente.id) + num);
                                if (siguiente2 != null && siguiente2.classList.contains(ft) == false && siguiente2.classList.contains(nft) == false) {
                                    siguiente2.classList.add('posibilidad')
                                    camino.push(siguiente2.id)
                                    direccion.push(num)
                                    salto = 1;
                                }
                            } else {
                                if (ronda == 0) {
                                    siguiente.classList.add('posibilidad')
                                }
                            }
                        }
                    }
                }
            }

            function soplar() {
                casos = [];
                comidas = [];
                dama = 1;
                for (let aliadacorona of document.getElementsByClassName(ft + ' corona')) {
                    let caso = [aliadacorona.id];
                    let comida = [aliadacorona.id];
                    soplardama(caso, comida, -1, 0)
                }
                if (casos.length == 0) {
                    mayor = 0;
                } else {
                    mayor = comidas[0].length;

                    for (let i = 1; i < casos.length; i++) {
                        if (comidas[i].length > mayor) {
                            mayor = comidas[i].length
                        }
                    }
                    mayor--;
                }
                if (mayor == 0) {
                    dama = 0;
                    for (let aliada of document.getElementsByClassName(ft)) {
                        if (aliada.classList.contains('corona') == false) {
                            let caso = [aliada.id];
                            let comida = [0];
                            soplarficha(caso, comida, -1)
                        }
                    }
                }

                for (let i = 0; i < casos.length; i++) {
                    for (let j = 0; j < casos.length; j++) {
                        if (i != j) {
                            if (casos[i].toString() == casos[j].toString()) {
                                casos.splice(j, 1,);
                                comidas.splice(j, 1,);
                                j--;
                            }
                        }
                    }
                }
                if (comidas.length == 0 ) {
                    setTimeout(function () {
                        document.getElementById("alerta").style.display="block";
                        document.getElementById("alerta").textContent='tablas';
                        
                    }, 100);
                } else {
                    mayor = comidas[0].length;

                    for (let i = 1; i < casos.length; i++) {
                        if (comidas[i].length > mayor) {
                            mayor = comidas[i].length
                        }
                    }
                    mayor--;
                }

            }

            function soplarficha(caso, comida, ini) {
                for (let i = ini + 1; i < caso.length; i++) {
                    let nums = [9, 11];
                    for (let num of nums) {
                        let siguiente = document.getElementById(parseInt(caso[i]) + num);
                        if (siguiente != null && siguiente.classList.contains(ft) == false) {
                            if (siguiente.classList.contains(nft)) {
                                let siguiente2 = document.getElementById(parseInt(siguiente.id) + num);
                                if (siguiente2 != null && siguiente2.classList.contains(ft) == false && siguiente2.classList.contains(nft) == false) {
                                    let cas = caso.slice();
                                    cas.push(siguiente2.id)
                                    let com = comida.slice();
                                    com.push(siguiente2.id - num)
                                    soplarficha(cas, com, i)
                                } else {
                                    if (i != 0) {
                                        casos.push(caso.slice())
                                        comidas.push(comida.slice())
                                    }
                                }
                            } else {
                                casos.push(caso.slice())
                                comidas.push(comida.slice())
                            }
                        } else {
                            if (i != 0) {
                                casos.push(caso.slice())
                                comidas.push(comida.slice())
                            }
                        }
                    }
                }
            }

            function soplardama(caso, comida, ini, sosalto) {
                for (let i = ini + 1; i < caso.length; i++) {
                    let nums = [9, 11, -9, -11];
                    let comidaante = comida.slice();
                    for (let num of nums) {
                        sosalto = 0;
                        let siguiente = document.getElementById(parseInt(caso[i]) + num);
                        while (siguiente != null && (siguiente.classList.contains(ft) == false || (siguiente.classList.contains(ft) && comida.indexOf(siguiente.id) != -1))) {
                            if (siguiente.classList.contains(nft) && comida.indexOf(siguiente.id) == -1) {
                                let siguiente2 = document.getElementById(parseInt(siguiente.id) + num);
                                if (siguiente2 != null && (siguiente2.classList.contains(ft) == false || (siguiente2.classList.contains(ft) && comida.indexOf(siguiente.id) != -1)) && (siguiente2.classList.contains(nft) == false || (siguiente2.classList.contains(nft) && comida.indexOf(siguiente.id) != -1))) {

                                    let cas = caso.slice();
                                    cas.push(siguiente2.id)
                                    let com = comida.slice();
                                    com.push((siguiente2.id - num).toString())

                                    sosalto = 1;
                                    soplardama(cas, com, i, sosalto)
                                    comida.push((siguiente2.id - num).toString())

                                    siguiente = siguiente2
                                } else {
                                    siguiente = null;
                                }
                            } else {
                                if (caso.length > 0 && sosalto == 1) {
                                    let cas = caso.slice();
                                    cas.push(siguiente.id)
                                    let com = comida.slice();
                                    soplardama(cas, com, i, sosalto)
                                }
                            }
                            if (siguiente != null) {
                                if (sosalto==0) {
                                    if ((siguiente.classList.contains(ft) == false || (siguiente.classList.contains(ft) && comida.indexOf(siguiente.id) != -1))) {
                                        casos.push(caso.slice())
                                        comidas.push(comida.slice())
                                    }
                                }
                                siguiente = document.getElementById(parseInt(siguiente.id) + num);
                            }
                        }

                        if (sosalto == 1 ) {
                            casos.push(caso.slice())
                            comidas.push(comida.slice())
                        }
                        comida = comidaante.slice();
                    }
                    if (caso.length > 1) {
                        sosalto = 1;
                    }
                }
            }
        }
    });
    obsevar.observe(document.getElementById('centro'),{
        childList: true,
    });


    document.getElementById('centro').innerHTML="<h1> Solitario</h1><section id=\"tablero\">\n" +
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
        "            <button id=\"soplar\" >Soplar</button>  &nbsp; <button onclick=\"location.reload()\">Reiniciar</button>\n" +
        "        </div>\n" +
        "        <div id=\"movi\">\n" +
        "        </div>\n" +
        "        <div id=\"chat\">\n" +
        "        </div>\n" +
        "    </section>"
})
