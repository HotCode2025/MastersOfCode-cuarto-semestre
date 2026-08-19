from conexion import Conexion
from logger_base import log


class CursorDelPool:

  def __init__(self):
    self._conexion = None
    self._cursor = None

  def __enter__(self):
    log.info("Inicio del método con with (__enter__)")
    self._conexion = Conexion.obtenerConexion()
    self._cursor = self._conexion.cursor()
    return self._cursor

  def __exit__(self, tipo_excepcion, valor_excepcion, detalle_excepcion):
    log.info("Fin del método con with (__exit__)")
    if valor_excepcion:
      self._conexion.rollback()
      log.error(
          f"Ocurrió una excepción, se hace rollback: {valor_excepcion} {tipo_excepcion}"
      )
    else:
      self._conexion.commit()
      log.info("Transacción exitosa, se hace commit")

    self._cursor.close()
    Conexion.liberarConexion(self._conexion)
