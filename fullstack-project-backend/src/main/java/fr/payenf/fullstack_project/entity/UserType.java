package fr.payenf.fullstack_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Entity
@Table(name="user_type")
@Data
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
