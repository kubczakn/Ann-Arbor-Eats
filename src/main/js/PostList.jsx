import React from "react";
import Post from "./Post.jsx";
import {Grid} from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        paddingTop: 5,
    },
    pagination: {
        paddingTop: 5,
        marginBottom: 15
    }
});

const PostList = ({ posts, onUpdate, onEdit, onDelete }) => {
    const classes = useStyles();
    const post_content = Object.keys(posts).map((key, index) =>
        <Grid item key={index} className={classes.root} xs={12} md={6}>
            <Post
                post={posts[key]}
                // onDelete={onDelete}
                // onUpdate={onUpdate}
                onEdit={onEdit}
            />
        </Grid>
    );

    return (
        <Grid container spacing={2}>
            {post_content}
            <Pagination className={classes.pagination} count={10} />
        </Grid>
    )
}

export default PostList;

