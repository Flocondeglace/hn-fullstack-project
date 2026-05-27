package fr.payenf.fullstack_project.dto;

import fr.payenf.fullstack_project.entity.UserType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class UserInfo {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String userTypeName;
}
