package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.RegisterRequest;
import com.knowledgegap.knowledge_gap_platform.dto.UserResponse;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserResponse Register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email Already Exists");
        }

        User user=new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        //password had to hash
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        user=userRepository.save(user);
        return  new UserResponse(user.getId(),user.getFullName(),user.getEmail());
    }

    @Override
    public List<UserResponse> getAllUsers() {
       return  userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail()))
                .toList();
    }

    @Override
    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail()
        );
    }



    @Override
    public UserResponse updateUser(Long id, RegisterRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("New Email Already Exists");
        }
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user =userRepository.save(user);

        return  new UserResponse(user.getId(),user.getFullName(), user.getEmail());

    }
    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(id);

    }
}
