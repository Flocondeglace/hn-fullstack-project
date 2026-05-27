package fr.payenf.fullstack_project.service;

import fr.payenf.fullstack_project.dao.UserRepository;
import fr.payenf.fullstack_project.dao.UserTypeRepository;
import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.User;
import fr.payenf.fullstack_project.entity.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private UserTypeRepository userTypeRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,  UserTypeRepository userTypeRepository) {
        this.userRepository = userRepository;
        this.userTypeRepository = userTypeRepository;
    }

    @Override
    public void saveUser(UserInfo userInfo) {
        System.out.println("here");
        User user = new User();
        if (userInfo.getId() != null) {
            user = this.userRepository.findById(userInfo.getId()).orElse(new User());
        }
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setEmail(userInfo.getEmail());
        UserType userType = this.userTypeRepository.findByTypeName(user.getUserType().getTypeName());
        user.setUserType(userType);
        this.userRepository.save(user);
    }

    @Override
    public UserType saveUserType(UserTypeInfo userTypeInfo) {
        UserType userType;

        // if id set, update the corresponding userType in the db
        if (userTypeInfo.getId() != null) {
            Optional<UserType> userTypeDb = this.userTypeRepository.findById(userTypeInfo.getId());
            userType =  userTypeDb.orElse(new UserType());
        } else {
            userType = new UserType();
        }

        userType.setTypeName(userTypeInfo.getTypeName());
        System.out.println("Saving UserType " + userType);
        // this.userTypeRepository.findByTypeName(userTypeInfo.getTypeName())
        try {
            UserType savedUserType = this.userTypeRepository.save(userType);
            return savedUserType;
        } catch (RuntimeException e) {
            return null;
        }
    }

    @Override
    public void removeUserType(long id) {
        Optional<UserType> userType = this.userTypeRepository.findById(id);
        if (userType.isPresent()) {
            System.out.println("Removing UserType " + id);
            this.userTypeRepository.deleteById(id);
        } else {
            System.out.println("UserType with " + id + " not found");
        }
    }
}
