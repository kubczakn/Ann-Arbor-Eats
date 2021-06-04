import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia, IconButton,
	Typography
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import UpdateDialog from './Modals/Update.jsx';

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

// TODO: Add update / edit button, or maybe add somewhere else; patch replace operation
// TODO: Card header
const Post = ({ post, attributes, onUpdate, onDelete }) => {
    const handleDelete = () => onDelete(post.id);
    // const handlePatch = () => onPatch(post.id, )
    const image = "uploads/" + post.id + "/" + post.image;
    const classes = useStyles();
    return (
        // Material-UI card component for review / post
        <Card className={classes.root}>
			<CardHeader
				action={
					<UpdateDialog post={post}/>
				}
				title={post.name}
			/>
        	<CardContent>
        		{/*<Typography className={classes.title} color="textSecondary" gutterBottom>*/}
        		{/*	{post.name}*/}
        		{/*</Typography>*/}
				{/*<Button>Edit</Button>*/}
        		<Typography variant="h5" component="h2">
        			{post.rating}
        		</Typography>
        		<Typography className={classes.pos} color="textSecondary">
        			{post.description}
        		</Typography>
        		<CardMedia
        			className={classes.media}
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
