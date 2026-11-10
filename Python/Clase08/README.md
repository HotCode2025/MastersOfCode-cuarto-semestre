# Entorno Virtual en Python y Control de Versiones

## 1. Conceptos clave

### ¿Qué es un entorno virtual (`venv`)?

Un **entorno virtual** es un espacio de trabajo independiente asociado a un proyecto de Python. En su interior se encuentra el intérprete de Python y las librerías instaladas para ese desarrollo en particular.

### ¿Para qué sirve?

- **Aislamiento de dependencias:** Evita que las librerías de un proyecto interfieran con las de otro o con las del sistema operativo.

- **Organización:** Mantiene cada proyecto limpio con las versiones exactas que necesita.

---

## 2. Inicio de proyecto y configuración con Git

Comenzamos con el clonado del repositorio, la creación de ramas de trabajo y el push en la terminal (Ubuntu / Git Bash):

```bash
mkdir py-project
cd py-project
git clone https://github.com/tu-usuario/tu-repositorio.git
ll
cd python-pip
code .
git branch # Solo está la rama main
git branch second # Iniciación de ramas de trabajo paralelas
git branch profe
git branch ariel22
git status # Verificación de modificaciones pendientes en el working directory
git add .
git commit -m "Agrego los apuntes detallados de las clases"
git push origin main # Requiere autenticación mediante Personal Access Token (PAT)

# Procedimiento de generación de credenciales en GitHub:
# Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
# Configurar una nota descriptiva, definir la vigencia temporal, habilitar los permisos requeridos, generar y almacenar el token de forma segura.

git pull origin main
# Usuario: tu-usuario
# Password: accessToken # Credencial generada previamente para la autorización remota

# Configuración opcional para almacenar las credenciales localmente y evitar reingresarlas
git config --global credential.helper store
```

---

## 3. Flujo práctico de entornos virtuales en clase

Me cambio a mi rama de trabajo y reviso qué Python y qué pip estoy usando antes de crear el entorno:

```bash
git push origin profe        # Sincronización de la rama local 'profe' con el repositorio remoto
git pull origin profe        # Actualización del repositorio local respecto al remoto
git fetch                    # Descarga de referencias y objetos del repositorio remoto sin fusionar
git checkout ariel22         # Cambio de contexto hacia la rama de trabajo individual

which python3                # Identificación de la ruta absoluta del intérprete global de Python
which pip3                   # Localización del ejecutable global del gestor de paquetes pip

sudo apt install -y python3-venv   # Instalación del paquete requerido para la inicialización de entornos virtuales

cd app
pwd                          # Muestra la ruta absoluta del directorio de trabajo actual
python3 -m venv env          # Creación del entorno virtual aislado bajo el directorio 'env'
source env/bin/activate      # Activación del entorno virtual en Linux / Git Bash (modificación del PATH)
env\Scripts\activate         # Comando de activación equivalente para entornos Windows

which python3                # Verificación de la ruta activa del intérprete (apunta al entorno local)
which pip3                   # Verificación de la ruta activa del gestor de paquetes local
pip3 freeze                  # Inspección de las dependencias instaladas (estado inicial sin paquetes)

pip3 install matplotlib      # Instalación local de la biblioteca gráfica en el entorno aislado
pip3 freeze                  # Visualización de los paquetes consolidados junto a sus subdependencias
```

> **Nota:** De esta manera, cada proyecto opera con su propio entorno de ejecución y dependencias independientes, preservando intacta la configuración global del sistema.

---

## 4. Buenas prácticas, colaboración y flujo final en Git

### Gestión de dependencias (`requirements.txt`)

Este archivo gestiona todas las dependencias y las versiones exactas que necesita el proyecto para funcionar. Los comandos para exportar e instalar dependencias son los siguientes:

```bash
# Exportar las dependencias actuales del entorno activo
pip3 freeze > requirements.txt

# Para que un colaborador instale exactamente el mismo entorno en su máquina
pip3 install -r requirements.txt
python3 main.py              # Ejecución del programa principal
```

* **Uso del archivo `.gitignore`:** La carpeta del entorno virtual (`env/` o `.venv/`) **nunca debe subirse a GitHub**, ya que contiene ejecutables pesados y rutas locales. Se debe agregar dicha carpeta dentro del archivo `.gitignore`.

---

### Finalización del trabajo y sincronización remota

Una vez concluidas las tareas en el entorno de desarrollo, procedemos a desactivar el entorno virtual y enviar los cambios al repositorio remoto:

```bash
deactivate                   # Desactivación y salida del entorno virtual

git status                   # Verificación de archivos modificados y no rastreados (untracked)
git add .                    # Inclusión de todas las modificaciones al área de preparación (staging)
git commit -m "Creación del archivo requirements.txt para la instalación de dependencias"
git push origin ariel22      # Publicación de la rama individual en el repositorio remoto

# Integración y fusión de ramas de trabajo:
git checkout second          # Cambio hacia la rama de integración colectiva
git merge ariel22            # Fusión de los cambios provenientes de la rama individual
git push origin second       # Sincronización de la rama de integración con el repositorio remoto
git checkout main            # Retorno a la rama principal
```