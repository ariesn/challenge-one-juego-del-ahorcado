var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

function crear_tablero() {

    pincel.fillStyle = "#F3F5FC";
    pincel.fillRect(0,0,1200,800);
}


function dibujarAhorcado(seccion) {

    pincel.fillStyle = "red";
    pincel.lineWidth = 5;
    
    pincel.beginPath();

    if (seccion == 1){

        //base horca 
        pincel.moveTo(480, 400);
        pincel.lineTo(720, 400);
    } else if(seccion == 2){   

        //horca vertical
        pincel.moveTo(550, 400);
        pincel.lineTo(550, 120);
    } else if(seccion == 3){   

        //horca horizontal
        pincel.moveTo(550, 120);
        pincel.lineTo(650, 120);
    } else if(seccion == 4){ 

        //horca vertical min
        pincel.moveTo(650, 120);
        pincel.lineTo(650, 150);
    } else if(seccion == 5){ 

        //cabeza
        pincel.arc(650,170,20,0,2*3.14)
        
    } else if(seccion == 6){ 
        //tronco
        pincel.moveTo(650, 190);
        pincel.lineTo(650, 270);
    } else if(seccion == 7){   

        //pierna izquierda
        pincel.moveTo(650, 270);
        pincel.lineTo(610, 310);
    } else if(seccion == 8){   

        //pierna derecha
        pincel.moveTo(650, 270);
        pincel.lineTo(690, 310);
    } else if(seccion == 9){    

        //brazo izquierdo
        pincel.moveTo(650, 220);
        pincel.lineTo(610, 190);
    } else if(seccion == 10){     

        //brazo derechO
        pincel.moveTo(650, 220);
        pincel.lineTo(690, 190);
    }

    pincel.stroke();

}

function dibujarMensaje(texto, x, y, color) {
    pincel.font="20px Georgia";
    pincel.fillStyle=color;
    pincel.fillText(texto, x, y);  
}