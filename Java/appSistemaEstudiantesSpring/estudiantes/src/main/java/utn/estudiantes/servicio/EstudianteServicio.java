package utn.estudiantes.servicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.estudiantes.modelo.estudiantes2026;
import utn.estudiantes.repositorio.EstudianteRepositorio;

import java.util.List;

@Service

public class EstudianteServicio implements IEstudianteServicio{
    @Autowired
    private EstudianteRepositorio estudianteRepositorio;

    @Override
    public List<estudiantes2026> listarEstudiantes() {
        List<estudiantes2026> estudiantes = estudianteRepositorio.findAll();
        return estudiantes;
    }

    @Override
    public estudiantes2026 buscarEstudiantePorId(Integer idEstudiante) {
        estudiantes2026 estudiante = estudianteRepositorio.findById(idEstudiante).orElse(null);
        return estudiante;
    }

    @Override
    public void guardarEstudiante(estudiantes2026 estudiante) {
        estudianteRepositorio.save(estudiante);
    }

    @Override
    public void eliminarEstudiante(estudiantes2026 estudiante) {
        estudianteRepositorio.delete(estudiante);
    }
}
