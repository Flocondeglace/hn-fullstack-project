package fr.payenf.fullstack_project.dao;

import fr.payenf.fullstack_project.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserTypeRepository extends JpaRepository<UserType, Integer> {

    UserType findByTypeName(@Param("typeName") String typeName);
}
