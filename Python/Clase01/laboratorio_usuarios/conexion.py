import sqlite3
from logger_base import log


class Conexion:
  DATABASE = "laboratorio_usuarios.db"
  USERNAME = "root"
  PASSWORD = "admin"
  DB_PORT = "5432"
  HOST = "localhost"
  MIN_CON = 1
  MAX_CON = 5
  _conexion_unica = None

  @classmethod
  def obtenerPool(cls):
    """Retorna la conexión simulando la existencia del pool."""
    if cls._conexion_unica is None:
      try:
        cls._conexion_unica = sqlite3.connect(cls.DATABASE)
        log.info("Pool de conexiones creado con éxito.")
      except Exception as e:
        log.error(f"Error al obtener el pool: {e}")
    return cls._conexion_unica

  @classmethod
  def obtenerConexion(cls):
    return cls.obtenerPool()

  @classmethod
  def liberarConexion(cls, conexion):
    log.info("Conexión devuelta al pool de manera conceptual.")

  @classmethod
  def cerrarConexiones(cls):
    if cls._conexion_unica is not None:
      cls._conexion_unica.close()
      cls._conexion_unica = None
      log.info("Todas las conexiones del pool han sido cerradas.")


# Inicialización segura de la tabla de datos
try:
  conn = sqlite3.connect(Conexion.DATABASE)
  cursor = conn.cursor()
  cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuario (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )
    """)
  conn.commit()
  conn.close()
except Exception as e:
  log.error(f"Error al inicializar la base de datos: {e}")
