package com.kubczakn.aarestaurants.posts;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.kubczakn.aarestaurants.ratings.Rating;
import com.kubczakn.aarestaurants.ratings.RatingKey;
import com.kubczakn.aarestaurants.ratings.RatingRepository;
import com.kubczakn.aarestaurants.reviewers.Reviewer;
import com.kubczakn.aarestaurants.reviewers.ReviewerRepository;
import com.kubczakn.aarestaurants.utils.FileUploadUtil;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ReviewerRepository reviewerRepository;

    @Autowired
    private RatingRepository ratingRepository;

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
        , @RequestParam String description
        , @RequestParam("image") MultipartFile multipartFile)
        throws IOException
    {
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        Post p = new Post();
        String reviewerName = SecurityContextHolder.getContext().getAuthentication().getName();
        Reviewer reviewer = reviewerRepository.findByName(reviewerName);
        p.setName(name);
        p.setRating(0.0);
        p.setNum_ratings(0);
        p.setDescription(description);
        p.setReviewer(reviewer);
        p.setImage(fileName);
        postRepository.save(p);
        String uploadDir = "uploads/" + p.getId();
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
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
        , @RequestParam double rating
        , @RequestParam int num_ratings
        , @RequestParam String description
        , @RequestParam("image") MultipartFile multipartFile )
        throws ResourceNotFoundException, IOException
    {

        Post post = postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No post with this id exists"));
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        post.setName(name);
        post.setRating(rating);
        post.setNum_ratings(num_ratings);
        post.setDescription(description);
        post.setImage(fileName);
        postRepository.save(post);
        String uploadDir = "uploads/" + post.getId();
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
        return post;
    }

    // Patch Mapping for rating
    @PatchMapping(path="/posts/rating/{id}", consumes = "application/json-patch+json")
    public Post editPost(@PathVariable(value = "id") Long id
        , @RequestBody Map<String, Double> body
    )
        throws ResourceNotFoundException
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        Post post = postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No post with this id exists"));
        RatingKey key = new RatingKey(id, currentUser);
        int num_ratings = post.getNum_ratings();
        // Get rating value without being divided by number of ratings
        double curr_val = post.getRating() * num_ratings;
        Double new_rate = body.get("value");
        if (!ratingRepository.existsByRatingKey(key)) {
            // Increment number of ratings if this is the first rating a user has made on this post
            ratingRepository.save(new Rating(key));
            ++num_ratings;
        }
        Rating rating = ratingRepository.findByRatingKey(key);
        // Find what the original user rating was and change it
        double prev_rate = rating.getRating();
        rating.setRating(new_rate);
        // Set new post rating based on new user rating and number of ratings
        curr_val = ((curr_val - prev_rate) + new_rate) / num_ratings;
        post.setRating(curr_val);
        post.setNum_ratings(num_ratings);
        postRepository.save(post);
        return post;
    }

}
