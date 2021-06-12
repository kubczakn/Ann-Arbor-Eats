package com.kubczakn.aarestaurants.ratings;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class RatingKey implements Serializable
{
    @Column(name = "post_id")
    private Long post_id;

    @Column(name = "reviewer")
    private String reviewer;

    public RatingKey()
    {

    }

    public RatingKey(Long post_id, String reviewer) {
        this.post_id = post_id;
        this.reviewer = reviewer;
    }

    public Long getPost_id()
    {
        return post_id;
    }

    public void setPost_id(Long post_id)
    {
        this.post_id = post_id;
    }

    public String getReviewer()
    {
        return reviewer;
    }

    public void setReviewer(String reviewer)
    {
        this.reviewer = reviewer;
    }
}
