package com.kubczakn.aarestaurants.posts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kubczakn.aarestaurants.reviewers.Reviewer;

import java.util.Objects;

import javax.persistence.*;

@Entity
public class Post {
    private @Id @GeneratedValue Long id; 
    private String name;
    private int rating;
    private String description;

    // Used to support versioning of resources
    private @Version @JsonIgnore Long version;

    // Each post is associated with a user
    private @ManyToOne Reviewer reviewer;

    private Post() {}

    public Post(String name, int rating, String description, Reviewer user) {
        this.name = name;
        this.rating = rating;
        this.description = description;
        this.reviewer = user;
    }

    @Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Post post = (Post) o;
		return Objects.equals(id, post.id) &&
			Objects.equals(name, post.name) &&
			Objects.equals(rating, post.rating) &&
			Objects.equals(description, post.description) &&
            Objects.equals(version, post.version) &&
            Objects.equals(reviewer, post.reviewer);
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

    public Long getVersion() { return version; }

    public void setVersion(Long version) { this.version = version; }

    public Reviewer getReviewer() { return reviewer; }

    public void setReviewer(Reviewer user) { this.reviewer = user; }
}
