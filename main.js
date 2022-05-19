window.addEventListener("DOMContentLoaded", () => {
    escuchaEventoCuentas();
    escuchaEventoOpc();
});

const llamadaApi = () => {
    var cuentas = [
        { nombre: "ISAI", saldo: 200, password: 'hola', id: 1 },
        { nombre: "JUAN", saldo: 290, password: 'hola2', id: 2 },
        { nombre: "EMMANUEL", saldo: 67, password: 'hola3', id: 3 }
    ];
    return cuentas;
}

const escuchaEventoCuentas = () => {
    const colDerecha = document.getElementById("col-derecha"); //obtenemos el elemento padre que es un div del html con un id llamado col-derecha
    const cuentas = llamadaApi();
    colDerecha.addEventListener("click", (event) => {

        //  ******** BOTONES USUARIOS ***********//

        if ((event.target.tagName === "BUTTON" && event.target.classList.contains("button1")) || (event.target.tagName === "BUTTON" && event.target.classList.contains("button2")) || (event.target.tagName === "BUTTON" && event.target.classList.contains("button3"))) { //VALIDAR

            let nombreBienvenida = document.getElementById("usuario");
            const botonOpc = document.getElementById("boton-opc").getBoundingClientRect(); // para cambiar de vista en la misma pestaña
            // console.log(botonOpc);
            var contador = 0;
            var intentos = 3;
            var contra = prompt("Ingrese su contraseña")
            //*********USUARIOS-INICIO DE SESION*******/
            for (let i = 0; i < cuentas.length; i++) {
                if (contra === cuentas[i].password) {
                    Swal.fire({
                        title: '¡Bienvenido!',
                        html: `<b> HOLA ${cuentas[i].nombre} </b>`,
                        widht: '90%'
                    });
                    nombreBienvenida.innerHTML = `¡HOLA ${cuentas[i].nombre}!`;
                    // window.scroll({
                    //     top: botonOpc.top, behavior: "smooth"
                    // })
                    localStorage.setItem("usuarioLogeado", cuentas[i].id)
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
            }

        }
    })
}

//  ******** BOTONES OPCIONES ***********//

const escuchaEventoOpc = () => {
    const cuentas = llamadaApi();
    const colOpc = document.getElementById("col-opc");

    colOpc.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON" && event.target.classList.contains("c-saldo")) {
            alert(`Su saldo es de:  $ ${cuentas[0].saldo}`)
        }

        if (event.target.tagName === "BUTTON" && event.target.classList.contains("in-monto")) {
            const idLog = localStorage.getItem("usuarioLogeado");
            let cuentaLog = {}
            for (let i = 0; i < cuentas.length; i++) {
                if (cuentas[i].id == idLog) {
                    cuentaLog = cuentas[i];
                }
            }
            console.log(cuentaLog);

            var ingreso = prompt("Digite el total de dinero a depositar");
            var saldoIngreso = parseInt(cuentaLog.saldo) + parseInt(ingreso);
            alert(`Usted tiene en cuenta un total de $${saldoIngreso}`)
            for (let i = 0; i < cuentas.length; i++) {
                if (cuentas[i].id == idLog) {
                    cuentas[i].saldo = saldoIngreso;
                }
            }
            console.log(saldoIngreso)
        }

        if (event.target.tagName === "BUTTON" && event.target.classList.contains("re-monto")) {
            var retiro = prompt("Digite el total de dinero a retirar");
            var saldoRetiro = cuentas[0].saldo - retiro;
            alert(`Usted tiene en cuenta un total de $${saldoRetiro}`)
            console.log(saldoRetiro)
        }
    })
}