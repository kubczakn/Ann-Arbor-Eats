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

@Component
@RepositoryEventHandler(Reviewer.class)
public class RestEventHandler
{
    private final ReviewerRepository repo;

    @Autowired
    public RestEventHandler(ReviewerRepository repo) {
        this.repo = repo;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void checkUserInfo(Post post) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Reviewer reviewer = repo.findByName(name);
        if (reviewer == null) {
            Reviewer newReviewer = new Reviewer();
            newReviewer.setName(name);
            newReviewer.setRoles(new String[]{"ROLE_REVIEWER"});
            reviewer = this.repo.save(newReviewer);
        }
        post.setReviewer(reviewer);
    }
}
