package com.kubczakn.aarestaurants;

import com.kubczakn.aarestaurants.posts.Post;
import com.kubczakn.aarestaurants.posts.PostRepository;

import com.kubczakn.aarestaurants.reviewers.Reviewer;
import com.kubczakn.aarestaurants.reviewers.ReviewerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final PostRepository posts;
    private final ReviewerRepository reviewers;

    @Autowired
    public DatabaseLoader(PostRepository postRepository, ReviewerRepository reviewers) {
       this.posts = postRepository;
       this.reviewers = reviewers;
    }

    @Override
    public void run(String... strings) throws Exception
    {
//        reviewers.save(new Reviewer("nathan", "test", new String[]{"ROLE_REVIEWER"}));

    }
}
