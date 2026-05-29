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

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

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
        User user = this.userRepository.findById(id).orElse(null);
        if (user == null) {
            logger.warn("User with id {} not found", id);
            return null;
        }
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

    @Transactional
    @Override
    public User saveUser(UserInfo userInfo) {
        // Check if email not already used
        List<User> userTypeList = this.userRepository.findAll();
        for (User user: userTypeList) {
            if (!Objects.equals(user.getId(), userInfo.getId()) && Objects.equals(user.getEmail(), userInfo.getEmail())){
                // email already used
                logger.info("User with email {} already exists", userInfo.getEmail());
                return null;
            }
        }
        User user = this.userInfoToUser(userInfo);
        this.userRepository.save(user);
        logger.info("SUCCESS: Saving user {}", user);
        return user;
    }

    @Transactional
    @Override
    public boolean removeUser(int id) {
        Optional<User> userOpt = this.userRepository.findById(id);
        if (userOpt.isPresent()) {
            this.userRepository.deleteById(id);
            logger.info("SUCCESS: User {} has been removed", id);
            return true;
        } else {
            logger.warn("User with id {} not found", id);
            return false;
        }
    }

    @Override
    public UserTypeInfo getUserType(int id) {
        UserType userType = this.userTypeRepository.findById(id).orElse(null);
        if (userType == null) {
            logger.warn("UserType with id {} not found", id);
            return null;
        }
        UserTypeInfo userTypeInfo = new UserTypeInfo();
        userTypeInfo.setId(userType.getId());
        userTypeInfo.setTypeName(userType.getTypeName());
        return userTypeInfo;
    }


    @Override
    public List<UserType> getAllUserTypes() {
        return this.userTypeRepository.findAll();
    }


    @Transactional
    @Override
    public UserType saveUserType(UserTypeInfo userTypeInfo) {

        // Check if name not already used
        List<UserType> userTypeList = this.userTypeRepository.findAll();
        for (UserType type: userTypeList) {
            if (!Objects.equals(type.getId(), userTypeInfo.getId()) && Objects.equals(type.getTypeName(), userTypeInfo.getTypeName())){
                // name already used
                logger.info("UserType with name {} already exists", userTypeInfo.getTypeName());
                return null;
            }
        }

        // if id not set to 0, update the corresponding userType in the db, else create a new one
        UserType userTypeDb = this.userTypeRepository.findById(userTypeInfo.getId()).orElse(new UserType());
        userTypeDb.setTypeName(userTypeInfo.getTypeName());

        logger.info("Successfully save user type {}", userTypeDb);
        return this.userTypeRepository.save(userTypeDb);
    }

    @Transactional
    @Override
    public void removeUserType(int id) {
        Optional<UserType> userTypeOpt = this.userTypeRepository.findById(id);
        if (userTypeOpt.isPresent()) {
            UserType userType = userTypeOpt.get();

            List<User> users = new ArrayList<>(userType.getUsers());
            userType.getUsers().clear();

            users.forEach(user -> user.setUserType(null));

            userRepository.saveAll(users);

            this.userTypeRepository.deleteById(id);
            logger.info("Successfully delete user type {}", id);
        } else {
            logger.warn("User with id {} not found", id);
        }
    }
}
