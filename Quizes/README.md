# Masters Of Code 

Aqui en esta seccion se encuentran las respuestas de los quizes


## 19/08/2026
* Respuestas

1. Tienes varios labels que le indican al usuario qué está seleccionando con diferentes inputs de tipo radio. Pero al darle click a los labels, sus inputs correspondientes NO se seleccionan. ¿Cómo solucionarías este problema?
* Respuesta correcta: ✅ b. Asignando el mismo valor en el atributo id de los inputs y el atributo for de sus labels correspondientes.

2. ¿Qué etiqueta de HTML le permite a los usuarios escribir lo que ellos quieran?

* Respuesta correcta: ✅ d. input

3. ¿Qué significa maquetar una página web?
* Respuesta correcta: ✅ b. Escribir su estructura en HTML y CSS

4. Tienes el siguiente código HTML:

```
<button id="lanzar-ataque">¡Lanzar ataque!</button>
```
Necesitas ejecutar una alerta cada vez que los usuarios le den click a este botón.</br>
¿Cómo lo harías?</br>

* Respuesta correcta: ✅b. 
```
let botonLanzarAtaque = document.getElementById('lanzar-ataque')

   function enviarAlerta(){

	alert('Mensaje de la alerta')

   }

   botonLanzarAtaque.addEventListener('click', enviarAlerta())
```

## 27/08/2026
* Respuestas

1. Tienes el siguiente código HTML: 
```
<button id="boton-punio">Punio</button> 

<button id="boton-patada">Patada</button> 

<button id="boton-barrida">Barrida</button>
```
¿Cómo cambiamos el color del texto únicamente del botón de Punio?

* Respuesta correcta ✅ a. #boton-punio { color: red;}

2. Tenemos un elemento <p> con un width de 100px, un height de 100px y un padding de 20px. ¿Qué propiedad y valor de CSS podemos añadirle a nuestro <p> para que el padding NO modifique el tamaño de 100px de ancho y 100px de alto de este elemento?

* Respuesta correcta ✅ d. box-sizing: border-box;

3. Quieres sobrescribir todo el contenido HTML de un elemento sectionMensajes por un nuevo texto almacenado en la variable notificación. ¿Cómo lo harías?

* Respuesta correcta: ✅b. sectionMensajes.innerHTML = notificacion

4. ¿Qué propiedad y valor de CSS podemos utilizar para esconder secciones de HTML?

* Respuesta correcta ✅ d. display: none;

## 02/09/2026
* Respuestas

1. Si tienes varias funciones en un archivo .js y demasiadas variables creadas, ¿Qué se puede hacer para que este código quede más eficiente?

* Respuesta correcta ✅ b. Crear variables globales que se reutilicen en cada función

2. Cuando tengo un código en css para los estilos y necesito que sea un lugar resposive ¿Solo es suficiente usar un media query para un tamaño de celular o se necesita especificar los diferentes dispositivos en sus respectivos tamaños?

* Respuesta correcta ✅ c. Las medias querys no siempre se necesitan ni tampoco siempre se utilizan

3. En un código de css al agregar estilos ¿Se pueden agregar animaciones a cualquier sitio web?
* Respuesta correcta ✅ a. Si, es parte de la magia que se puede generar con css

4. En HTML hay diferentes secciones y etiquetas ¿Cómo se puede lograr editar una sección con css  si hemos utilizado JavaScript para mostrar esa sección o ocultarla?

* Respuesta correcta ✅ e. Todas las respuestas son Correctas


## 09/09/2026
* Respuestas

1. Tarea de investigación, deben buscar mas información de lo que es un EvenLoop con Node.js y enviarmela, la investigación puede ser a través de ChatGPT o de cualquier lugar pero esta información debe ser veraz y sertera.

* Respuesta: El Event Loop es el mecanismo central de Node.js que permite manejar operaciones asíncronas sin bloquear el hilo principal. Se encarga de escuchar y despachar eventos, ejecutando callbacks y gestionando tareas como operaciones de I/O, temporizadores, promesas, etc. Gracias a él, Node.js puede manejar muchas conexiones concurrentes de manera eficiente en un solo hilo.

2. Node.js es un entorno de ejecución multiplataforma basado en JavaScript, es de código abierto y principalmente se usa para servidores web. ¿Esto que quiere decir?
* Respuesta:  a. Quiere decir que lo utilizan los programadores Backend.

3. En el tema de node ¿Qué es el stack de un proceso? esto es algo que hablamos en la clase pasada
* Respuesta:  d. Todas las respuestas son correctas

4. ¿Qué es una pila tecnológica? Al seleccionar la respuesta, presentar luego un ejemplo
* Respuesta: e. Es un conjunto de tecnologías que se combinan para desarrollar un aplicación web completa.
* Ejemplo:
  Stack MERN:
  - MongoDB: Base de datos NoSQL para almacenamiento.
  - Express.js: Framework de backend sobre Node.js para estructurar las rutas y APIs.
  - React: Biblioteca de frontend para construir la interfaz de usuario en el navegador.
  - Node.js: Entorno de ejecución en el servidor que corre el backend.

## Tarea: Agregar actividad con GitHub: como solucionar el error
### fatal: not a git repository (or any of the parent directories): .git
### ¿Por qué motivos ocurre este error? agrega tu solución de tu propia investigación

### Respuesta de por qué motivos ocurre este error:

- Discrepancia de ruta entre la terminal y el proyecto: La carpeta .git existe en el disco, pero la terminal se encuentra abierta en un directorio superior, paralelo o dentro de una carpeta hermana. Git busca hacia arriba en el árbol de directorios, pero nunca hacia abajo o hacia los lados.
- Corrupción o estructura incompleta en .git: Git valida que .git sea un directorio funcional revisando archivos clave como HEAD y carpetas como refs/ y objects/. Si una clonación se interrumpió, hubo un apagón o se borró el archivo HEAD, Git lo considera inválido.
- Es un archivo plano con un puntero roto (worktree o submódulo): En configuraciones avanzadas, .git no es una carpeta sino un archivo de texto que apunta a otra ruta (mediante gitdir: <ruta>). Si la carpeta de destino se movió o renombró, el puntero queda roto.
- Problema de permisos o propiedad de usuario: Si los archivos de .git fueron creados con permisos de administrador (root / sudo) o por otro usuario del sistema, Git bloquea la lectura por motivos de seguridad o falta de permisos de acceso.

* Solución al error:

- 1- Reparar o regenerar la configuración con el comando:
```
  git init
```
- 2- Alinear la terminal con la ubicación exacta de .git
- en windows powershell 

``` 
Get-Location
Get-ChildItem -Force 
```
- Si ves que .git está dentro de una subcarpeta (por ejemplo, mi-app/.git), ingresa a ella antes de ejecutar comandos:
```
cd mi-app
git status
```

- 3- Corregir permisos de lectura y escritura
- En Windows: abre la terminal como Administrador o verifica las propiedades de la carpeta .git > pestaña Seguridad para asegurar que tu usuario tenga control total.

- 4- Si .git es un archivo de texto (submódulo/worktree)
- Abre el archivo .git con un editor de texto o en la terminal:
```
cat .git
```

- Si contiene gitdir: <ruta>, verifica que la ruta indicada exista realmente en el disco. Si la ruta cambió, corrígela manualmente para que coincida con la ubicación real del directorio del módulo.


## 16/09/2026

* Respuestas
1. En el mundo de la programación ¿Qué significa revisiones de código?

* Respuesta correcta: a-Se trata de una práctica donde un profesional del software revisa el código escrito por otro en búsqueda de mejorarlo.

2. En programación un código podría ser optimizado, hacerlo más limpio y escalable a largo plazo, haz una definición del significado de ESCALABILIDAD dentro de este contexto. Debes ampliar la respuesta investigando

La escalabilidad se refiere a la capacidad de un sistema, red o proceso para manejar un crecimiento significativo (ya sea en volumen de datos, cantidad de usuarios o complejidad) sin comprometer su rendimiento, funcionalidad o mantenibilidad. Un código escalable está diseñado de manera que, ante futuras expansiones o cambios, no sea necesario reescribirlo desde cero, sino que pueda adaptarse con modificaciones mínimas. Esto implica: -Arquitectura modular: Dividir el código en componentes independientes y reutilizables. -Eficiencia en recursos: Optimizar el uso de memoria, procesamiento y almacenamiento. -Flexibilidad: Permitir la integración de nuevas funcionalidades sin afectar las existentes. Ejemplo: Una aplicación web escalable puede pasar de servir a 100 usuarios a 1 millón sin caídas o lentitud extrema, gracias a técnicas como balanceo de carga, bases de datos distribuidas y código optimizado..<br/>

3. Don´t repeat yourself ¿A qué apunta esta frase? y ¿Cuál es su significado en programación? Debes ampliar la respuesta investigando

Don’t Repeat Yourself (DRY) significa “No te repitas”. Es un principio de programación que busca evitar repetir el mismo código o lógica varias veces. Para esto se pueden utilizar funciones o componentes reutilizables. De esta manera, el código queda más limpio, ordenado y es más fácil de modificar y mantener. <br/>

4. En programación cuando nos encontramos con errores ¿Cuál crees que será la respuesta correcta frente a la solución?

* Respuesta correcta : b- No siempre la misma solución, va a ser la solución, esto es que cuando hablamos de código podemos llegar a diferentes soluciones y si funciona está bien hecho.

## Autores

- [@FranciscoKnap](https://github.com/franciscoknap3)
- [@RafaelPacheco](https://github.com/rafiti19)
- [@XimenaTapia](https://github.com/TapiaXimena)
- [@FrancoCala](https://github.com/Franco279)
- [@JoseBritos](https://github.com/JoseBr2004)