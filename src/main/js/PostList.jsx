import React from "react";
import Post from "./Post.jsx";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        padding: 5,
    },
});

const PostList = ({ posts, attributes, onUpdate, onDelete }) => {
    const classes = useStyles();
    const post_content = Object.keys(posts).map((key, index) =>
        <Grid key={index} className={classes.root}>
            <Post
                post={posts[key]}
                attributes={attributes}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        </Grid>
    );

    return (
        <Grid container>
            {post_content}
        </Grid>
    )
}

export default PostList;

