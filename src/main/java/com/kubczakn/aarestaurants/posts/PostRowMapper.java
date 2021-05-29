package com.kubczakn.aarestaurants.posts;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PostRowMapper implements RowMapper<Post>
{
    @Override
    public Post mapRow(ResultSet rs, int rowNum) throws SQLException
    {
        Post post = new Post();

        post.setID(rs.getLong("post_id"));
        post.setName(rs.getString("name"));
        post.setRating(rs.getInt("rating"));
        post.setDescription(rs.getString("description"));

        return post;
    }
}
