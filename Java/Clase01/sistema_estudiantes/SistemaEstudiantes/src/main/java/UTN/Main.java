package UTN;
import UTN.Conexion.Conexion;

public class Main {
    public static void main(String[] args) {
        var conexion = Conexion.getConnection();
        if(conexion != null)
            System.out.println("Conexión exitosa: "+conexion);
        else
            System.out.println("Error al conectarse");
    }
}
