package fr.payenf.fullstack_project.dto;

import lombok.Data;

@Data
public class UserInfo {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Long userTypeId;
}
