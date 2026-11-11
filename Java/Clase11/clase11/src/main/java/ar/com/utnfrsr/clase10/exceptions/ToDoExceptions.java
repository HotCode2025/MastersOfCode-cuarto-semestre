package ar.com.utnfrsr.clase10.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ToDoExceptions extends RuntimeException {

    private String message;
    private HttpStatus httpStatus; //para obtener el estado http

    public ToDoExceptions(String message, HttpStatus httpStatus) { //sobreescribimos el metodo runtimeexception
        super(message);
        this.message = message;
        this.httpStatus = httpStatus;
    }
}