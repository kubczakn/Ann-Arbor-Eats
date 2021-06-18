package com.kubczakn.aarestaurants.posts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kubczakn.aarestaurants.reviewers.Reviewer;

import java.util.Objects;

import javax.persistence.*;

@Entity
@Table(name = "posts")
public class Post {
    private @Id Long id;
    private String name;
    private double rating;
    private int num_ratings;
    private String description;

    private double lat;
    private double lng;

    private String image;

    Post() {}

    public Post(Long id, String name, String description, String image, double lat, double lng) {
        this.id = id;
        this.name = name;
        this.rating = 0;
        this.num_ratings = 0;
        this.description = description;
        this.image = image;
        this.lat = lat;
        this.lng = lng;
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

    public void setName(String name) {this.name = name;}

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {this.rating = rating; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {this.description = description; }

    public String getImage()
    {
        return image;
    }

    public void setImage(String image)
    {
        this.image = image;
    }

    public int getNum_ratings()
    {
        return num_ratings;
    }

    public void setNum_ratings(int num_ratings)
    {
        this.num_ratings = num_ratings;
    }

    public double getLat()
    {
        return lat;
    }

    public void setLat(double lat)
    {
        this.lat = lat;
    }

    public double getLng()
    {
        return lng;
    }

    public void setLng(double lng)
    {
        this.lng = lng;
    }
}
