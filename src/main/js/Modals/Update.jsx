import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle, Grid, IconButton,
    TextField,
    Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
    text: {
        color: '#ffffff',
    }
});

const UpdateDialog = ( {post, onUpdate}) => {
    const classes = useStyles();
    const [name, setName] = useState(post.name);
    const [rating, setRating] = useState(post.rating);
    const [description, setDescription] = useState(post.description);
    const [image, setImage] = useState(post.image);
    const [open, setOpen] = useState(false);

    const handleUpload = (e) => {
        setImage(e.target.files[0]);
    }

    // TODO: Figure out cleaner way of handling form
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('rating', rating);
        formData.append('num_ratings', 5);
        formData.append('description', description);
        formData.append('image', image);
        onUpdate(formData, post.id);

        // Exit from window
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <form encType="multipart/form-data">
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    type="text"
                                    onChange={event => setName(event.target.value)}
                                    defaultValue={post.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Rating"
                                    type="text"
                                    onChange={event => setRating(event.target.value)}
                                    defaultValue={post.rating}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    type="text"
                                    onChange={event => setDescription(event.target.value)}
                                    defaultValue={post.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Image"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleUpload}
                                />
                            </Grid>
                        </Grid>
                        <Button onClick={handleSubmit}>Edit</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UpdateDialog;
