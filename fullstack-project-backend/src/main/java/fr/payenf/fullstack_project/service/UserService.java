package fr.payenf.fullstack_project.service;

import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.User;
import fr.payenf.fullstack_project.entity.UserType;

import java.util.List;
import java.util.Set;

public interface UserService {

    UserInfo getUser(int id);
    Set<UserInfo> getAllUsers();
    User saveUser(UserInfo userInfo);

    /*
    Return true if successfully removed, false otherwise
     */
    boolean removeUser(int id);

    UserTypeInfo getUserType(int id);
    List<UserType> getAllUserTypes();
    UserType saveUserType(UserTypeInfo userTypeInfo);

    /*
    Return true if successfully removed, false otherwise
     */
    void removeUserType(int id);


}
