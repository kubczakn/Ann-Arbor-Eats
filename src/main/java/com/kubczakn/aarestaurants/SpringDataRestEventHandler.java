package com.kubczakn.aarestaurants;

import com.kubczakn.aarestaurants.posts.Post;
import com.kubczakn.aarestaurants.reviewers.Reviewer;
import com.kubczakn.aarestaurants.reviewers.ReviewerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

// Assigns reviewer to a post on post creation automatically
@Component
@RepositoryEventHandler(Post.class)
public class SpringDataRestEventHandler {

    private final ReviewerRepository reviewerRepository;

    @Autowired
    public SpringDataRestEventHandler(ReviewerRepository reviewerRepository) {
        this.reviewerRepository = reviewerRepository;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void applyUserInformationUsingSecurityContext(Post post) {

        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Reviewer reviewer = this.reviewerRepository.findByName(name);
        if (reviewer == null) {
            Reviewer newReviewer = new Reviewer();
            newReviewer.setName(name);
            newReviewer.setRoles(new String[]{"ROLE_REVIEWER"});
            reviewer = this.reviewerRepository.save(newReviewer);
        }
        post.setReviewer(reviewer);
    }
}
