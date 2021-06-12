package com.kubczakn.aarestaurants.ratings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface RatingRepository extends JpaRepository<Rating, RatingKey>
{
    Rating save(Rating rating);

    Rating findByRatingKey(RatingKey ratingKey);

    boolean existsByRatingKey(RatingKey ratingKey);
}
