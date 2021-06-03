import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";


const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
});

// TODO: Add update / edit button, or maybe add somewhere else
// Try destructuring
const Post = (props) => {
    const handleDelete = () => props.onDelete(props.value.id);
    const image = "uploads/" + props.value.id + "/" + props.value.image;
    const classes = useStyles();
    return (
        // Material-UI card component for review / post
        <Card className={classes.root}>
        	<CardContent>
        		<Typography className={classes.title} color="textSecondary" gutterBottom>
        			{props.value.name}
        		</Typography>
        		<Typography variant="h5" component="h2">
        			{props.value.rating}
        		</Typography>
        		<Typography className={classes.pos} color="textSecondary">
        			{props.value.description}
        		</Typography>
        		<CardMedia
        			className={classes.media}
        			// src={image}
					image={image}
        			/>
				<CardActions>
					<Button onClick={handleDelete}>Delete</Button>
				</CardActions>
        	</CardContent>
        </Card>
    )
}

export default Post;
