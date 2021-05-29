package com.kubczakn.aarestaurants.posts;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @GetMapping("/get")
    Iterable<Post> get() {
        return postRepository.findAll();
    }

    @PostMapping(path="/add")
    public @ResponseBody Post addNewPost (@RequestParam String name
        , @RequestParam int rating
        , @RequestParam String description) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Post p = new Post();
        p.setName(name);
        p.setRating(rating);
        p.setDescription(description);
        postRepository.save(p);
        return p;
    }
}
