package ar.com.utnfrsr.clase10.service;

import ar.com.utnfrsr.clase10.model.dto.request.TaskRequestDTO;
import ar.com.utnfrsr.clase10.model.dto.response.TaskResponseDTO;

import java.util.List;

public interface ITaskService {

    TaskResponseDTO createTask(TaskRequestDTO taskRequestDTO);

    List<TaskResponseDTO> findAll();

    void updateTaskAsFinished(Long id, boolean finished);

    void deleteById(Long id);

}