
const contenedorTarjetas = document.getElementById('contenedorTarjetas')

let opcionAvatares

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonPersonajeJugador = document.getElementById('boton-personaje')
const botonPunio = document.getElementById('boton-punio')
const botonPatada = document.getElementById('boton-patada')
const botonBarrida = document.getElementById('boton-barrida')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
const inputZuko = document.getElementById('zuko')
const inputKatara = document.getElementById('katara')
const inputAang = document.getElementById('aang')
const inputToph = document.getElementById('toph')
const inputSokka = document.getElementById('sokka')
const inputAzula = document.getElementById('azula')
const spanPersonajeJugador = document.getElementById('personaje-jugador')

const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-enemigo')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let avatares = []  //creamos el arreglo para los personajes

let ataqueJugador
let ataqueEnemigo
let personajeJugadorObjeto 
let personajeEnemigoObjeto 
let lienzo = mapa.getContext("2d");
let intervalo;

let mapaBackground = new Image()
mapaBackground.src = 'assets/mokemap.png'

class Personaje {
    constructor(nombre, icono, elemento, color, foto) {
        this.nombre = nombre
        this.icono = icono
        this.elemento = elemento 
        this.color = color       
        this.vidas = 3
        this.vidasMaximas = 3
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let zuko = new Personaje("Zuko", "🔥", "Fuego", "#ff4757", "assets/zuko.png")
let katara = new Personaje("Katara", "💧", "Agua", "#2e86de", "assets/katara.png")
let aang = new Personaje("Aang", "🌪️", "Aire", "#f1c40f", "assets/aang.png")
let toph = new Personaje("Toph", "🪨", "Tierra", "#2ecc71", "assets/toph.png")
let sokka = new Personaje("Sokka", "🪃", "No maestro", "#34495e", "assets/sokka.png")
let azula = new Personaje("Azula", "⚡", "Fuego", "#8e44ad", "assets/azula.png")

let personajesDisponibles = [zuko, katara, aang, toph, sokka, azula]

// Ataques para Zuko
zuko.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

// Ataques para Katara
katara.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

// Ataques para Aang
aang.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

// Ataques para Toph
toph.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

// Ataques para Sokka
sokka.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

// Ataques para Azula
azula.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)
console.log(zuko.ataques);

avatares.push(zuko, katara, aang, toph, sokka, azula) //usamos el método push

// Recorremos el arreglo de avatares para crear las tarjetas
avatares.forEach((avatar) => {
    let idPersonaje = avatar.nombre.toLowerCase();

    opcionAvatares = `
        <label class="tarjeta ${idPersonaje}">
            <input type="radio" name="personaje" id="${idPersonaje}"> ${avatar.nombre} ${avatar.icono}
        </label>
    `;
    
    // Inyectamos la tarjeta en el HTML
    contenedorTarjetas.innerHTML += opcionAvatares;
});
function iniciarJuego() {
    document.getElementById('seleccionar-ataque').style.display = 'none'
    document.getElementById('reiniciar').style.display = "none"
    document.getElementById("reglas-del-juego").style.display = "none"
    document.getElementById('boton-jugar').style.display = 'none'
   
    document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador)
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas)
    document.getElementById('boton-jugar').addEventListener('click', ocultarReglas) 
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego)

    document.getElementById('boton-punio').addEventListener('click', () => registrarAtaque('Punio'))
    document.getElementById('boton-patada').addEventListener('click', () => registrarAtaque('Patada'))
    document.getElementById('boton-barrida').addEventListener('click', () => registrarAtaque('Barrida'))

    sectionVerMapa.style.display = 'none';
}

function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block"
    document.getElementById('boton-jugar').style.display = 'block'
    document.getElementById('boton-reglas').style.display = 'none'
    document.getElementById('seleccionar-personaje').style.display = 'none'
}

function ocultarReglas() {
    document.getElementById("reglas-del-juego").style.display = "none"
    document.getElementById('boton-jugar').style.display = 'none'
    document.getElementById('boton-reglas').style.display = 'block'
    document.getElementById('seleccionar-personaje').style.display = 'block'
}

function seleccionarPersonajeJugador() {
    let sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
    let spanPersonajeJugador = document.getElementById('personaje-jugador')
    let barraJugador = document.getElementById('barra-vida-jugador')
    barraJugador.style.width = "100%"
    let personajeSeleccionado = document.querySelector('input[name="personaje"]:checked')

    if (personajeSeleccionado) {
        let idSeleccionado = personajeSeleccionado.id 
        personajeJugadorObjeto = personajesDisponibles.find(personaje => personaje.nombre.toLowerCase() === idSeleccionado)
        
        spanPersonajeJugador.innerHTML = personajeJugadorObjeto.nombre + " " + personajeJugadorObjeto.icono
    } else {
        let mensajeError = document.createElement("p")
        mensajeError.innerHTML = '⚠️ Por favor, selecciona un personaje'
        mensajeError.style.color = "#ff4757"
        mensajeError.style.fontWeight = "bold"
        sectionSeleccionarPersonaje.appendChild(mensajeError)

        setTimeout(() => { mensajeError.remove() }, 2000)
        return
    }

    document.getElementById('seleccionar-ataque').style.display = 'none'
    document.getElementById('boton-reglas').style.display = 'none'
    document.getElementById("reglas-del-juego").style.display = "none"
    sectionSeleccionarPersonaje.style.display = 'none' 
   
    seleccionarPersonajeEnemigo()

    sectionVerMapa.style.display = 'flex';
    intervalo = setInterval(pintarPersonaje, 50);
}

function seleccionarPersonajeEnemigo() { 
    let indiceAleatorio = aleatorio(0, personajesDisponibles.length - 1)
    personajeEnemigoObjeto = personajesDisponibles[indiceAleatorio]
    let barraEnemigo = document.getElementById('barra-vida-enemigo')
    barraEnemigo.style.width = "100%"
    
    document.getElementById('personaje-enemigo').innerHTML = personajeEnemigoObjeto.nombre + " " + personajeEnemigoObjeto.icono
}

function registrarAtaque(ataque) {
    ataqueJugador = ataque
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataques = ['Punio', 'Patada', 'Barrida']
    ataqueEnemigo = ataques[aleatorio(0, 2)]
    combate()
}

function combate() {
    let resultado = ""

    if (ataqueEnemigo === ataqueJugador) {
        resultado = "EMPATE 🤝"
    } else if (
        (ataqueJugador === 'Punio' && ataqueEnemigo === 'Barrida') ||
        (ataqueJugador === 'Patada' && ataqueEnemigo === 'Punio') ||
        (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
    ) {
        resultado = "GANASTE 🎉"
        personajeEnemigoObjeto.vidas--
        let barraEnemigo = document.getElementById('barra-vida-enemigo')
        barraEnemigo.style.width = (personajeEnemigoObjeto.vidas * 33.33) + "%"
    } else {
        resultado = "PERDISTE 💥"
        personajeJugadorObjeto.vidas--
        let barraJugador = document.getElementById('barra-vida-jugador')
        barraJugador.style.width = (personajeJugadorObjeto.vidas * 33.33) + "%"
    }

    crearMensaje(resultado)
    revisarVidas()
}

function revisarVidas() {
    if (personajeEnemigoObjeto.vidas === 0) {
        crearMensajeFinal("🏆 ¡Felicidades! ¡GANASTE EL JUEGO!")
    } else if (personajeJugadorObjeto.vidas === 0) {
        crearMensajeFinal("💀 ¡Fin del juego! El enemigo te ha derrotado.")
    }
}

function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById('mensajes')
    sectionMensaje.innerHTML += `<p>Tu personaje atacó con <strong>${ataqueJugador}</strong>, el enemigo atacó con <strong>${ataqueEnemigo}</strong>. Resultado: <strong>${resultado}</strong></p>`
}

function crearMensajeFinal(resultadoFinal) {
    document.getElementById('reiniciar').style.display = "block"
    
    let sectionMensaje = document.getElementById('mensajes')
    sectionMensaje.innerHTML = `<h2>${resultadoFinal}</h2>` + sectionMensaje.innerHTML
    
    document.querySelectorAll('.btn-ataque').forEach(boton => boton.disabled = true)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarPersonaje() {
    // 1. Actualizamos la posición del personaje que elegiste
    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX;
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY;

    // 2. Limpiamos el canvas para que no queden rastros viejos
    lienzo.clearRect(0, 0, mapa.width, mapa.height);

    // 3. PRIMERO dibujamos la imagen del mapa de fondo
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    );

    // 4. DESPUÉS dibujamos a tu personaje encima del mapa
    lienzo.drawImage(
        personajeJugadorObjeto.mapaFoto,
        personajeJugadorObjeto.x,
        personajeJugadorObjeto.y,
        personajeJugadorObjeto.ancho,
        personajeJugadorObjeto.alto
    );
}

function moverDerecha() {
    personajeJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
    personajeJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
    personajeJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
    personajeJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
    personajeJugadorObjeto.velocidadX = 0;
    personajeJugadorObjeto.velocidadY = 0;
}

window.addEventListener('load', iniciarJuego)
