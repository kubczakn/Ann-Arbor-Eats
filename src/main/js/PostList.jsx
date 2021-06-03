import React from "react";
import Post from "./Post.jsx";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        // padding: 5,
        paddingTop: 5,
    },
});

const PostList = ({ posts, attributes, onUpdate, onDelete }) => {
    const classes = useStyles();
    const post_content = Object.keys(posts).map((key, index) =>
        <Grid item key={index} className={classes.root} xs={12} md={6}>
            <Post
                post={posts[key]}
                attributes={attributes}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        </Grid>
    );

    return (
        <Grid container spacing={2}>
            {post_content}
        </Grid>
    )
}

export default PostList;

