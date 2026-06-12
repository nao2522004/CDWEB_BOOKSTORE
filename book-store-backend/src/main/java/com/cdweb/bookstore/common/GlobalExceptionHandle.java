package com.cdweb.bookstore.common;

import java.util.List;
import java.util.stream.Collectors;

import com.cdweb.bookstore.common.exception.ResourceAlreadyExistsException;
import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandle {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception ex) {
		ex.printStackTrace();
		return ApiResponse.error("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.", "INTERNAL_SERVER_ERROR");
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<?> handleNotFound(EntityNotFoundException ex) {
		return ApiResponse.error(ex.getMessage(), HttpStatus.BAD_REQUEST.name());
	}

	@ExceptionHandler({ ResourceNotFoundException.class, ResourceAlreadyExistsException.class })
	public ResponseEntity<?> handleNotFound(Exception ex) {
		return ApiResponse.error(ex.getMessage(), HttpStatus.BAD_REQUEST.name());
	}

	@ExceptionHandler(org.springframework.security.authentication.BadCredentialsException.class)
	public ResponseEntity<?> handleBadCredentials(org.springframework.security.authentication.BadCredentialsException ex) {
		return ApiResponse.error("Email hoặc mật khẩu không chính xác.", "BAD_CREDENTIALS");
	}

	@ExceptionHandler(org.springframework.security.core.userdetails.UsernameNotFoundException.class)
	public ResponseEntity<?> handleUsernameNotFound(org.springframework.security.core.userdetails.UsernameNotFoundException ex) {
		return ApiResponse.error(ex.getMessage(), "USER_NOT_FOUND");
	}

	@ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
	public ResponseEntity<?> handleAccessDenied(org.springframework.security.access.AccessDeniedException ex) {
		return ResponseEntity.status(HttpStatus.FORBIDDEN)
				.body(new ApiResponse<>(HttpStatus.FORBIDDEN, "Bạn không có quyền truy cập tài nguyên này.", null, "FORBIDDEN"));
	}

	@ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
	public ResponseEntity<?> handleAuthenticationException(org.springframework.security.core.AuthenticationException ex) {
		return ApiResponse.unauthorized("Yêu cầu chưa được xác thực hoặc phiên làm việc đã hết hạn.");
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
		String message = ex.getMessage();
		if (message == null || message.isBlank()) {
			message = "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.";
		}
		return ApiResponse.error(message, "BAD_REQUEST");
	}

	
	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<?> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
		String errorMessage = String.format("Tham số '%s' có giá trị '%s' không đúng định dạng.", ex.getName(),
				ex.getValue());
		return ApiResponse.error(errorMessage, HttpStatus.BAD_REQUEST.name());
	}

	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
		List<String> errorList = ex.getBindingResult().getFieldErrors().stream()
				.map(error -> error.getField() + ": " + error.getDefaultMessage()).collect(Collectors.toList());
		String errors = String.join("; ", errorList);
		ApiResponse<Object> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, errors, null, "VALIDATION_ERROR");
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

}
