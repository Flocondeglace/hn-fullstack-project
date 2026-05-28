package fr.payenf.fullstack_project.service;

import fr.payenf.fullstack_project.dao.UserRepository;
import fr.payenf.fullstack_project.dao.UserTypeRepository;
import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.User;
import fr.payenf.fullstack_project.entity.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private UserTypeRepository userTypeRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,  UserTypeRepository userTypeRepository) {
        this.userRepository = userRepository;
        this.userTypeRepository = userTypeRepository;
    }

    private UserInfo userToUserInfo(User user) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        if (user.getUserType() != null) {
            userInfo.setUserTypeId(user.getUserType().getId());
            userInfo.setUserTypeName(user.getUserType().getTypeName());
        }
        userInfo.setEmail(user.getEmail());
        userInfo.setFirstName(user.getFirstName());
        userInfo.setLastName(user.getLastName());
        return userInfo;
    }

    @Override
    public UserInfo getUser(long id) {
        User user = this.userRepository.getReferenceById(id);
        return userToUserInfo(user);
    }

    @Override
    public Set<UserInfo> getAllUsers() {
        Set<UserInfo> userInfos = new HashSet<>();
        this.userRepository.findAll().forEach(user -> {
            UserInfo userInfo = this.userToUserInfo(user);
            userInfos.add(userInfo);
        });
        return userInfos;
    }

    @Override
    public User saveUser(UserInfo userInfo) {
        System.out.println("Saving user" +  userInfo);
        User user = new User();
        if (userInfo.getId() != null) {
            user = this.userRepository.findById(userInfo.getId()).orElse(new User());
        }
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setEmail(userInfo.getEmail());
        UserType userType = null;
        if (userInfo.getUserTypeId() != null) {
            userType = this.userTypeRepository.findById(userInfo.getUserTypeId()).orElse(null);
        }
        user.setUserType(userType);
        System.out.println("Saving " +  userType);
        return  this.userRepository.save(user);
    }

    @Override
    public void removeUser(long id) {
        Optional<User> userOpt = this.userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("Removing UserType " + id);
            UserType userType = user.getUserType();
            if (userType != null) {
                userType.getUsers().remove(user);
            }

            userRepository.save(user);

            this.userRepository.deleteById(id);
        } else {
            System.out.println("UserType with " + id + " not found");
        }
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

    @Transactional
    @Override
    public void removeUserType(long id) {
        Optional<UserType> userTypeOpt = this.userTypeRepository.findById(id);
        if (userTypeOpt.isPresent()) {
            UserType userType = userTypeOpt.get();
            System.out.println("Removing UserType " + id);

            List<User> users = new ArrayList<>(userType.getUsers());
            userType.getUsers().clear();

            users.forEach(user -> user.setUserType(null));

            userRepository.saveAll(users);

            this.userTypeRepository.deleteById(id);
        } else {
            System.out.println("UserType with " + id + " not found");
        }
    }
}
