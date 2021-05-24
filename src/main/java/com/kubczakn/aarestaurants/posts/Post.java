package com.kubczakn.aarestaurants.posts;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Post {
    private @Id @GeneratedValue Long id; 
    private String name;
    private int rating;
    private String description;

    private Post() {}

    public Post(String name, int rating, String description) {
        this.name = name;
        this.rating = rating;
        this.description = description;
    }

    @Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Post post = (Post) o;
		return Objects.equals(id, post.id) &&
			Objects.equals(name, post.name) &&
			Objects.equals(rating, post.rating) &&
			Objects.equals(description, post.description);
	}

    public Long getId() {
        return id;
    }

    public void setID(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getRating() {
        return rating;
    }

    public String getDescription() {
        return description;
    }
}