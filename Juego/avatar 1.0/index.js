let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3 
let vidasEnemigo = 3

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
    
    let personajeSeleccionado = document.querySelector('input[name="personaje"]:checked')

    if (personajeSeleccionado) {
        let nombre = personajeSeleccionado.id
        spanPersonajeJugador.innerHTML = nombre.charAt(0).toUpperCase() + nombre.slice(1)
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
    let personajes = ['Zuko', 'Katara', 'Aang', 'Toph']
    let personajeAleatorio = personajes[aleatorio(0, 3)]
    document.getElementById('personaje-enemigo').innerHTML = personajeAleatorio
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
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    let resultado = ""

    if (ataqueEnemigo === ataqueJugador) {
        resultado = "EMPATE 🤝"
    } else if (
        (ataqueJugador === 'Punio' && ataqueEnemigo === 'Barrida') ||
        (ataqueJugador === 'Patada' && ataqueEnemigo === 'Punio') ||
        (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
    ) {
        resultado = "GANASTE 🎉"
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        resultado = "PERDISTE 💥"
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    crearMensaje(resultado)
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("🏆 ¡Felicidades! ¡GANASTE EL JUEGO!")
    } else if (vidasJugador === 0) {
        crearMensajeFinal("💀 ¡Fin del juego! El enemigo te ha derrotado.")
    }
}

function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById('mensajes')
    sectionMensaje.innerHTML += `<p>Tu personaje atacó con <strong>${ataqueJugador}</strong>, el enemigo atacó con <strong>${ataqueEnemigo}</strong>. Resultado: <strong>${resultado}</strong></p>`
}

function crearMensajeFinal(resultadoFinal) {
    document.getElementById('reiniciar').style.display = "block"
    
    // El mensaje final lo añadimos arriba del historial de jugadas
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
