function removerEstiloOtrasLetras() {
    etiquetaOtrasLetras.classList.remove("gano");
    etiquetaOtrasLetras.classList.remove("perdio");
}

function mostrarBtnIniMid() {
    btnIniciarJuego.classList.remove("invisible");
    btnIniciarJuego.classList.add("btn_ini");
}

function mostrarBtnIniBottom() {
    btnIniciarJuego.classList.remove("invisible");
    btnIniciarJuego.classList.add("btn_ini_bottom");
}

function ocultarBtnIniMid() {
    btnIniciarJuego.classList.remove("btn_ini");
    btnIniciarJuego.classList.add("invisible");
}

function ocultarBtnIniBottom() {
    btnIniciarJuego.classList.remove("btn_ini_bottom");
    btnIniciarJuego.classList.add("invisible");
}

function mostrarBtnGuardarPalabraMid() {
    btnGuardarPalabra.classList.remove("invisible");
    btnGuardarPalabra.classList.add("btn_ini");
}

function mostrarBtnGuardarPalabraBottom() {
    btnGuardarPalabra.classList.remove("invisible");
    btnGuardarPalabra.classList.add("btn_ini_bottom");
}

function ocultarBtnGuardarPalabraMid() {
    btnGuardarPalabra.classList.remove("btn_ini");
    btnGuardarPalabra.classList.add("invisible");
}

function ocultarBtnGuardarPalabraBottom() {
    btnGuardarPalabra.classList.remove("btn_ini_bottom");
    btnGuardarPalabra.classList.add("invisible");
}

function mostrarBtnNuevaPalabraMid() {
    btnNuevaPalabra.classList.remove("invisible");
    btnNuevaPalabra.classList.add("btn_agregar");
}

function mostrarBtnNuevaPalabraBottom() {
    btnNuevaPalabra.classList.remove("invisible");
    btnNuevaPalabra.classList.add("btn_agregar_bottom");
}

function ocultarBtnNuevaPalabraMid() {
    btnNuevaPalabra.classList.remove("btn_agregar");
    btnNuevaPalabra.classList.add("invisible");
}

function ocultarBtnNuevaPalabraBottom() {
    btnNuevaPalabra.classList.remove("btn_agregar_bottom");
    btnNuevaPalabra.classList.add("invisible");
}
