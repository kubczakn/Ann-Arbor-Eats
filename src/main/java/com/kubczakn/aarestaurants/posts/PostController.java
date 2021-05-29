package com.kubczakn.aarestaurants.posts;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;

    JdbcTemplate jdbc;

//    @GetMapping("/get")
//    public @ResponseBody PostResponse get() {
//        // TODO: Finish
//        Iterable<Post> posts = postRepository.findAll();
//        PostResponse response = new PostResponse();
//        response.setStatus(true);
//        response.setMessage("Success");
//        response.setData(posts);
//        System.out.println(response);
//        return response;
//    }

//        @GetMapping("/get")
//        public ResponseEntity get() {
//            // TODO: Finish
//            Iterable<Post> posts = postRepository.findAll();
//            PostResponse response = new PostResponse();
//            response.setStatus(true);
//            response.setMessage("Success");
//            response.setData(posts);
//            System.out.println(response);
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//        }

    @GetMapping("/get")
    Iterable<Post> get() {
        return postRepository.findAll();
    }

    @PostMapping(path="/add") // Map ONLY POST Requests
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
