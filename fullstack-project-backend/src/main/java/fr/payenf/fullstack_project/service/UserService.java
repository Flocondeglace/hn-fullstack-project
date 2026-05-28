package fr.payenf.fullstack_project.service;

import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.User;
import fr.payenf.fullstack_project.entity.UserType;

import java.util.Set;

public interface UserService {

    UserInfo getUser(int id);
    Set<UserInfo> getAllUsers();
    User saveUser(UserInfo userInfo);
    boolean removeUser(int id);
    UserType saveUserType(UserTypeInfo userTypeInfo);
    void removeUserType(int id);

}
