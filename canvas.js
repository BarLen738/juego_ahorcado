

//Dibujar espacio de trabajo
function dibujarTablero() {
    tablero.lineWidth = 4;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    //color de background del tablero
    var grd = tablero.createLinearGradient(0, 0, 0, 0);
    grd.addColorStop(.0, "#d5dee7");
    grd.addColorStop(.0, "#ffafbd");
    grd.addColorStop(1, "#c9ffbf");
    tablero.fillStyle = grd;
    tablero.strokeStyle = "rgba(0, 0, 0, 0.600);";
    tablero.fillRect(0, 0, 1480, 960);
    tablero.beginPath();
    tablero.moveTo(450, 500);
    tablero.lineTo(950, 500);
    tablero.stroke();
    tablero.closePath();
}




//dibujar guiones
function dibujarLineas() {
    //ancho 
    tablero.lineWidth = 4;
    //terminacion cuadrado
    tablero.lineCap = "butt";
    tablero.lineJoin = "round";
    //color de borde
    tablero.strokeStyle = "rgba(0, 0, 0, 0.600);";
    tablero.beginPath();
    //ancho de la separacion entre los guiones, tomar 600px y dividirlos por la cantidad de guiones -si son más guiones quedan más pegaditos-
    let anchura = 600 / palabraSecreta.length;
    //Bucle for para ir dibujando los guiones de uno en uno
    for (let i = 0; i < palabraSecreta.length; i++) {
        //para cada guion cambia el punto de inicio y hasta donde dibuja, las coordenadas de x. Arranca de 300 y después le suma el guión siguiente, que arranca en 300+(600/Q letras que tiene la palabra). Así sucesivamente 
        tablero.moveTo(300 + (anchura * i), 800)
        tablero.lineTo(350 + (anchura * i), 800)
    }
    //dibujar
    tablero.stroke();
    //terminar
    tablero.closePath();
}


//Dibujar letra correcta
function escribirLetraCorrecta(index) {
    tablero.font = "4rem Barrio";
    tablero.lineWidth = 4;
    tablero.lineCap = "butt";
    tablero.fillStyle = "rgba(0, 0, 0, 0.600)";
    let anchura = 600 / palabraSecreta.length;
    tablero.fillText(palabraSecreta[index], 305 + (anchura * index), 780);
    tablero.stroke();
}


//Dibujar letra incorrecta
function escribirLetraIncorrecta(letra, errorsLeft) {
    tablero.lineWidth = 4;
    tablero.font = "4rem Barrio";
    tablero.lineCap = "round";
    tablero.fillStyle = "rgba(0, 0, 0, 0.600)";
    tablero.fillText(" " + letra + " ", 250 + (16 * (10 - errorsLeft)), 900, 25);
}


//Dibujar el ahorcado
function dibujarAhorcado(puntaje) {
    tablero.lineWidth = 4;
    tablero.lineCap = "butt";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "rgba(0, 0, 0, 0.600);";
    if (puntaje === 8) {
        //poste lateral
        tablero.moveTo(700, 500);
        tablero.lineTo(700, 100);
    }
    if (puntaje === 7) {
        //travesaño
        tablero.moveTo(850, 100)
        tablero.lineTo(700, 100)
    }
    if (puntaje === 6) {
        //cuerda
        tablero.moveTo(850, 100)
        tablero.lineTo(850, 171)
    }
    if (puntaje === 5) {
        //cabeza
        tablero.moveTo(900, 230)
        tablero.arc(850, 230, 50, 0, Math.PI * 2)
    }
    if (puntaje === 4) {
        //cuerpo
        tablero.moveTo(850, 389)
        tablero.lineTo(850, 289)
    }
    if (puntaje === 3) {
        //pierna izquierda
        tablero.moveTo(850, 389)
        tablero.lineTo(800, 450)
    }
    if (puntaje === 2) {
        //pierna derecha
        tablero.moveTo(850, 389)
        tablero.lineTo(890, 450)
    }
    if (puntaje === 1) {
        //brazo izquierdo
        tablero.moveTo(850, 330)
        tablero.lineTo(800, 389)
    }
    if (puntaje === 0) {
        //mano derecha
        tablero.moveTo(850, 330)
        tablero.lineTo(890, 389)
    }
    tablero.stroke()
    tablero.closePath()
}


//mostrar mensaje de perdiste
function perdiste() {
    tablero.lineWidth = 4;
    tablero.font = "4rem Barrio";
    tablero.lineCap = "butt";
    tablero.lineJoin = "round";
    tablero.fillStyle = "lightcoral";
    tablero.fillText("Perdiste", 940, 335);
}


//Mostrar mensaje de ganaste
function ganaste() {
    tablero.lineWidth = 4;
    tablero.font = "4rem Barrio";
    tablero.lineCap = "butt";
    tablero.lineJoin = "round";
    tablero.fillStyle = "lightcoral";
    tablero.fillText("Ganaste", 950, 320);
    tablero.fillText("¡¡¡Felicitaciones!!!", 930, 360);
    setTimeout(recargar, 1000);
}


//Actualizar página
function recargar() {
    location.reload();
}



