package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.RegisterRequest;
import com.knowledgegap.knowledge_gap_platform.dto.UserResponse;

import com.knowledgegap.knowledge_gap_platform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("hasRole('SYS_ADMIN')")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {
    private final UserService userService;


    @GetMapping()
    public ResponseEntity< List<UserResponse>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id,@RequestBody RegisterRequest request){
        return ResponseEntity.ok(userService.updateUser(id,request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        userService.delete(id);
      return   ResponseEntity.noContent().build();
    }
}
