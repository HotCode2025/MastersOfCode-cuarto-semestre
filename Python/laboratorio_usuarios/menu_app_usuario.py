from usuario import Usuario
from usuario_dao import UsuarioDao


def ejecutar_menu():
  opcion = None
  while opcion != 5:
    print("\n--- Menú App Usuario ---")
    print("1) Listar usuarios")
    print("2) Agregar usuario")
    print("3) Modificar usuario")
    print("4) Eliminar usuario")
    print("5) Salir")

    try:
      opcion = int(input("Digite la opción (1-5): "))
    except ValueError:
      print("Por favor, introduce un número entero válido.")
      continue

    if opcion == 1:
      usuarios = UsuarioDao.seleccionar()
      print("\n--- Lista de Usuarios ---")
      if not usuarios:
        print("No hay usuarios registrados en la base de datos.")
      else:
        for usuario in usuarios:
          print(usuario)

    elif opcion == 2:
      print("\n--- Agregar Usuario ---")
      username = input("Escribe el username: ")
      password = input("Escribe el password: ")
      usuario = Usuario(username=username, password=password)
      registros_insertados = UsuarioDao.insertar(usuario)
      print(f"Registros insertados: {registros_insertados}")

    elif opcion == 3:
      print("\n--- Modificar Usuario ---")
      try:
        id_usuario = int(input("Escribe el id_usuario a modificar: "))
        username = input("Escribe el nuevo username: ")
        password = input("Escribe el nuevo password: ")
        usuario = Usuario(id_usuario, username, password)
        registros_actualizados = UsuarioDao.actualizar(usuario)
        print(f"Registros actualizados: {registros_actualizados}")
      except ValueError:
        print("ID inválido.")

    elif opcion == 4:
      print("\n--- Eliminar Usuario ---")
      try:
        id_usuario = int(input("Escribe el id_usuario a eliminar: "))
        usuario = Usuario(id_usuario=id_usuario)
        registros_eliminados = UsuarioDao.eliminar(usuario)
        print(f"Registros eliminados: {registros_eliminados}")
      except ValueError:
        print("ID inválido.")

    elif opcion == 5:
      print("Saliendo de la aplicación...")
    else:
      print("Opción incorrecta, intenta de nuevo.")

11
if __name__ == "__main__":
  ejecutar_menu()
