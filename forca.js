//Selectores
let pantalla = document.querySelector("canvas");
//desaparecer botón nuevo juego
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none";
//desaparecer boton salir
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none";
//desaparecer botón agregar palabra
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = "none";
//atrapar botón nuevo juego
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
//atrapar botón salir
let btnSalir = document.getElementById("btn-salir");
//atrapar botón cancelar
let btnCancelar = document.getElementById("btn-cancelar");
let chauTitulo = document.getElementById("título");
//array con las palabras para jugar
var palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML", "CSS", "AHORCADO", "LOGICA", "PROGRAMACION", "DESAFIO"];
//canvas
var tablero = document.getElementById("forca").getContext("2d");
//palabra secreta vacia a rellenar por la funcion
var palabraSecreta = "";
//total de inputs del usuario
var letras = [];
//palabra adivinada
var palabraCorrecta = "";
//cantidad de intentos fallidos
var errores = 8;
//inputs incorrectos del usuario
let letrasIncorrectas = [];
//intentos posibles a fallar
let numeroDeErrores = 8;
//cada try del usuario
let letraElegida = [];
//espacio para mostrar el juego



//Eventos

document.getElementById("div-aparece-ahorcado").style.display = "none";

//captura el id "iniciar-juego" al hacer clic y dirige el programa al inicio del juego
document.getElementById("iniciar-juego").onclick = () => {
    iniciarJuego();
}


//captura el id "btn-guardar", guarda la palabra que agrega el usuario e inicia el juego
document.getElementById("btn-guardar").onclick = () => {
    guardarPalabra();
}


//Actualiza la pantalla cuando el usuario hace clic en los botones
//Botón nuevo juego
btnNuevoJuego.addEventListener("click", function () {
    location.reload();
}
);
//Botón salir
btnSalir.addEventListener("click", function () {
    location.reload();
}
);
//Botón cancelar
btnCancelar.addEventListener("click", function () {
    location.reload();
}
);


//Desaparecer botones de la home y aparecer pantalla de agregar palabra
function ensenarPantallaDeAgregarPalabra() {
    document.getElementById("div-desaparece").style.display = "none";
    document.getElementById("título").style.display = "none";
    document.getElementById("agregar-palabra").style.display = "block";
}


//Guardar palabra que agregue el usuario
function guardarPalabra() {

    //capturar la palabra que el usuario escribe
    let nuevaPalabra = document.getElementById("input-nueva-palabra").value;

    //agrega la nueva palabra al array de palabras a sortear
    if (nuevaPalabra !== "") {
        palabras.push(nuevaPalabra.toUpperCase());
        alert("Se guardó tu palabra");

        //desaparecer esta pantalla
        document.getElementById("agregar-palabra").style.display = "none";
        iniciarJuego();
    }
    else {
        alert("No agregaste ninguna palabra");
    }
}


//Sortear palabra
function escojerPalabraSecreta() {
    //Busca un aleatorio dentro del largo del array, lo convierte a entero
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    //guarda lo anterior en nueva variable
    palabraSecreta = palabra;
    //devuelve la palabra
    return palabra
}

//Verificar letra presionada por el usuario
function verificarLetraClicada(key) {

    //letras equivale al total de inputs del usuario

    //si el número de elementos en el array es menor a 1 O si la posición dentro del array no existe (por ser menor a 0)
    if (letras.length < 1 || letras.indexOf(key) < 0) {
        letras.push(key);
        return false;
    }
    else {
        //añade una nueva letra al final del array
        letras.push(key);
        return true;
    }
}


//Impedir que se tomen como errores teclas que no correspondan
function verificarLetra(keyCode) {
    //keycode es la tecla que presiona el usuario
    //si presiona un numero o una tecla que no corresponde a una letra -fuera de los códigos ASCII entre 65 y 90
    if (typeof keyCode !== "number" && keyCode <= 65  && keyCode >= 90) {
        return false;
    } else {
        return true;
    }
}


//Escribir letra correcta en mayúscula
function adicionarLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase();
}


//Escribir letra incorrecta y restar a contador de errores (inicializado en 8)
function adicionarLetraIncorrecta(letter) {
    //si no encuentra la posición de la letra restar uno a errores
    if (palabraSecreta.indexOf(letter) <= 0) {
        errores -= 1
    }
}


//Chequear si la letra fue incluida en el array de letras correctas o incorrectas
function verificarFinJuego(letra) {
    //para letras incorrectas y sumarlas al array de incorrectas
    if (letraElegida.length < palabraSecreta.length) {
        letrasIncorrectas.push(letra);

        //si el usuario llegó al número máximo de intentos
        if (letrasIncorrectas.length > numeroDeErrores) {
            perdiste();
        }

        //sumar al contador de errores y escribir letra incorrecta en pantalla
        else if (letraElegida.length < palabraSecreta.length) {
            adicionarLetraIncorrecta(letra);
            escribirLetraIncorrecta(letra, errores);
        }
    }
}


//Verificar si el usuario ganó
function verificarVencedor(letra) {
    //si la cantidad de letras elegidas coincide con la cantidad de las letras de la palabra secreta
    letraElegida.push(letra.toUpperCase());
    if (letraElegida.length == palabraSecreta.length) {
        ganaste();
    }
}


//Iniciar juego
function iniciarJuego() {

    //desaparecer div con botones y título
    document.getElementById("div-desaparece").style.display = "none";
    document.getElementById("título").style.display = "none";
    document.getElementById("div-aparece-ahorcado").style.display = "block";

    //dibujar tablero -canvas.js-
    dibujarTablero();

    //sortear palabra
    escojerPalabraSecreta();

    //dibujar guiones -canvas.js-
    dibujarLineas();

    //aparecer botones
    document.getElementById("btn-nuevo-juego").style.display = "block";
    document.getElementById("btn-salir").style.display = "block";

    //capturar letra que escribe el usuario
    document.onkeydown = (e) => {
        console.log(e.key.toUpperCase());

        //pasar a mayúscula
        let letra = e.key.toUpperCase();

        //verificar si el caracter es permitido, si la palabra secreta lo incluye, dibujar la letra en la posición que corresponde, verificar si el usuario ganó
        if (letrasIncorrectas.length <= numeroDeErrores) {
            console.log(letrasIncorrectas.length);
            console.log(numeroDeErrores);
            console.log((e.keyCode));
            console.log((e.key));
            if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
                console.log(palabraSecreta.includes(letra));
                if (palabraSecreta.includes(letra)) {
                    
                    adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
                    for (let i = 0; i < palabraSecreta.length; i++) {
                        if (palabraSecreta[i] === letra) {
                            console.log([i]);
                            console.log(letra);
                            escribirLetraCorrecta(i)
                            verificarVencedor(letra)
                        }
                    }
                }

                //verificar si el usuario ya perdió, dibujar el ahorcado, mostrar msj de fin de juego

                else {
                    if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
                    dibujarAhorcado(errores);
                    verificarFinJuego(letra);
                }
            }
        }
        else {

            //mostrar msj de que se agotaron los intentos
            alert("Ya no tienes más intentos");
        }
    }
}
