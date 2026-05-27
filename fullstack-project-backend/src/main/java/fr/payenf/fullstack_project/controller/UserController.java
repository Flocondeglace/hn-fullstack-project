package fr.payenf.fullstack_project.controller;

import fr.payenf.fullstack_project.dao.UserRepository;
import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.User;
import fr.payenf.fullstack_project.entity.UserType;
import fr.payenf.fullstack_project.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(@RequestBody UserInfo user){
        userService.saveUser(user);
        return new ResponseEntity<>("User created", HttpStatus.OK);
    }

    @PostMapping("/create-type")
    public ResponseEntity<UserType> createType(@RequestBody UserTypeInfo userType){
        System.out.println("Saving user type : " + userType);
        UserType userTypeDb = userService.saveUserType(userType);
        if (userTypeDb == null){
            System.out.println("Bad Request");
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userTypeDb);
    }

    @DeleteMapping("/delete-type/{id}")
    public ResponseEntity<String> deleteUserType(@PathVariable int id){
        userService.removeUserType(id);
        return ResponseEntity.ok().build();
    }

}
