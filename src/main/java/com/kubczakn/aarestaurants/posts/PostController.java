package com.kubczakn.aarestaurants.posts;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.kubczakn.aarestaurants.reviewers.Reviewer;
import com.kubczakn.aarestaurants.reviewers.ReviewerRepository;
import com.kubczakn.aarestaurants.utils.FileUploadUtil;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
        p.setRating(0);
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
        , @RequestParam int rating
        , @RequestParam String description
        , @RequestParam("image") MultipartFile multipartFile )
        throws ResourceNotFoundException, IOException
    {

        Post post = postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No post with this id exists"));
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        post.setName(name);
        post.setRating(rating);
        post.setDescription(description);
        post.setImage(fileName);
        postRepository.save(post);
        String uploadDir = "uploads/" + post.getId();
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
        return post;
    }

    @PatchMapping(path="/posts/{id}", consumes = "application/json-patch+json")
    public Post editPost(@PathVariable(value = "id") Long id
       , @RequestBody JsonPatch patch
    )
        throws ResourceNotFoundException, IOException, JsonPatchException
    {
        Post post = postRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("No post with this id exists"));
       return applyPatchToPost(patch, post);
    }


    private Post applyPatchToPost(
        JsonPatch patch, Post targetPost
    ) throws JsonPatchException, JsonProcessingException
    {
        ObjectMapper objectMapper = new ObjectMapper();
        // Apply patch and return patched post
        JsonNode patched = patch.apply(objectMapper.convertValue(targetPost, JsonNode.class));
        return objectMapper.treeToValue(patched, Post.class);
    }

}
