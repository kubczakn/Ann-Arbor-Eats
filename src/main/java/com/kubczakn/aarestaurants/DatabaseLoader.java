package com.kubczakn.aarestaurants;

import com.kubczakn.aarestaurants.posts.Post;
import com.kubczakn.aarestaurants.posts.PostRepository;

import com.kubczakn.aarestaurants.reviewers.Reviewer;
import com.kubczakn.aarestaurants.reviewers.ReviewerRepository;
import com.kubczakn.aarestaurants.utils.FileUploadUtil;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final PostRepository posts;
    private final ReviewerRepository reviewers;
    JSONParser parser = new JSONParser();

    @Autowired
    public DatabaseLoader(PostRepository postRepository, ReviewerRepository reviewers) {
       this.posts = postRepository;
       this.reviewers = reviewers;
    }

    public void loadRestaurants(File file)
        throws FileNotFoundException, ParseException
    {
        Object obj = parser.parse(new FileReader(file));
        JSONObject jsonObject = (JSONObject)obj;
        JSONArray locations = (JSONArray)jsonObject.get("locations");
        for (Object location : locations) {
            JSONObject locationObj = (JSONObject) location;
            Long id = ((Number) locationObj.get("id")).longValue();
            String name = (String) locationObj.get("name");
            String description = (String) locationObj.get("description");
            String fileName = (String) locationObj.get("image");
            double lat = ((Number)locationObj.get("lat")).doubleValue();
            double lng = ((Number)locationObj.get("lng")).doubleValue();
            Post p = new Post(id, name, description, fileName, lat, lng);
            posts.save(p);
        }
    }

    @Override
    public void run(String... strings) throws Exception
    {
//        File dbConfig = ResourceUtils.getFile("classpath:data/Locations.json");
//        loadRestaurants(dbConfig);
    }
}
