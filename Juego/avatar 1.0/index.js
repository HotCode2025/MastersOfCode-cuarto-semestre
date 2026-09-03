let ataqueJugador
let ataqueEnemigo
let personajeJugadorObjeto 
let personajeEnemigoObjeto 

class Personaje {
    constructor(nombre, icono, elemento, color) {
        this.nombre = nombre
        this.icono = icono
        this.elemento = elemento 
        this.color = color       
        this.vidas = 3
        this.vidasMaximas = 3
    }
}

let zuko = new Personaje("Zuko", "🔥", "Fuego", "#ff4757")
let katara = new Personaje("Katara", "🌊", "Agua", "#2e86de")
let aang = new Personaje("Aang", "🌪️", "Aire", "#f1c40f")
let toph = new Personaje("Toph", "🪨", "Tierra", "#2ecc71")
let sokka = new Personaje("Sokka", "🪃", "No maestro", "#34495e")
let azula = new Personaje("Azula", "⚡", "Fuego", "#8e44ad")

let personajesDisponibles = [zuko, katara, aang, toph, sokka, azula]

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

    document.getElementById('seleccionar-ataque').style.display = 'block'
    document.getElementById('boton-reglas').style.display = 'none'
    document.getElementById("reglas-del-juego").style.display = "none"
    sectionSeleccionarPersonaje.style.display = 'none' 
   
    seleccionarPersonajeEnemigo()
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

window.addEventListener('load', iniciarJuego)