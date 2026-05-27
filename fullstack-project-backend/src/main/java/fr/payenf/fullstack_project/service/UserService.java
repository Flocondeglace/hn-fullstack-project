package fr.payenf.fullstack_project.service;

import fr.payenf.fullstack_project.dto.UserInfo;
import fr.payenf.fullstack_project.dto.UserTypeInfo;
import fr.payenf.fullstack_project.entity.UserType;

public interface UserService {

    void saveUser(UserInfo userInfo);
    UserType saveUserType(UserTypeInfo userTypeInfo);
    void removeUserType(long id);
}
