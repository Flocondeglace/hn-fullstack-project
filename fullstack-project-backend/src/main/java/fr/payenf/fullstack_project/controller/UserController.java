package fr.payenf.fullstack_project.controller;

import fr.payenf.fullstack_project.dao.UserRepository;
import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.User;
import fr.payenf.fullstack_project.entity.UserType;
import fr.payenf.fullstack_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class UserController {

    private Logger logger = Logger.getLogger(UserController.class.getName());


    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-user/{id}")
    public ResponseEntity<UserInfo> getUser(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUser(id));
    }


    @GetMapping("/user-list")
    public ResponseEntity<Set<UserInfo>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/create-user")
    public ResponseEntity<User> createUser(@RequestBody UserInfo user){
        logger.log(Level.INFO, "Trying to save user : {0} \n and user type id : {1}", new Object[]{user, user.getUserTypeId()});
        User userDb = userService.saveUser(user);
        if (userDb == null){
            logger.warning("Bad Request");
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userDb);
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id){
        logger.info(()->"Deleting user with id: %d".formatted(id));
        userService.removeUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create-type")
    public ResponseEntity<UserType> createType(@RequestBody UserTypeInfo userType){
        logger.log(Level.INFO, "Trying to save user type : {0}", userType);
        UserType userTypeDb = userService.saveUserType(userType);
        if (userTypeDb == null){
            logger.warning("Bad Request");
            return ResponseEntity.badRequest().build();
        }
        System.out.println(userTypeDb);
        return ResponseEntity.ok(userTypeDb);
    }

    @DeleteMapping("/delete-type/{id}")
    public ResponseEntity<String> deleteUserType(@PathVariable int id){

        logger.info(()->"Deleting user type with id: %d".formatted(id));
        userService.removeUserType(id);
        return ResponseEntity.ok().build();
    }

}
