window.addEventListener("DOMContentLoaded", () => {
    escuchaEventoCuentas();
});

const llamadaApi = () => {
    var cuentas = [
        {nombre1: "Persona1", saldo1 : 200},
        {nombre2: "Persona2", saldo2 : 200},
        {nombre3: "Persona3", saldo3 : 200}
    ];
    return cuentas;
}

const escuchaEventoCuentas = () => {
    const colDerecha = document.getElementById("col-derecha"); //obtenemos el elemento padre que es un div del html con un id llamado col-derecha
    colDerecha.addEventListener("click", (event) =>{

        //  ******** BOTON PERSONA 2 ***********//

        if(event.target.tagName === "BUTTON" && event.target.classList.contains("button1")){
            var contador = 0;
            var intentos = 3;
            do{
                var contra = prompt("Ingrese su contraseña")
                contador++;
                if(contra != 'hola'){
                    alert(`Contraseña incorrecta, tiene ${intentos--} intentos`)
                    if(intentos === 0){
                        alert('Su cuenta ha sido bloqueda')
                    }
                }
                else if(contra == 'hola'){
                    alert("BIENVENIDO ISAI")
                    break;
                }
            }while(contador < 3);

            
                
            //decimos que cuando demos click a los botones del elemento padre col-derecha, muestra un prompt
            
        // console.log(event)
        }

        //  ******** BOTON PERSONA 1 ***********//

        if(event.target.tagName === "BUTTON" && event.target.classList.contains("button2")){
            var contador = 0;
            var intentos = 3;
            do{
                var contra = prompt("Ingrese su contraseña")
                contador++;
                if(contra != 'hola'){
                    alert(`Contraseña incorrecta, tiene ${intentos--} intentos`)
                    if(intentos === 0){
                        alert('Su cuenta ha sido bloqueda')
                    }
                }
                else if(contra == 'hola'){
                    alert('BIENVENIDO PERSONA 2')
                    break;
                }
            }while(contador < 3);
        }

        //  ******** BOTON PERSONA 3 ***********//

        if(event.target.tagName === "BUTTON" && event.target.classList.contains("button3")){
            var contador = 0;
            var intentos = 3;
            do{
                var contra = prompt("Ingrese su contraseña")
                contador++;
                if(contra != 'hola'){
                    alert(`Contraseña incorrecta, tiene ${intentos--} intentos`)
                    if(intentos === 0){
                        alert('Su cuenta ha sido bloqueda')
                    }
                }
                else if(contra == 'hola'){
                    alert('BIENVENIDO PERSONA 3')
                    break;
                }
            }while(contador < 3);
        }
        
    })
}