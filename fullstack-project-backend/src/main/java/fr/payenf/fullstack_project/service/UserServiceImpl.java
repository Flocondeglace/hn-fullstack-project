package fr.payenf.fullstack_project.service;

import fr.payenf.fullstack_project.dao.UserRepository;
import fr.payenf.fullstack_project.dao.UserTypeRepository;
import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.User;
import fr.payenf.fullstack_project.entity.UserType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class UserServiceImpl implements UserService{

    private static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final UserTypeRepository userTypeRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,  UserTypeRepository userTypeRepository) {
        this.userRepository = userRepository;
        this.userTypeRepository = userTypeRepository;
    }

    /*
        Create a dto corresponding to user based on the user in db
     */
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

    /*
        Create an user based on the dto corresponding to user
        Use UserInfo.id to find the corresponding UserType in db (UserInfo.userTypeName not used)
     */
    private User userInfoToUser(UserInfo userInfo) {

        logger.info("Trying to save user : {}", userInfo);
        User user = this.userRepository.findById(userInfo.getId()).orElse(new User());
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setEmail(userInfo.getEmail());
        UserType userType = this.userTypeRepository.findById(userInfo.getUserTypeId()).orElse(null);
        user.setUserType(userType);
        return user;
    }

    @Override
    public UserInfo getUser(int id) {
        User user = this.userRepository.findById(id).orElse(new User());
        logger.info("Get user by id {} : {}", id, user);
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
        User user = this.userInfoToUser(userInfo);
        this.userRepository.save(user);
        logger.info("SUCCESS: Saving user {}", user);
        return user;
    }

    @Override
    public boolean removeUser(int id) {
        Optional<User> userOpt = this.userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            UserType userType = user.getUserType();
            /*if (userType != null) {
                userType.getUsers().remove(user);
            }*/

            userRepository.save(user);

            this.userRepository.deleteById(id);
            logger.info("SUCCESS: User {} has been removed", id);
            if (userType != null) {
                userType.getUsers();
            }
            return true;
        } else {
            logger.warn("User with id {} not found", id);
            return false;
        }
    }

    @Override
    public UserType saveUserType(UserTypeInfo userTypeInfo) {
        UserType userType;

        // if id set, update the corresponding userType in the db

        Optional<UserType> userTypeDb = this.userTypeRepository.findById(userTypeInfo.getId());
            userType =  userTypeDb.orElse(new UserType());

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
    public void removeUserType(int id) {
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
