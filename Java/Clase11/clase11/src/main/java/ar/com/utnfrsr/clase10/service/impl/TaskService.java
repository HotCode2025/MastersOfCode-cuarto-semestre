package ar.com.utnfrsr.clase10.service.impl;

import ar.com.utnfrsr.clase10.exceptions.ToDoExceptions;
import ar.com.utnfrsr.clase10.model.dto.request.TaskRequestDTO;
import ar.com.utnfrsr.clase10.model.dto.response.TaskResponseDTO;
import ar.com.utnfrsr.clase10.model.entity.Task;
import ar.com.utnfrsr.clase10.model.mapper.TaskMapper;
import ar.com.utnfrsr.clase10.Repository.TaskRepository;
import ar.com.utnfrsr.clase10.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service //le dice al contenedor bin de spring, que cree un bin y lo guarde en ese contenedor, para luego ser inyectado
@RequiredArgsConstructor
public class TaskService implements ITaskService {

    //en el service va toda la logica necesaria para el programa.
    private final TaskRepository repository;
    private final TaskMapper mapper;

    //Crea la tarea
    @Override
    public TaskResponseDTO createTask(TaskRequestDTO taskRequestDTO){
        Task task = mapper.toTask(taskRequestDTO);
        return mapper.toDTO(repository.save(task));
    }

    //muestra la lista de tareas
    @Override
    public List<TaskResponseDTO> findAll() {
        return mapper.toDTOList(repository.findAll());
    }

    //actualiza el estado de la tarea
    @Override
    @Transactional
    public void updateTaskAsFinished(Long id, boolean finished) {
        Optional<Task> optionalTask = this.repository.findById(id);
        if (optionalTask.isEmpty()) { //si no hay tarea
            throw new ToDoExceptions("Task not found", HttpStatus.NOT_FOUND);
        }
        if (finished){
            finished= false;
        }else {
            finished = true;
        }
        this.repository.markTaskAsFinished(id, finished);
    }

    //elimina el task mediante su id
    @Override
    public void deleteById(Long id) {
        Optional<Task> optionalTask = this.repository.findById(id);
        if (optionalTask.isEmpty()) {
            throw new ToDoExceptions("Task not found", HttpStatus.NOT_FOUND);
        }
        this.repository.deleteById(id);
    }
}