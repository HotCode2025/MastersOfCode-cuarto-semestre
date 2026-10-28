const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const mapa = document.getElementById('mapa')
const lienzo = mapa.getContext('2d')

class Personaje {
    constructor(nombre, icono, elemento, color, foto, mira) {
        this.nombre = nombre
        this.icono = icono
        this.elemento = elemento
        this.color = color
        this.foto = foto
        this.mira = mira          
        this.vidas = 3
        this.vidasMaximas = 3
        this.ataques = [
            { nombre: 'Punio', id: 'boton-punio' },
            { nombre: 'Patada', id: 'boton-patada' },
            { nombre: 'Barrida', id: 'boton-barrida' }
        ]
        this.x = 0
        this.y = 0
        this.velocidadX = 0
        this.velocidadY = 0
        this.mirandoIzquierda = false
        this.cambioRumbo = 0
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
    }
}

const DATOS_PERSONAJES = [
    { nombre: 'Zuko',   icono: '🔥', elemento: 'Fuego',       color: '#e8452c', foto: 'assets/zuko.png',   mira: -1 },
    { nombre: 'Katara', icono: '💧', elemento: 'Agua',        color: '#2e86de', foto: 'assets/katara.png', mira: 1 },
    { nombre: 'Aang',   icono: '🌪️', elemento: 'Aire',        color: '#f4b223', foto: 'assets/aang.png',   mira: 1 },
    { nombre: 'Toph',   icono: '🪨', elemento: 'Tierra',      color: '#4f9a3a', foto: 'assets/toph.png',   mira: 1 },
    { nombre: 'Sokka',  icono: '🪃', elemento: 'Guerrero',    color: '#3b6fa8', foto: 'assets/sokka.png',  mira: 1 },
    { nombre: 'Azula',  icono: '⚡', elemento: 'Fuego Azul',  color: '#7d3cff', foto: 'assets/azula.png',  mira: 1 }
]

function crearPersonaje(datos) {
    return new Personaje(datos.nombre, datos.icono, datos.elemento, datos.color, datos.foto, datos.mira)
}

const NOMBRES_ATAQUE = { Punio: 'Puño ✊', Patada: 'Patada 🦶', Barrida: 'Barrida 👣' }
const CANTIDAD_ENEMIGOS = 3

let jugador = null
let enemigos = []
let enemigoActual = null
let ataqueJugador
let ataqueEnemigo
let combateTerminado = false

let pantallaActual = ''
let animacionId = null
let ultimoTiempo = 0
let tamSprite = 80
let invulnerableHasta = 0
let mapaIniciado = false

const teclas = { arriba: false, abajo: false, izquierda: false, derecha: false }

const mapaBackground = new Image()
mapaBackground.src = 'assets/mokemap.png'
mapaBackground.onload = () => { if (mapaIniciado) ajustarMapa() }

function avisar(texto) {
    if (window.mostrarErrorJuego) window.mostrarErrorJuego(texto)
    console.error(texto)
}

function revisarArchivos() {
    const idsNecesarios = ['contenedorTarjetas', 'mapa', 'boton-personaje', 'boton-reglas',
        'reglas-del-juego', 'boton-cerrar-reglas', 'ver-mapa', 'seleccionar-ataque',
        'boton-volver-mapa', 'boton-reiniciar', 'aviso-combate', 'luchador-jugador', 'luchador-enemigo']
    const faltan = idsNecesarios.filter(id => !document.getElementById(id))
    if (faltan.length) {
        avisar('El HTML no coincide con el index.js (faltan: ' + faltan.join(', ') + '). Reemplazá avatar01.html, index.js y style.css juntos.')
        return false
    }
    // Comprobamos que las imágenes existan en la carpeta assets/
    const imagenes = [...DATOS_PERSONAJES.map(p => p.foto), 'assets/mokemap.png']
    imagenes.forEach(src => {
        const prueba = new Image()
        prueba.onerror = () => avisar(`No se encontró la imagen "${src}". Revisá que esté en la carpeta assets/ con ese nombre exacto.`)
        prueba.src = src
    })
    return true
}

function iniciarJuego() {
    if (!revisarArchivos()) return
    DATOS_PERSONAJES.forEach((avatar) => {
        const idPersonaje = avatar.nombre.toLowerCase()
        const opcionAvatares = `
            <label class="tarjeta ${idPersonaje}">
                <input type="radio" name="personaje" id="${idPersonaje}" value="${idPersonaje}">
                <img src="${avatar.foto}" alt="${avatar.nombre}">
                <span class="tarjeta-nombre">${avatar.nombre} ${avatar.icono}</span>
                <span class="tarjeta-elemento">${avatar.elemento}</span>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionAvatares
    })

    document.querySelectorAll('input[name="personaje"]').forEach(input => {
        input.addEventListener('change', () => {
            document.querySelectorAll('.tarjeta').forEach(t => t.classList.remove('seleccionada'))
            input.parentElement.classList.add('seleccionada')
        })
    })

    document.getElementById('boton-personaje').addEventListener('click', seleccionarPersonajeJugador)
    document.getElementById('boton-reglas').addEventListener('click', abrirReglas)
    document.getElementById('boton-reglas-mapa').addEventListener('click', abrirReglas)
    document.getElementById('boton-cerrar-reglas').addEventListener('click', cerrarReglas)
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego)
    document.getElementById('boton-volver-mapa').addEventListener('click', volverAlMapa)

    document.getElementById('boton-punio').addEventListener('click', () => registrarAtaque('Punio'))
    document.getElementById('boton-patada').addEventListener('click', () => registrarAtaque('Patada'))
    document.getElementById('boton-barrida').addEventListener('click', () => registrarAtaque('Barrida'))

    configurarControles()
    window.addEventListener('resize', () => { if (mapaIniciado) ajustarMapa() })

    mostrarPantalla('seleccionar-personaje')
}

function mostrarPantalla(id) {
    const seccion = document.getElementById(id)
    document.querySelectorAll('.pantalla').forEach(s => s.classList.toggle('activa', s === seccion))
    pantallaActual = id

    document.body.classList.toggle('enfocado', seccion.classList.contains('pantalla-enfocada'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
}


let pantallaAntesDeReglas = 'seleccionar-personaje'

function abrirReglas() {
    pantallaAntesDeReglas = pantallaActual
    if (pantallaActual === 'ver-mapa') {
        pausarMapa()
        soltarTeclas()
    }
    mostrarPantalla('reglas-del-juego')
}

function cerrarReglas() {
    mostrarPantalla(pantallaAntesDeReglas)
    if (pantallaAntesDeReglas === 'ver-mapa') reanudarMapa()
}

function seleccionarPersonajeJugador() {
    const seleccionado = document.querySelector('input[name="personaje"]:checked')
    const error = document.getElementById('mensaje-error')

    if (!seleccionado) {
        error.textContent = '⚠️ Por favor, selecciona un personaje'
        setTimeout(() => { error.textContent = '' }, 2000)
        return
    }

    const datos = DATOS_PERSONAJES.find(p => p.nombre.toLowerCase() === seleccionado.value)
    jugador = crearPersonaje(datos)
    document.getElementById('hud-jugador').textContent = `${jugador.nombre} ${jugador.icono}`

    mostrarPantalla('ver-mapa')
    iniciarMapa()
}

function ajustarMapa() {
    const anchoAnterior = mapa.width
    const proporcion = mapaBackground.naturalWidth
        ? mapaBackground.naturalWidth / mapaBackground.naturalHeight
        : 1.52
    const nuevoAncho = Math.round(Math.min(window.innerWidth - 56, 900))

    mapa.width = nuevoAncho
    mapa.height = Math.round(nuevoAncho / proporcion)
    tamSprite = Math.max(48, Math.round(nuevoAncho * 0.11))

    if (mapaIniciado && jugador) {
        const k = nuevoAncho / anchoAnterior
        ;[jugador, ...enemigos].forEach(p => { p.x *= k; p.y *= k })
    }
}

function iniciarMapa() {
    ajustarMapa()
    mapaIniciado = true

    jugador.x = mapa.width * 0.15
    jugador.y = mapa.height * 0.6

    const rivales = DATOS_PERSONAJES.filter(d => d.nombre !== jugador.nombre)
    mezclar(rivales)
    enemigos = []
    rivales.slice(0, CANTIDAD_ENEMIGOS).forEach(d => {
        const enemigo = crearPersonaje(d)
        colocarEnemigo(enemigo)
        enemigos.push(enemigo)
    })

    actualizarHud()
    reanudarMapa()
}

function colocarEnemigo(enemigo) {
    let intentos = 0
    do {
        enemigo.x = aleatorio(mapa.width * 0.4, mapa.width * 0.92)
        enemigo.y = aleatorio(mapa.height * 0.3, mapa.height * 0.95)
        intentos++
    } while (
        intentos < 60 &&
        (distancia(enemigo, jugador) < mapa.width * 0.3 ||
         enemigos.some(otro => distancia(otro, enemigo) < tamSprite * 1.2))
    )
    nuevoRumbo(enemigo)
}

function nuevoRumbo(enemigo) {
    const angulo = Math.random() * Math.PI * 2
    const quieto = Math.random() < 0.25       
    const velocidad = quieto ? 0 : mapa.width * 0.08
    enemigo.velocidadX = Math.cos(angulo) * velocidad
    enemigo.velocidadY = Math.sin(angulo) * velocidad
    enemigo.cambioRumbo = performance.now() + 1200 + Math.random() * 2000
}

function reanudarMapa() {
    cancelAnimationFrame(animacionId)
    ultimoTiempo = performance.now()
    animacionId = requestAnimationFrame(bucle)
}

function pausarMapa() {
    cancelAnimationFrame(animacionId)
    animacionId = null
}

function bucle(tiempo) {
    const dt = Math.min((tiempo - ultimoTiempo) / 1000, 0.05)
    ultimoTiempo = tiempo

    moverJugador(dt)
    moverEnemigos(dt, tiempo)
    pintarMapa(tiempo)

    const rival = revisarColisiones(tiempo)
    if (rival) {
        empezarEncuentro(rival)
        return
    }
    animacionId = requestAnimationFrame(bucle)
}

function moverJugador(dt) {
    const velocidad = mapa.width * 0.32
    let dx = (teclas.derecha ? 1 : 0) - (teclas.izquierda ? 1 : 0)
    let dy = (teclas.abajo ? 1 : 0) - (teclas.arriba ? 1 : 0)
    if (dx && dy) { dx *= Math.SQRT1_2; dy *= Math.SQRT1_2 }

    jugador.velocidadX = dx * velocidad
    jugador.velocidadY = dy * velocidad
    jugador.x += jugador.velocidadX * dt
    jugador.y += jugador.velocidadY * dt
    if (dx) jugador.mirandoIzquierda = dx < 0

    limitarAlMapa(jugador)
}

function moverEnemigos(dt, tiempo) {
    const medio = tamSprite / 2
    enemigos.forEach(e => {
        if (tiempo > e.cambioRumbo) nuevoRumbo(e)

        e.x += e.velocidadX * dt
        e.y += e.velocidadY * dt
        if (e.x < medio || e.x > mapa.width - medio) e.velocidadX *= -1
        if (e.y < tamSprite || e.y > mapa.height - 4) e.velocidadY *= -1
        limitarAlMapa(e)

        if (e.velocidadX) e.mirandoIzquierda = e.velocidadX < 0
    })
}

function limitarAlMapa(p) {
    const medio = tamSprite / 2
    p.x = Math.max(medio, Math.min(mapa.width - medio, p.x))
    p.y = Math.max(tamSprite, Math.min(mapa.height - 4, p.y))
}

function pintarMapa(tiempo) {
    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    if (mapaBackground.complete && mapaBackground.naturalWidth) {
        lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    } else {
        lienzo.fillStyle = '#3b3f6b'
        lienzo.fillRect(0, 0, mapa.width, mapa.height)
    }

    ;[...enemigos, jugador]
        .sort((a, b) => a.y - b.y)
        .forEach(p => dibujarPersonaje(p, tiempo, p === jugador))
}

function dibujarPersonaje(p, tiempo, esJugador) {
    const enMovimiento = p.velocidadX !== 0 || p.velocidadY !== 0
    const rebote = enMovimiento
        ? Math.abs(Math.sin(tiempo / 110)) * tamSprite * 0.08
        : (Math.sin(tiempo / 450) + 1) * tamSprite * 0.02
    lienzo.save()
    lienzo.beginPath()
    lienzo.ellipse(p.x, p.y, tamSprite * 0.38, tamSprite * 0.11, 0, 0, Math.PI * 2)
    lienzo.fillStyle = 'rgba(0, 0, 0, 0.35)'
    lienzo.fill()
    lienzo.lineWidth = esJugador ? 3 : 2
    lienzo.strokeStyle = esJugador ? '#f8d77e' : p.color
    lienzo.globalAlpha = 0.55 + 0.45 * Math.sin(tiempo / 250)
    lienzo.stroke()
    lienzo.restore()

    // Parpadeo cuando volvés de una batalla
    const parpadea = esJugador && tiempo < invulnerableHasta && Math.floor(tiempo / 100) % 2 === 0

    const img = p.mapaFoto
    if (!parpadea) {
        if (img.complete && img.naturalWidth) {
            const escala = tamSprite / Math.max(img.naturalWidth, img.naturalHeight)
            const w = img.naturalWidth * escala
            const h = img.naturalHeight * escala
            const voltear = p.mirandoIzquierda ? p.mira === 1 : p.mira === -1

            lienzo.save()
            lienzo.translate(p.x, p.y - rebote)
            if (voltear) lienzo.scale(-1, 1)
            lienzo.drawImage(img, -w / 2, -h, w, h)
            lienzo.restore()
        } else {
            lienzo.font = `${tamSprite * 0.6}px serif`
            lienzo.textAlign = 'center'
            lienzo.fillText(p.icono, p.x, p.y - rebote - tamSprite * 0.2)
        }
    }

    // Cartel con el nombre
    const texto = esJugador ? `★ ${p.nombre}` : `${p.icono} ${p.nombre}`
    const tamLetra = Math.max(11, Math.round(tamSprite * 0.15))
    lienzo.font = `700 ${tamLetra}px Cinzel, serif`
    lienzo.textAlign = 'center'
    lienzo.textBaseline = 'middle'
    const anchoTexto = lienzo.measureText(texto).width + 12
    const yCartel = p.y - tamSprite - rebote - tamLetra * 0.6

    lienzo.fillStyle = esJugador ? 'rgba(120, 30, 10, 0.85)' : 'rgba(15, 15, 35, 0.8)'
    lienzo.beginPath()
    if (lienzo.roundRect) {
        lienzo.roundRect(p.x - anchoTexto / 2, yCartel - tamLetra * 0.75, anchoTexto, tamLetra * 1.5, 6)
    } else {
        lienzo.rect(p.x - anchoTexto / 2, yCartel - tamLetra * 0.75, anchoTexto, tamLetra * 1.5)
    }
    lienzo.fill()
    lienzo.fillStyle = esJugador ? '#f8d77e' : '#ffffff'
    lienzo.fillText(texto, p.x, yCartel)
}

function revisarColisiones(tiempo) {
    if (tiempo < invulnerableHasta) return null
    const radio = tamSprite * 0.32
    return enemigos.find(e => distancia(e, jugador) < radio * 2) || null
}

function empezarEncuentro(rival) {
    pausarMapa()
    soltarTeclas()
    enemigoActual = rival

    const aviso = document.getElementById('aviso-combate')
    aviso.innerHTML = `
        <span class="aviso-titulo">¡Combate!</span>
        <span class="aviso-vs">${jugador.icono} ${jugador.nombre} vs ${rival.nombre} ${rival.icono}</span>
    `
    aviso.classList.add('visible')

    setTimeout(() => {
        aviso.classList.remove('visible')
        iniciarCombate()
    }, 1400)
}

function actualizarHud() {
    document.getElementById('contador-enemigos').textContent = enemigos.length
    document.getElementById('iconos-enemigos').textContent = enemigos.map(e => e.icono).join(' ')
}

function configurarControles() {
    const MAPA_TECLAS = {
        ArrowUp: 'arriba', w: 'arriba',
        ArrowDown: 'abajo', s: 'abajo',
        ArrowLeft: 'izquierda', a: 'izquierda',
        ArrowRight: 'derecha', d: 'derecha'
    }

    window.addEventListener('keydown', (e) => {
        const tecla = e.key.length === 1 ? e.key.toLowerCase() : e.key
        const dir = MAPA_TECLAS[tecla]
        if (dir && pantallaActual === 'ver-mapa') {
            teclas[dir] = true
            e.preventDefault()
        }
    })

    window.addEventListener('keyup', (e) => {
        const tecla = e.key.length === 1 ? e.key.toLowerCase() : e.key
        const dir = MAPA_TECLAS[tecla]
        if (dir) teclas[dir] = false
    })

    document.querySelectorAll('.ctrl').forEach(boton => {
        const dir = boton.dataset.dir
        boton.addEventListener('pointerdown', (e) => {
            e.preventDefault()
            teclas[dir] = true
            if (boton.setPointerCapture) boton.setPointerCapture(e.pointerId)
        })
        ;['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => {
            boton.addEventListener(ev, () => { teclas[dir] = false })
        })
    })

    window.addEventListener('blur', soltarTeclas)
}

function soltarTeclas() {
    Object.keys(teclas).forEach(k => { teclas[k] = false })
}

function iniciarCombate() {
    combateTerminado = false
    enemigoActual.vidas = enemigoActual.vidasMaximas

    pintarLuchador('jugador', jugador)
    pintarLuchador('enemigo', enemigoActual)
    actualizarBarras()

    document.getElementById('mensajes').innerHTML = ''
    document.getElementById('resultado-combate').innerHTML = ''
    document.getElementById('acciones-fin').hidden = true
    document.getElementById('contenedor-botones').hidden = false
    document.querySelectorAll('.btn-ataque').forEach(b => { b.disabled = false })

    mostrarPantalla('seleccionar-ataque')
}

function pintarLuchador(lado, personaje) {
    const tarjeta = document.getElementById(`luchador-${lado}`)
    const img = tarjeta.querySelector('img')

    // La clase con el nombre (zuko, katara...) le da el color de su elemento
    tarjeta.className = 'luchador ' + personaje.nombre.toLowerCase()
    img.src = personaje.foto
    img.alt = personaje.nombre

    // El jugador mira hacia la derecha y el enemigo hacia la izquierda
    const voltear = lado === 'jugador' ? personaje.mira === -1 : personaje.mira === 1
    img.classList.toggle('voltear', voltear)

    document.getElementById(`personaje-${lado}`).textContent = `${personaje.nombre} ${personaje.icono}`
    tarjeta.querySelector('.luchador-elemento').textContent = personaje.elemento
}

function registrarAtaque(ataque) {
    if (combateTerminado) return
    ataqueJugador = ataque
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    const ataques = enemigoActual.ataques.map(a => a.nombre)
    ataqueEnemigo = ataques[aleatorio(0, ataques.length - 1)]
    combate()
}

function combate() {
    let resultado = ''
    let tipo = ''
    let golpeado = null

    if (ataqueEnemigo === ataqueJugador) {
        resultado = 'EMPATE 🤝'
        tipo = 'empate'
    } else if (
        (ataqueJugador === 'Punio' && ataqueEnemigo === 'Barrida') ||
        (ataqueJugador === 'Patada' && ataqueEnemigo === 'Punio') ||
        (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
    ) {
        resultado = 'GANASTE LA RONDA 🎉'
        tipo = 'gano'
        enemigoActual.vidas--
        golpeado = 'enemigo'
    } else {
        resultado = 'PERDISTE LA RONDA 💥'
        tipo = 'perdio'
        jugador.vidas--
        golpeado = 'jugador'
    }

    animarRonda(golpeado)
    actualizarBarras()
    crearMensaje(resultado, tipo)
    revisarVidas()
}

function animarRonda(golpeado) {
    const j = document.getElementById('luchador-jugador')
    const e = document.getElementById('luchador-enemigo')
    ;[j, e].forEach(el => el.classList.remove('ataca', 'golpeado', 'choque'))
    void j.offsetWidth // reinicio de las animaciones CSS

    if (!golpeado) {
        j.classList.add('choque')
        e.classList.add('choque')
    } else if (golpeado === 'enemigo') {
        j.classList.add('ataca')
        e.classList.add('golpeado')
    } else {
        e.classList.add('ataca')
        j.classList.add('golpeado')
    }
}

function actualizarBarras() {
    actualizarBarra('jugador', jugador)
    actualizarBarra('enemigo', enemigoActual)
}

function actualizarBarra(lado, personaje) {
    const barra = document.getElementById(`barra-vida-${lado}`)
    const porcentaje = (personaje.vidas / personaje.vidasMaximas) * 100
    barra.style.width = porcentaje + '%'
    barra.classList.toggle('media', porcentaje <= 67 && porcentaje > 34)
    barra.classList.toggle('baja', porcentaje <= 34)
    document.getElementById(`vidas-${lado}`).textContent =
        '❤️'.repeat(personaje.vidas) + '🖤'.repeat(personaje.vidasMaximas - personaje.vidas)
}

function revisarVidas() {
    if (enemigoActual.vidas === 0) {
        terminarCombate()
        enemigos = enemigos.filter(e => e !== enemigoActual)
        actualizarHud()

        if (enemigos.length === 0) {
            crearMensajeFinal('🏆 ¡Felicidades! ¡GANASTE EL JUEGO!', 'Derrotaste a todos los rivales. ¡Sos el verdadero Avatar!', false)
        } else {
            const texto = enemigos.length === 1 ? 'Queda 1 rival en el mapa.' : `Quedan ${enemigos.length} rivales en el mapa.`
            crearMensajeFinal(`🏆 ¡Derrotaste a ${enemigoActual.nombre}!`, texto, true)
        }
    } else if (jugador.vidas === 0) {
        terminarCombate()
        crearMensajeFinal('💀 ¡Fin del juego!', `${enemigoActual.nombre} te ha derrotado.`, false)
    }
}

function terminarCombate() {
    combateTerminado = true
    document.querySelectorAll('.btn-ataque').forEach(b => { b.disabled = true })
}

function crearMensaje(resultado, tipo) {
    const sectionMensaje = document.getElementById('mensajes')
    const p = document.createElement('p')
    p.className = tipo
    p.innerHTML = `Atacaste con <strong>${NOMBRES_ATAQUE[ataqueJugador]}</strong>, ${enemigoActual.nombre} atacó con <strong>${NOMBRES_ATAQUE[ataqueEnemigo]}</strong>. <strong>${resultado}</strong>`
    sectionMensaje.prepend(p)

    while (sectionMensaje.children.length > 4) sectionMensaje.lastElementChild.remove()
}

function crearMensajeFinal(titulo, detalle, puedeSeguir) {
    document.getElementById('resultado-combate').innerHTML = `<h2>${titulo}</h2><p>${detalle}</p>`
    document.getElementById('contenedor-botones').hidden = true
    document.getElementById('acciones-fin').hidden = false
    document.getElementById('boton-volver-mapa').hidden = !puedeSeguir
    document.getElementById('boton-reiniciar').hidden = puedeSeguir
}

function volverAlMapa() {
    jugador.vidas = jugador.vidasMaximas  
    enemigoActual = null
    mostrarPantalla('ver-mapa')
    invulnerableHasta = performance.now() + 1500
    reanudarMapa()
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function distancia(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y)
}

function mezclar(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]]
    }
}

window.addEventListener('load', iniciarJuego)
