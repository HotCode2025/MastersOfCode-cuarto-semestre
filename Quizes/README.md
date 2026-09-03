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

## Autores

- [@FranciscoKnap](https://github.com/franciscoknap3)
- [@RafaelPacheco](https://github.com/rafiti19)
- [@XimenaTapia](https://github.com/TapiaXimena)
- [@FrancoCala](https://github.com/Franco279)
- [@JoseBritos](https://github.com/JoseBr2004)