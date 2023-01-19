package com.pazdev.guitarshop.exception;

import com.pazdev.guitarshop.utils.ObjectHandling;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;

/**
 * Exception handler for all api requests.
 */
@RestControllerAdvice
@AllArgsConstructor
public class ApiExceptionHandler {

    private final ObjectHandling objectHandling = new ObjectHandling();

    /**
     * Ressource missing exceptions
     *
     * @param ex the exception
     * @return error message
     */
    @ExceptionHandler(value = ResourceNotFound.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage resourceNotFoundException(ResourceNotFound ex) {
        return new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                objectHandling.convertToLocalDateTime(new Date()),
                ex.getMessage(),
                "Resource not found"
        );
    }

    /**
     * Missing class exceptions.
     *
     * @param ex the exception
     * @return the error message
     */
    @ExceptionHandler(value = ClassNotFoundException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage classNotFoundException(ClassNotFoundException ex) {
        return new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                objectHandling.convertToLocalDateTime(new Date()),
                ex.getMessage(),
                "Class not found in the classpath"

        );
    }

    /**
     * Missing methods or constructor exceptions.
     *
     * @param ex the exception
     * @return the error message
     */
    @ExceptionHandler(value = InvocationTargetException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage invocationTargetException(InvocationTargetException ex) {
        return new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                objectHandling.convertToLocalDateTime(new Date()),
                ex.getMessage(),
                "Failed to invoke method or constructor"
        );
    }

    /**
     * Missing data exceptions.
     *
     * @param ex the exception
     * @return the error message
     */
    @ExceptionHandler(value = DataAccessException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage dataAccessException(DataAccessException ex) {
        return new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                objectHandling.convertToLocalDateTime(new Date()),
                ex.getMessage(),
                "Failed to handle Data"
        );
    }

    /**
     * Null pointer exceptions.
     *
     * @param ex the exception
     * @return the error message
     */
    @ExceptionHandler(value = NullPointerException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage nullPointerException(NullPointerException ex) {
        return new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                objectHandling.convertToLocalDateTime(new Date()),
                ex.getMessage(),
                "Data or object is probably corrupted or null"
        );
    }
}
