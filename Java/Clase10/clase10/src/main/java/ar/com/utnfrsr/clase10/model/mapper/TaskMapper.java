package ar.com.utnfrsr.clase10.model.mapper;

import ar.com.utnfrsr.clase10.model.dto.request.TaskRequestDTO;
import ar.com.utnfrsr.clase10.model.dto.response.TaskResponseDTO;
import ar.com.utnfrsr.clase10.model.entity.Task;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component /*de esta manera lo podremos inyectar en nuestras clases*/
public class TaskMapper {

    public Task toTask(TaskRequestDTO taskRequestDTO) {
        Task task = new Task();
        task.setTitle(taskRequestDTO.getTitle());
        task.setCreatedDate(LocalDateTime.now());
        task.setDate(taskRequestDTO.getDate());
        task.setTime(taskRequestDTO.getTime());
        return task;
    }

    public TaskResponseDTO toDTO(Task task) {
        TaskResponseDTO taskResponseDTO = new TaskResponseDTO();
        taskResponseDTO.setId(task.getId());
        taskResponseDTO.setTitle(task.getTitle());
        taskResponseDTO.setDate(task.getDate());
        taskResponseDTO.setTime(task.getTime());
        taskResponseDTO.setFinished(task.getFinished());
        return taskResponseDTO;
    }

    public List<TaskResponseDTO> toDTOList(List<Task> tasks) {
        return tasks.stream().map(this::toDTO).collect(Collectors.toList());
    }
}