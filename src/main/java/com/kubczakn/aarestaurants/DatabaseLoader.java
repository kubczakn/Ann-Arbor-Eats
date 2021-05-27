package com.kubczakn.aarestaurants;

import com.kubczakn.aarestaurants.posts.Post;
import com.kubczakn.aarestaurants.posts.PostRepository;

import com.kubczakn.aarestaurants.reviewers.Reviewer;
import com.kubczakn.aarestaurants.reviewers.ReviewerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final PostRepository posts;
    private final ReviewerRepository reviewers;

    @Autowired
    public DatabaseLoader(PostRepository postRepository, ReviewerRepository reviewerRepository) {
       this.reviewers = reviewerRepository;
       this.posts = postRepository;
    }

    @Override
    public void run(String... strings) throws Exception
    {
        Reviewer nathan = this.reviewers.save(new Reviewer("nathan", "password", "ROLE_REVIEWER"));
        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken("nathan", "doesn't matter",
                AuthorityUtils.createAuthorityList("ROLE_REVIEWER")));


        this.posts
            .save(new Post("Sava's", 5, "A spirited dining " + "institution for every occasion!", nathan));
        this.posts.save(new Post("Palio", 4, "Authentic Italian.", nathan));
        this.posts.save(new Post("Joe's", 4, "New York style pizza.", nathan));

        SecurityContextHolder.clearContext();
    }
}
