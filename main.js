window.addEventListener("DOMContentLoaded", () => {
    escuchaEventoCuentas();
    escuchaEventoOpc();
    if (localStorage.getItem("usuarioLogeado") != null) {
        const inicioUsuarios = document.getElementById("inicio-usuarios");
        inicioUsuarios.classList.add("d-none")
        const operaciones = document.getElementById("operaciones");
        operaciones.classList.remove("d-none");
    }
});

const llamadaApi = () => {
    var cuentas = [
        { nombre: "ISAI", saldo: 200, password: 'hola', id: 1, boton: 'button1' },
        { nombre: "JUAN", saldo: 290, password: 'hola2', id: 2, boton: 'button2' },
        { nombre: "EMMANUEL", saldo: 67, password: 'hola3', id: 3, boton: 'button3' }
    ];
    return cuentas;
}

function buscarCuentas(claseBoton, password) {
    const cuentas = llamadaApi();
    for (let i = 0; i < cuentas.length; i++) {
        if (password == cuentas[i].password && cuentas[i].boton == claseBoton) {
            return cuentas[i];
        }
    }
    return false;
}

const escuchaEventoCuentas = () => {
    const colDerecha = document.getElementById("col-derecha"); //obtenemos el elemento padre que es un div del html con un id llamado col-derecha
    const cuentas = llamadaApi();
    colDerecha.addEventListener("click", (event) => {

        //  ******** BOTONES USUARIOS ***********//

        if ((event.target.tagName === "BUTTON" && event.target.classList.contains("button1")) || (event.target.tagName === "BUTTON" && event.target.classList.contains("button2")) || (event.target.tagName === "BUTTON" && event.target.classList.contains("button3"))) { //VALIDAR
            console.log(event.target.classList)
            var claseBoton = event.target.classList[2]

            let nombreBienvenida = document.getElementById("usuario");
            const botonOpc = document.getElementById("boton-opc").getBoundingClientRect(); // para cambiar de vista en la misma pestaña
            // console.log(botonOpc);
            var contador = 0;
            var intentos = 3;
            //*********USUARIOS-INICIO DE SESION*******/
            do {
                var contra = prompt("Ingrese su contraseña")
                let cuentaLog = buscarCuentas(claseBoton, contra)
                if (cuentaLog != false) {
                    Swal.fire({
                        title: '¡Bienvenido!',
                        html: `<b> HOLA ${cuentaLog.nombre} </b>`,
                        widht: '90%'
                    });
                    nombreBienvenida.innerHTML = `¡HOLA ${cuentaLog.nombre}!`;
                    // window.scroll({
                    //     top: botonOpc.top, behavior: "smooth"
                    // })
                    localStorage.setItem("usuarioLogeado", JSON.stringify(cuentaLog));
                    const inicioUsuarios = document.getElementById("inicio-usuarios");
                    inicioUsuarios.classList.add("d-none")
                    const operaciones = document.getElementById("operaciones");
                    operaciones.classList.remove("d-none");
                    break;
                }
                else {
                    alert(`Contraseña incorrecta, tiene ${intentos--} intentos`)
                    if (intentos === 0) {
                        alert('Su cuenta ha sido bloqueda')
                        break;
                    }
                }
            } while (contador < 3);
        }
    })
}

//  ******** BOTONES OPCIONES ***********//

const escuchaEventoOpc = () => {
    const cuentas = llamadaApi();
    const colOpc = document.getElementById("col-opc");

    //  ******** BOTON CONSULTAR SALDO ***********//

    colOpc.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON" && event.target.classList.contains("c-saldo")) {
            const cuentaLog = JSON.parse(localStorage.getItem("usuarioLogeado"));
            alert(`Su saldo es de:  $ ${cuentaLog.saldo}`)
        }


        //  ******** BOTON INGRESAR MONTO ***********//
        if (event.target.tagName === "BUTTON" && event.target.classList.contains("in-monto")) {
            const cuentaLog = JSON.parse(localStorage.getItem("usuarioLogeado"));
            console.log(cuentaLog);

            let ingreso = prompt("Digite el total de dinero a depositar");
            let saldoIngreso = parseInt(cuentaLog.saldo) + parseInt(ingreso);
            alert(`Usted tiene en cuenta un total de $${saldoIngreso}`)
            localStorage.setItem("usuarioLogeado", JSON.stringify({
                ...cuentaLog,
                saldo: saldoIngreso
            }))
        }

        //  ******** BOTON RETIRAR MONTO ***********//
        if (event.target.tagName === "BUTTON" && event.target.classList.contains("re-monto")) {
            const cuentaLog = JSON.parse(localStorage.getItem("usuarioLogeado"));
            let retiro = prompt("Digite el total de dinero a retirar");
            let saldoRetiro = parseInt(cuentaLog.saldo) - parseInt(retiro);
            alert(`Usted tiene en cuenta un total de $${saldoRetiro}`)
            localStorage.setItem("usuarioLogeado", JSON.stringify({
                ...cuentaLog,
                saldo: saldoRetiro
            }))
            console.log(saldoRetiro);
        }
    })
}

const cerrarSesion = () => {
    localStorage.clear()
    const inicioUsuarios = document.getElementById("inicio-usuarios");
    inicioUsuarios.classList.remove("d-none")
    const operaciones = document.getElementById("operaciones");
    operaciones.classList.add("d-none");
}