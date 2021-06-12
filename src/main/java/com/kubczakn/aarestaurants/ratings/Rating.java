package com.kubczakn.aarestaurants.ratings;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class Rating
{
    @EmbeddedId
    private RatingKey ratingKey;

    private double rating;

    public Rating() {}

    public Rating(RatingKey ratingKey) {
        this.ratingKey = ratingKey;
        rating = 0;
    }

    public RatingKey getRatingKey()
    {
        return ratingKey;
    }

    public void setRatingKey(RatingKey ratingKey)
    {
        this.ratingKey = ratingKey;
    }

    public double getRating()
    {
        return rating;
    }

    public void setRating(double rating)
    {
        this.rating = rating;
    }
}
