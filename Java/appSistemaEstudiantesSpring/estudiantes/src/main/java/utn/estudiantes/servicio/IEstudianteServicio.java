package utn.estudiantes.servicio;

import utn.estudiantes.modelo.estudiantes2026;

import java.util.List;

public interface IEstudianteServicio {
    public List<estudiantes2026> listarEstudiantes();
    public estudiantes2026 buscarEstudiantePorId(Integer idestudiantes2026);
    public void guardarEstudiante(estudiantes2026 estudiante);
    public void eliminarEstudiante(estudiantes2026 estudiante);

}
