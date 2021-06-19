import React, {useState} from "react";
import Rating from '@material-ui/lab/Rating';
import {makeStyles} from "@material-ui/core/styles";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia, Grid, IconButton,
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
	left: {
		paddingLeft: 5
	}
});

// TODO: More appealing card styling
const Post = ({ post, onUpdate, onEdit, onDelete }) => {
	const [num_ratings, set_num] = useState(post.num_ratings);
    const handleDelete = () => onDelete(post.id);
    const handleRating = (e, newValue) => {
		let { id, rating, num_ratings } = post;
		const body =
			{
				value: newValue
			};
		onEdit(id, 'rating', body);
		set_num(num_ratings + 1);
	}
    const image = "uploads/" + post.id + "/" + post.image;
    const classes = useStyles();
    const rating_num = `(${num_ratings})`;
    return (
        // Material-UI card component for review / post
        <Card className={classes.root}>
			<CardHeader
				// action={
				// 	<UpdateDialog onUpdate={onUpdate} post={post}/>
				// }
				title={post.name}
			/>
        	<CardContent display="inline">
				<Grid container>
					<Grid item>
						<Rating value={post.rating} onChange={handleRating} />
					</Grid>
					<Grid item>
						<Typography color="textSecondary" className={classes.left}>
							{rating_num}
						</Typography>
					</Grid>
				</Grid>
        		<Typography className={classes.pos} color="textSecondary">
        			{post.description}
        		</Typography>
        		<CardMedia
        			className={classes.media}
					image={image}
        			/>
				{/*<CardActions>*/}
				{/*	<Button onClick={handleDelete}>Delete</Button>*/}
				{/*</CardActions>*/}
        	</CardContent>
        </Card>
    )
}

export default Post;
