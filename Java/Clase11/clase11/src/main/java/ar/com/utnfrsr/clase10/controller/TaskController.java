package ar.com.utnfrsr.clase10.controller;

import ar.com.utnfrsr.clase10.model.dto.request.TaskRequestDTO;
import ar.com.utnfrsr.clase10.model.dto.response.TaskResponseDTO;
import ar.com.utnfrsr.clase10.service.impl.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController /*Anotación para confirmar de que se trata de un controlador el cual será revisado por swagger*/
@RequestMapping("api/v1/tasks")
@RequiredArgsConstructor
public class TaskController { //esta capa solo se comunica con la capa de servicio

    private final TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskRequestDTO taskRequestDTO) {
        TaskResponseDTO task = taskService.createTask(taskRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TaskResponseDTO>> findAll() {
        List<TaskResponseDTO> tasks = taskService.findAll();
        return ResponseEntity.ok(tasks);
    }
}