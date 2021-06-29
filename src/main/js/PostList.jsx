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


const PostList = ({loadPage, post_content}) => {
    const classes = useStyles();
    const handlePage = (e, value) => {
        loadPage(value - 1);
    }

    return (
        <Grid container spacing={2}>
            {post_content}
            <Pagination className={classes.pagination} count={2} onChange={handlePage} />
        </Grid>
    )
}

export default PostList;

