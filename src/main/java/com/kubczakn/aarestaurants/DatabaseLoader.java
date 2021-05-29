package com.kubczakn.aarestaurants;

import com.kubczakn.aarestaurants.posts.Post;
import com.kubczakn.aarestaurants.posts.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final PostRepository posts;

    @Autowired
    public DatabaseLoader(PostRepository postRepository) {
       this.posts = postRepository;
    }

    @Override
    public void run(String... strings) throws Exception
    {

//        this.posts
//            .save(new Post("Sava's", 5, "A spirited dining " + "institution for every occasion!"));

    }
}
