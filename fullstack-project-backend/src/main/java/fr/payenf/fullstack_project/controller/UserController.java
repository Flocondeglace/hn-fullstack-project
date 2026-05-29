package fr.payenf.fullstack_project.controller;

import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.User;
import fr.payenf.fullstack_project.entity.UserType;
import fr.payenf.fullstack_project.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class.getName());

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-user/{id}")
    public ResponseEntity<UserInfo> getUser(@PathVariable int id) {
        UserInfo userInfo = userService.getUser(id);
        if (userInfo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userInfo);
    }


    @GetMapping("/user-list")
    public ResponseEntity<Set<UserInfo>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/create-user")
    public ResponseEntity<User> createUser(@RequestBody UserInfo user){
        logger.info("Trying to save user : {} \n and user type id : {}", user, user.getUserTypeId());
        User userDb = userService.saveUser(user);
        if (userDb == null){
            logger.warn("Bad Request");
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userDb);
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id){
        logger.info("Deleting user with id: {}",id);
        boolean deleted = userService.removeUser(id);
        if (deleted){
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get-type/{id}")
    public ResponseEntity<UserTypeInfo> getUserType(@PathVariable int id) {
        UserTypeInfo userTypeInfo = userService.getUserType(id);
        if (userTypeInfo == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userTypeInfo);
    }


    @GetMapping("/type-list")
    public ResponseEntity<List<UserType>> getAllUserTypes() {
        return ResponseEntity.ok(userService.getAllUserTypes());
    }


    @PostMapping("/create-type")
    public ResponseEntity<UserType> createType(@RequestBody UserTypeInfo userTypeInfo){
        logger.info("Trying to save user type : {}", userTypeInfo);
        UserType userTypeDb = userService.saveUserType(userTypeInfo);
        if (userTypeDb == null){
            logger.warn("Bad Request, tried to add : {}", userTypeInfo);
            return ResponseEntity.badRequest().build();
        }
        logger.info("UserType saved : {}", userTypeDb);
        return ResponseEntity.ok(userTypeDb);
    }

    @DeleteMapping("/delete-type/{id}")
    public ResponseEntity<String> deleteUserType(@PathVariable int id){

        logger.info("Deleting user type with id: {}",id);
        userService.removeUserType(id);
        return ResponseEntity.ok().build();
    }

}
