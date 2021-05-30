package com.kubczakn.aarestaurants.reviewers;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Reviewer
{
    @Id
    private Long id;

    private String name;

    private String password;

    public Reviewer(Long id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
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
}
