package com.kubczakn.aarestaurants.posts;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @GetMapping("/posts/get")
    Map<Long, Post> get() {
        Map<Long, Post> res = new HashMap<>();
        Iterable<Post> posts = postRepository.findAll();
        for (Post p: posts) {
           Long id = p.getId();
           res.put(id, p);
        }
        return res;
    }

    @PostMapping(path="/posts/add")
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

    @DeleteMapping(path="/posts/delete/{id}")
    public Map<String, Boolean> deletePost(@PathVariable(value = "id") Long id)
    throws ResourceNotFoundException
    {
        Post post = postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No Post with this id exists"));
        postRepository.delete(post);
        Map<String, Boolean> res = new HashMap<>();
        res.put("deleted", Boolean.TRUE);
        return res;
    }

    @PutMapping(path="/posts/{id}")
    public Post updatePost(@PathVariable(value = "id") Long id
        , @RequestParam String name
        , @RequestParam int rating
        , @RequestParam String description) throws ResourceNotFoundException {

        Post post = postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No Post with this id exists"));
        post.setName(name);
        post.setRating(rating);
        post.setDescription(description);
        postRepository.save(post);
        return post;
    }

}
