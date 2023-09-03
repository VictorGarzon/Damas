window.addEventListener("DOMContentLoaded",function (e){

    let phpante=0;
    let empate= setInterval(function (e) {
        if (document.getElementById('tablas')!=null) {
            $.ajax({
                url: 'empate.php',
                success: function (php) {
                    if (php != phpante) {
                        phpante=php;
                        if (php == 0) {
                            document.getElementById('tablas').textContent = "Empate(0/2)";
                        } else if (php == 1) {
                            document.getElementById('tablas').textContent = "Empate(1/2)";
                        } else if (php == 2) {
                            document.getElementById('tablas').textContent = "Empate(2/2)";
                            let tablero = [];
                            for (let casilla of document.querySelectorAll("#tablero div")) {
                                if (casilla.classList.contains("fichan")) {
                                    if (casilla.classList.contains("corona")) {
                                        tablero.push(11)
                                    } else {
                                        tablero.push(1)
                                    }
                                } else if (casilla.classList.contains("fichaw")) {
                                    if (casilla.classList.contains("corona")) {
                                        tablero.push(22)
                                    } else {
                                        tablero.push(2)
                                    }
                                } else {
                                    tablero.push(0)
                                }
                            }
                            let enviar = {"tablero": tablero.toString(), "mensaje": "Tablas"};
                            $.ajax({
                                data: enviar,
                                url: 'tablas.php',
                                type: 'post',
                            });
                        }
                    }
                }
            });
        }
    }, 100)

    let num=0;
    let obsevar = new MutationObserver(function (mutations){
        if (mutations[0].target.id=='centro'){
            num=0;
        }
        if (num==0) {
            let menante=0
            setInterval(function (e){
                if (document.querySelector("#chat div")!=null) {
                    $.ajax({
                        url: 'car_men_par.php',
                        success: function (php) {
                            if (menante!=php){
                                menante=php;
                                document.querySelector('#chat div').innerHTML=php;
                            }
                        }
                    });
                        let men = new MutationObserver(function (e) {
                            document.querySelector('#chat div').scrollTop = document.querySelector('#chat div').scrollHeight;
                            men.disconnect();
                        });
                        men.observe(document.querySelector('#chat div'), {
                            childList: true,
                        });
                    }
            },100)

            if (document.querySelector("#chat button")!=null) {

                document.querySelector("#chat button").addEventListener("click", function (e) {
                    e.preventDefault()
                    if (document.querySelector("#chat input").value.length!=0) {
                        let resul = {"mensaje": document.querySelector("#chat input").value};
                        $.ajax({
                            data: resul,
                            url: 'en_men_par.php',
                            type: 'post',
                        });
                        document.querySelector("#chat input").value = "";
                    }
                })
            }

            if (document.getElementById('tablas') != null) {
                document.getElementById('tablas').addEventListener("click", function (e) {
                    $.ajax({
                        url: 'enempate.php',
                    });
                })
            }
            num++;
        }
        if (document.getElementById('rendirse')!=null) {
            document.getElementById('rendirse').addEventListener("click", function (e) {
                modo = 2;
                let resul = {"resultado": 2};
                $.ajax({
                    data: resul,
                    url: 'resultado.php',
                    type: 'post',
                });
                let tablero = [];
                for (let casilla of document.querySelectorAll("#tablero div")) {
                    if (casilla.classList.contains("fichan")) {
                        if (casilla.classList.contains("corona")) {
                            tablero.push(11)
                        } else {
                            tablero.push(1)
                        }
                    } else if (casilla.classList.contains("fichaw")) {
                        if (casilla.classList.contains("corona")) {
                            tablero.push(22)
                        } else {
                            tablero.push(2)
                        }
                    } else {
                        tablero.push(0)
                    }
                }
                let color="Negro";
                if (document.getElementById('tablero').classList.contains('girar')){
                    color="Blanco"
                }

                let enviar = {"tablero": tablero.toString(), "mensaje": "Rendicion de "+color};
                $.ajax({
                    data: enviar,
                    url: 'tablas.php',
                    type: 'post',
                });
            })
        }
    if (modo==2) {
        modo = 0;
        $.ajax({
            url: 'vre.php',
            success: function (php) {
                if (php.length!=0){
                    document.getElementById('soplar').disabled = true;
                    document.getElementById('rendirse').disabled = true;
                    document.getElementById('tablas').disabled = true;
                    document.getElementById("alerta").style.display="block";
                    document.getElementById("alerta").textContent=php;
                    document.querySelector("#turn p").innerHTML = "";
                }else {
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
        let men_sopladas=0;

        let ju1 = [0];
        let ju2 = [0];
        let jugador;

        let ft = "fichan";
        let nft = "fichaw";
        let activo = ft;

        let posibilidades = document.getElementsByClassName("posibilidad");
        let caminos = document.getElementsByClassName("camino");
        $.ajax({
            url: 'soplar.php',
            success: function (php) {
                if (php.length!=0){
                    let soplar = php.split(':');
                    if (soplar[0]!=0){
                        soplada=1;
                        if (soplar[0].includes(',')){
                            let arco = soplar[0].split(',');
                            comidasop = arco;
                        }else {
                            comidasop.push(soplar[0]);
                        }
                    }
                    jugador=soplar[1];
                }
            }
        });

        if (document.getElementById('tablero').classList.contains('girar')){
            ft = "fichaw";
            nft = "fichan";
            activo=ft;
        }
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
        document.getElementById('soplar').disabled = true;

        if (jugador == 0) {
            document.getElementById('soplar').disabled = false;
        } else {
            jugador++;
            if (jugador == 5) {
                jugador = 0;
                document.getElementById('soplar').disabled = false;
            }
        }

        let inju= setInterval(function (e) {
            if (jugador!=undefined) {
                if (jugador == 0) {
                    document.getElementById('soplar').disabled = false;
                } else {
                    jugador++;
                    if (jugador == 5) {
                        jugador = 0;
                        document.getElementById('soplar').disabled = false;
                    }
                }
                clearInterval(inju);
            }
        },100);

        if (ft=="fichan"){
            document.querySelector("#turn p").innerHTML = "NEGRAS";
        }else {
            document.querySelector("#turn p").innerHTML = "BLANCAS";
        }

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
                    jugador++;
                }
                eliminarposcam();
            }
            document.getElementById('soplar').disabled = true;
        })

        for (let casilla of document.querySelectorAll("#tablero div")) {
            casilla.addEventListener("click", function (e) {
                if (activo != 1){
                    if (e.target.classList.contains("posibilidad") == false && ronda == 0) {
                        eliminarposcam();
                        salto = 0;
                    }
                if (document.getElementsByClassName('elegir').length == 0) {
                    if (e.target.classList.contains(ft) == false && e.target.classList.contains(nft) == false && e.target.classList.contains("posibilidad")) {
                        fin = e.target;
                        if (ronda == 0) {
                            soplada = 0;

                            let tablero2 = [];
                            for (let casilla of document.querySelectorAll("#tablero div")) {
                                if (casilla.classList.contains("fichan")) {
                                    if (casilla.classList.contains("corona")) {
                                        tablero2.push(11)
                                    } else {
                                        tablero2.push(1)
                                    }
                                } else if (casilla.classList.contains("fichaw")) {
                                    if (casilla.classList.contains("corona")) {
                                        tablero2.push(22)
                                    } else {
                                        tablero2.push(2)
                                    }
                                } else {
                                    tablero2.push(0)
                                }
                            }
                            if (tablero.toString() != tablero2.toString()) {
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
                        if (ronda == 0) {
                            inicial = inicio;
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
                                document.getElementById(fin.id - direccion[camino.indexOf(fin.id)]).classList.remove(nft);
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
                            activo=1;

                            if (men_sopladas != 0) {
                                men_sopladas = " Soplada: " + men_sopladas;
                            } else {
                                men_sopladas = '';
                            }


                            tablero = [];
                            for (let casilla of document.querySelectorAll("#tablero div")) {
                                if (casilla.classList.contains("fichan")) {
                                    if (casilla.classList.contains("corona")) {
                                        tablero.push(11)
                                    } else {
                                        tablero.push(1)
                                    }
                                } else if (casilla.classList.contains("fichaw")) {
                                    if (casilla.classList.contains("corona")) {
                                        tablero.push(22)
                                    } else {
                                        tablero.push(2)
                                    }
                                } else {
                                    tablero.push(0)
                                }
                            }
                            if (document.getElementById('tablero').classList.contains('girar')) {
                                tablero.reverse();
                            }
                            let turno;
                            if (ft == "fichan") {
                                turno = "Negras";
                                document.querySelector("#turn p").innerHTML = "BLANCAS";
                            } else {
                                turno = "Blancas";
                                document.querySelector("#turn p").innerHTML = "NEGRAS";
                            }

                            let mensop;
                            if (comidasop.length == 0) {
                                mensop = 0;
                            } else {
                                mensop = comidasop.toString();
                            }

                            if (document.getElementById('tablero').classList.contains('girar')) {
                                inicial = 99 - inicial.id;
                                fin = 99 - fin.id;
                                tablero.reverse();
                            } else {
                                inicial = inicial.id;
                                fin = fin.id;
                            }
                            let ganar=0;
                            let men_ga="";
                            if (document.getElementsByClassName(nft).length == 0) {
                                let resul = {"resultado": 1};
                                $.ajax({
                                    data: resul,
                                    url: 'resultado.php',
                                    type: 'post',
                                });
                                ganar=1;
                                modo=2;
                                if (ft=="fichan"){
                                    men_ga=" Gana Negro";
                                }else {
                                    men_ga=" Gana Blanco";
                                }
                                document.querySelector("#turn p").innerHTML = "";
                            }
                            let tur;
                            if (ft=="fichan"){
                                tur=1;
                            }else if (ft=="fichaw"){
                                tur=2;
                            }
                            let mensaje = turno + ': ' + inicial + '-->' + fin + ' Elininadas:' + eliminadas + men_sopladas+ men_ga ;
                            document.getElementById('movi').innerHTML += '<p>' + mensaje + '</p>';
                            let envio = {"tablero": tablero.toString(), "movi": mensaje,"turno":tur, "soplar": mensop,"socon":jugador,"ganar":ganar};
                            $.ajax({
                                data: envio,
                                url: 'mover.php',
                                type: 'post',
                            });
                        }
                    }
                    if (e.target.classList.contains(ft) && activo == ft) {
                        inicio = e.target
                        escanear(inicio, 0)
                    }

                } else {
                    if (e.target.classList.contains("elegir")) {
                        e.target.classList.remove(nft);
                        men_sopladas = e.target.id;
                        while (document.getElementsByClassName('elegir').length) {
                            document.getElementsByClassName('elegir')[0].classList.remove("elegir");
                        }
                        soplar();
                        tablero = [];
                        for (let casilla of document.querySelectorAll("#tablero div")) {
                            if (casilla.classList.contains("fichan")) {
                                if (casilla.classList.contains("corona")) {
                                    tablero.push(11)
                                } else {
                                    tablero.push(1)
                                }
                            } else if (casilla.classList.contains("fichaw")) {
                                if (casilla.classList.contains("corona")) {
                                    tablero.push(22)
                                } else {
                                    tablero.push(2)
                                }
                            } else {
                                tablero.push(0)
                            }
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
            if (comidas.length == 0) {

                let resultado={"resultado":0};
                $.ajax({
                    data: resultado,
                    url: 'resultado.php',
                    type: 'post',
                });
                if (document.getElementById('tablero').classList.contains('girar')) {
                    tablero.reverse();
                }
                let enviar={"tablero":tablero.toString(),"mensaje":"Tablas"};
                $.ajax({
                    data: enviar,
                    url: 'tablas.php',
                    type: 'post',
                });
                modo=2;
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
                    if (i != 0) {
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
            }
        });
    }
});
obsevar.observe(document.getElementById('centro'),{
    childList: true,
    subtree:true,
    characterData:true,
    characterDataOldValue: true

});
})