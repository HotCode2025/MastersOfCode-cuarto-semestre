Clase04 
Tarea: Agregar actividad con GitHub: como solucionar el error 
			      fatal: not a git repository (or any of the parent directories): .git
¿Por qué motivos ocurre este error? agrega tu solución de tu propia investigación

Este ERROR aparece cuando intentas ejecutar un comando de Git (como git status, git add o git commit) en un directorio que no está bajo el control de versiones. 
Git determina esto porque no encuentra la carpeta oculta llamada .git, que es la base de datos donde guarda todo el historial. 
Los motivos por lo que ocurre este error son:

Falta de inicialización: El proyecto es nuevo y aún no se le ha indicado a Git que comience a rastrearlo.
Ruta incorrecta: La terminal está abierta en un directorio diferente (por ejemplo, una carpeta más arriba o en el escritorio) 
y no dentro de la carpeta específica del proyecto.

SOLUCION: 
Verificamos el directorio actual. En la terminal ejecutamos: pwd
Si la ruta no es la correcta, navegamos hacia la carpeta del juego y usamos el comando cd nombre de la carpeta.
Ya en la carpeta correcta, inicializamos el repositorio ejecutando el comando git init.
