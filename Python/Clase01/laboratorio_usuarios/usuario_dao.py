from cursor_del_pool import CursorDelPool
from logger_base import log
from usuario import Usuario


class UsuarioDao:
  _SELECCIONAR = "SELECT * FROM usuario ORDER BY id_usuario"
  _INSERTAR = "INSERT INTO usuario(username, password) VALUES(?, ?)"
  _ACTUALIZAR = "UPDATE usuario SET username=?, password=? WHERE id_usuario=?"
  _ELIMINAR = "DELETE FROM usuario WHERE id_usuario=?"

  @classmethod
  def seleccionar(cls):
    with CursorDelPool() as cursor:
      cursor.execute(cls._SELECCIONAR)
      registros = cursor.fetchall()
      usuarios = []
      for registro in registros:
        # Desempaquetado seguro de tuplas para la entidad Usuario
        usuario = Usuario(registro, registro, registro)
        usuarios.append(usuario)
      return usuarios

  @classmethod
  def insertar(cls, usuario):
    with CursorDelPool() as cursor:
      valores = (usuario.username, usuario.password)
      cursor.execute(cls._INSERTAR, valores)
      log.info(f"Usuario preparado para insertar: {usuario}")
      return cursor.rowcount

  @classmethod
  def actualizar(cls, usuario):
    with CursorDelPool() as cursor:
      valores = (usuario.username, usuario.password, usuario.id_usuario)
      cursor.execute(cls._ACTUALIZAR, valores)
      log.info(f"Usuario preparado para actualizar: {usuario}")
      return cursor.rowcount

  @classmethod
  def eliminar(cls, usuario):
    with CursorDelPool() as cursor:
      valores = (usuario.id_usuario,)
      cursor.execute(cls._ELIMINAR, valores)
      log.info(f"Usuario preparado para eliminar: {usuario}")
      return cursor.rowcount
