package fr.payenf.fullstack_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name="user_type")
@Getter
@Setter
public class UserType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="type_name")
    private String typeName;

    @OneToMany(mappedBy = "userType")
    @JsonIgnore
    private Set<User> users;

    @Override
    public String toString() {
        return "UserType{" +
                "id=" + id +
                ", typeName='" + typeName + '\'' +
                '}';
    }

}
