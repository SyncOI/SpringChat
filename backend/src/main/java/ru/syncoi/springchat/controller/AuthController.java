package ru.syncoi.springchat.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.*;
import ru.syncoi.springchat.config.JwtConfig;
import ru.syncoi.springchat.dto.AuthRequest;
import ru.syncoi.springchat.dto.JwtResponse;
import ru.syncoi.springchat.dto.RegisterForm;
import ru.syncoi.springchat.model.User;
import ru.syncoi.springchat.service.JwtTokenProvider;
import ru.syncoi.springchat.service.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/")
@CrossOrigin
@ControllerAdvice
public class AuthController {

    private UserService service;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private BCryptPasswordEncoder encoder;

    public AuthController(UserService service, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, BCryptPasswordEncoder encoder) {
        this.service = service;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.encoder = encoder;
    }

    @RequestMapping(value = "/user")
    public ResponseEntity<?> currentUserInformation() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Map<String, String> rsl = new HashMap<>();
        rsl.put("username", authentication.getName());
        return ResponseEntity.ok(rsl);
    }

    @RequestMapping(value = "/auth", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAuthenticateToken(@RequestBody AuthRequest authRequest) {

        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(),
                    authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            Map<String, String> rsl = new HashMap<>();
            rsl.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(rsl);
        }
        return ResponseEntity.ok(new JwtResponse(jwtTokenProvider.generateToken(authentication)));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterForm registerForm) {

        User user = registerForm.toUser();
        SecurityContextHolder.getContext().getAuthentication();

        if (service.create(user)) {

            UserDetails userDetails =
                    service.loadUserByUsername(user.getUsername());

            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            final String token = jwtTokenProvider.generateToken(authentication);
            return ResponseEntity.ok().body(new JwtResponse(token));
        } else {
            Map<String, String> rsl = new HashMap<>();
            rsl.put("error", "This username already exists");
            return ResponseEntity.badRequest().body(rsl);
        }

    }
}
