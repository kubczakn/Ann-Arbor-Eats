package com.kubczakn.aarestaurants.reviewers;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
public class Reviewer
{
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String password;

    private String[] roles;

    public Reviewer() {}

    public Reviewer(String name, String password, String[] roles) {
        this.name = name;
        this.password = PASSWORD_ENCODER.encode(password);
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reviewer reviewer = (Reviewer) o;
        return Objects.equals(id, reviewer.id) &&
            Objects.equals(name, reviewer.name) &&
            Objects.equals(password, reviewer.password) &&
            Arrays.equals(roles, reviewer.roles);
    }

    @Override
    public int hashCode() {

        int result = Objects.hash(id, name, password);
        result = 31 * result + Arrays.hashCode(roles);
        return result;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

}
