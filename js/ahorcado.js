var btnIniciarJuego = document.querySelector("#iniciar-juego");
var btnNuevaPalabra = document.querySelector("#nueva-palabra");
var etiquetaLetrasError = document.querySelector("#etiquetaLetrasErr");

var palabraSecreta = "";
var letrasError = [];
var letrasAcertadas = [];
var listaPalabras = ["ALURA","ORACLE","DESARROLLO", "CURSO","EXCELENTE","GENIAL","NARANJA","BIEN",
"AGRADABLE","MAGIA","ONLINE","LOGICA","LIDERAZGO","ORGANIZACION","COMUNIDAD","TALENTO","ACTITUD"];

var _listenerKeydown = 
function(event) {
    var letra = event.key;
    var validarLetra = validarTecla(letra);

    if(validarLetra) {

        revisarEstiloLi("quitar");

        //Si el caracter ya se ingreso como letra acertada o no, no considerar nuevamente
        if (!(letrasAcertadas.includes(letra) || letrasError.includes(letra))) {
             
            var expresion = new RegExp(letra);
            if (expresion.test(palabraSecreta)) {

                letraCorrecta(letra);
                verificaGanador();

            } else {

                    letraIncorrecta(letra);
                    verificarFinJuego();

            }
        }    

    } else {
        revisarEstiloLi("agregar");
    }

}

btnIniciarJuego.addEventListener("click", function(event) {
    event.preventDefault();

    letrasError = [];
    letrasAcertadas = [];
    etiquetaLetrasError.textContent = "";

    reiniciarEstilos();
     
    crear_tablero();
    
    palabraSecreta = elegirPalabraSecreta();

    mostrarGuionesPalabra();

    removerListener();

    document.addEventListener("keydown", _listenerKeydown, true);
   
})


function elegirPalabraSecreta() {
    var palabraAlAzar= listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
	return palabraAlAzar;
}

function mostrarGuionesPalabra() {
    var nLetras = palabraSecreta.length;
    var ul = document.querySelector("#etiquetaPalabra");
    ul.innerHTML = "";
    for(var i = 0; i<nLetras; i++) {
        var li = document.createElement("li");
        //Asignando espacio en blanco
        li.textContent = '\u00A0';
        li.classList.add("guion");
        ul.appendChild(li);
    }

}


function validarTecla(contenido){
    // Expresion para detectar letras mayusculas    
    var expresion = new RegExp(/[A-Z]/);
    if (expresion.test(contenido) && contenido.length == 1){
        //mayusculas
        return true;
    } else {
        return false;
    }
    
}

function letraCorrecta(letra) {

    var palabraSplit = palabraSecreta.split('');
    
    var li = document.querySelectorAll("li");
  
    for(var i = 0; i<palabraSecreta.length; i++) {
        
        if (palabraSplit[i] == letra) {
            letrasAcertadas.push(letra);
            li[i].textContent=letra;
        }

    }

    return true;
}

function letraIncorrecta(letra) {
    letrasError.push(letra);
    etiquetaLetrasError.textContent = etiquetaLetrasError.textContent + letra;
    dibujarAhorcado(letrasError.length);
}

function revisarEstiloLi (opcion) {
    var li = document.querySelectorAll("li");
    for(var i = 0; i<palabraSecreta.length; i++) {      
        if (opcion == "agregar") {
            li[i].classList.add("error");
        } else {
            li[i].classList.remove("error");
        }       
    }
}

function verificaGanador() {

    if (letrasAcertadas.length == palabraSecreta.length){
        etiquetaLetrasError.textContent = "Ganaste, Felicidades!";
        etiquetaLetrasError.classList.add("gano");
        removerListener();
        btnIniciarJuego.focus();
    }

}

function verificarFinJuego() {

    if (letrasError.length == 10){
        etiquetaLetrasError.textContent = "Fin del juego!";
        etiquetaLetrasError.classList.add("perdio");
        removerListener();
    }
}

function removerListener() {
    document.removeEventListener("keydown", _listenerKeydown, true);
}

function reiniciarEstilos() {
    etiquetaLetrasError.classList.remove("gano");
    etiquetaLetrasError.classList.remove("perdio");
    btnIniciarJuego.classList.remove("btn_ini");
    btnIniciarJuego.classList.add("btn_ini_bottom");
    btnNuevaPalabra.classList.remove("btn_agregar");
    btnNuevaPalabra.classList.add("btn_agregar_bottom");
}