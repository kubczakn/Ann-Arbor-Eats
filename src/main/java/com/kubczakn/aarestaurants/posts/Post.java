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

    private String image;

    // Used to support versioning of resources
    private @Version @JsonIgnore Long version;

    // Each post is associated with a user
    private @ManyToOne Reviewer reviewer;

    Post() {}

    public Post(String name, int rating, String description, String image, Reviewer reviewer) {
        this.name = name;
        this.rating = rating;
        this.description = description;
        this.image = image;
        this.reviewer = reviewer;
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
            Objects.equals(version, post.version);
	}

//    @Transient
//    public String getImagePath() {
//        if (image == null || id == null) return null;
//        return "/uploads/" + id + "/" + image;
//    }

    public Long getId() {
        return id;
    }

    public void setID(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {this.name = name;}

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {this.rating = rating; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {this.description = description; }

    public Long getVersion() { return version; }

    public void setVersion(Long version) { this.version = version; }

    public Reviewer getReviewer() { return reviewer; }

    public void setReviewer(Reviewer user) { this.reviewer = user; }

    public String getImage()
    {
        return image;
    }

    public void setImage(String image)
    {
        this.image = image;
    }
}
