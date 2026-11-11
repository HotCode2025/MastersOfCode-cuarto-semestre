package ar.com.utnfrsr.clase10.Repository;

import ar.com.utnfrsr.clase10.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskRepository extends JpaRepository<Task, Long> { //

    /**
     * Update task to status (true or false)
     * @param id recibe el ide para pasarlo a la query nativa
     */
    @Modifying //demuestra que la query es de actualización
    @Query(value = "UPDATE task SET finished = :finished WHERE id = :id", nativeQuery = true)
    public void markTaskAsFinished(@Param("id") Long id, @Param("finished") boolean finished);

}