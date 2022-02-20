var btnIniciarJuego = document.querySelector("#iniciar-juego");
var btnNuevaPalabra = document.querySelector("#nueva-palabra");
var etiquetaOtrasLetras = document.querySelector("#etiquetaOtrasLetras");
var bloqueAgregarPalabra = document.querySelector("#dv_agregar_palabra");
var inputPalabra = document.querySelector("#agregar_palabra");
var btnGuardarPalabra  = document.querySelector("#guardar-palabra");

var palabraSecreta = "";
var letrasError = [];
var letrasAcertadas = [];
var listaPalabras = ["ALURA","ORACLE","DESARROLLO", "CURSO","EXCELENTE","GENIAL","NARANJA","BIEN",
"AGRADABLE","MAGIA","ONLINE","LOGICA","LIDERAZGO","ORGANIZACION","COMUNIDAD","TALENTO","ACTITUD"];

// Verificando si hay palabras en almacenamiento local
if (window.localStorage.length > 0) {
    var storagePalabras = window.localStorage;    
    var palabra = "";

    for (var i = 0; i < storagePalabras.length; i++) {
        palabra = storagePalabras.getItem(storagePalabras.key(i));
        if (!listaPalabras.includes(palabra)) {
            listaPalabras.push(palabra);
        } else {
            break;
        }
    }

}


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
    etiquetaOtrasLetras.textContent = "";

    reiniciarEstilosBtnIni();
     
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
    // Los guiones consisten en un estilo de li con borde inferior
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


function validarTexto(texto){
    // Expresion para detectar letras mayusculas y letra Ñ   
    var expresion = new RegExp(/[A-Z\u00d1]/);
    if (expresion.test(texto)){
        //mayusculas
        return true;
    } else {
        return false;
    }
    
}

function validarTecla(contenido){
    // Esto permite omitir texto de teclas de funcion (ej: F12)
    if (contenido.length == 1) {
        return validarTexto(contenido);
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
    etiquetaOtrasLetras.textContent = etiquetaOtrasLetras.textContent + letra;
    dibujarAhorcado(letrasError.length);
}

function revisarEstiloLi (opcion) {
    //Esta funcion permite agregar o quitar el estilo de error (guiones en rojo)
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
        etiquetaOtrasLetras.textContent = "Ganaste, Felicidades!";
        etiquetaOtrasLetras.classList.add("gano");
        removerListener();
        btnIniciarJuego.focus();
    }

}

function verificarFinJuego() {

    if (letrasError.length == 10){
        etiquetaOtrasLetras.textContent = "Fin del juego!";
        etiquetaOtrasLetras.classList.add("perdio");
        removerListener();
    }
}

function removerListener() {
    //Remueve el listener de deteccion de letras tecleadas
    document.removeEventListener("keydown", _listenerKeydown, true);
}

function reiniciarEstilosBtnIni() {
    removerEstiloOtrasLetras();
    ocultarBtnIniMid();
    mostrarBtnIniBottom();
    ocultarBtnNuevaPalabraMid();
    mostrarBtnNuevaPalabraBottom();
    bloqueAgregarPalabra.classList.add("invisible");
}



function agregarNuevaPalabra() {
    
    preparar_area();
    
}

function preparar_area() {
    var ul = document.querySelector("#etiquetaPalabra");
    bloqueAgregarPalabra.classList.remove("invisible");
    inputPalabra.classList.remove("invisible");

    ocultarBtnGuardarPalabraMid();
    mostrarBtnGuardarPalabraBottom();
    ocultarBtnIniMid();
    ocultarBtnIniBottom();
    ocultarBtnNuevaPalabraMid();
    mostrarBtnNuevaPalabraBottom();
 
    ul.innerHTML = "";
    crear_tablero();
    removerListener();
    inputPalabra.focus();

}

function guardarPalabra() {
    var mensajeSalida = "";
    mensajeSalida = agregarPalabra();
    ocultarBtnGuardarPalabraBottom();
    mostrarBtnIniBottom();
    removerEstiloOtrasLetras();
    bloqueAgregarPalabra.classList.add("invisible");
    etiquetaOtrasLetras.textContent = mensajeSalida;
    inputPalabra.value = "";
}

function almacenarEnLocal (nuevaPalabra){
    var almacenamientoLocal = window.localStorage;

    almacenamientoLocal.setItem(nuevaPalabra,nuevaPalabra);
    return true;
}

function agregarPalabra() {
    var textoPalabra = inputPalabra.value;
    var mensaje = "";
    var textoValido = validarTexto(textoPalabra);
    if (textoValido) {
        if(!listaPalabras.includes(textoPalabra)) {
            listaPalabras.push(textoPalabra);
            if (almacenarEnLocal(textoPalabra)){
                mensaje = "Se agrego palabra " + textoPalabra;
            } else {
                mensaje = "La palabra no se guardo en localStorage";
            }
        } else {
            mensaje = "La palabra ya existe";
        }
    } else {
        mensaje = "La palabra no es válida";
    }

    return mensaje;

}

btnNuevaPalabra.onclick = agregarNuevaPalabra;

btnGuardarPalabra.onclick = guardarPalabra;



