window.addEventListener("DOMContentLoaded",function (e){
    if (document.getElementById('bini')!=null) {
        document.getElementById('bini').addEventListener("click", function (e) {
            document.getElementById('iniciar').style.display = "block";
        })
        document.getElementById('iniciar').addEventListener("click", function (e) {
            if (e.target == document.getElementById('iniciar')) {
                document.getElementById('iniciar').style.display = "none";
            }
        })
        document.querySelector('#iniciar button').addEventListener("click", function (e) {
            if (document.getElementById('iusuario').value.length == 0 || document.getElementById('ipassword').value.length == 0) {
                e.preventDefault();
                document.querySelector('#iniciar p').innerHTML = 'Campos no completados';
            }
        })
        if (document.getElementById('bregi') != null) {
            document.getElementById('bregi').addEventListener("click", function (e) {
                document.getElementById('registro').style.display = "block";
            })

            document.getElementById('registro').addEventListener("click", function (e) {
                if (e.target == document.getElementById('registro')) {
                    document.getElementById('registro').style.display = "none";
                }
            })

            document.querySelector('#registro button').addEventListener("click", function (e) {
                if (document.getElementById('rusuario').value.length > 20) {
                    e.preventDefault();
                    document.querySelector('#registro p').innerHTML = 'nombre de 20 caracteres';
                }else
                if (document.getElementById('rusuario').value.length == 0 || document.getElementById('rpassword').value.length == 0 || document.getElementById('rpasswordr').value.length == 0) {
                    e.preventDefault();
                    document.querySelector('#registro p').innerHTML = 'Campos no completados';
                }else
                if (document.getElementById('rpassword').value != document.getElementById('rpasswordr').value) {
                    e.preventDefault();
                    document.querySelector('#registro p').innerHTML = 'Contrseñas diferenetes';
                }
            })

            if (mensaje.length != 0) {
                if (pa == 1) {
                    document.querySelector('#iniciar p').innerHTML = mensaje;
                    document.getElementById('iniciar').style.display = "block";
                }
                if (pa == 2) {
                    document.querySelector('#registro p').innerHTML = mensaje;
                    document.getElementById('registro').style.display = "block";
                }
            }
        }
    }
})