import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle, Grid,
    TextField,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    text: {
        color: '#ffffff',
    }
});

// TODO: Make prettier
const CreateDialog = ( {attributes, onCreate}) => {
    const classes = useStyles();
    const [name, setName] = useState(null);
    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);

    const handleUpload = (e) => {
        setImage(e.target.files[0]);
    }

    // TODO: Figure out cleaner way of handling form
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        // formData.append('rating', rating);
        formData.append('description', description);
        formData.append('image', image);
        onCreate(formData);

        // Clear out the dialog's inputs
        setName(null);
        setRating(null);
        setDescription(null);
        setImage(null);

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
            <Button onClick={handleClickOpen}>
                <Typography className={classes.text}>Create</Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new post</DialogTitle>
                <DialogContent>
                    <form encType="multipart/form-data">
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    type="text"
                                    onChange={event => setName(event.target.value)}
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <TextField*/}
                            {/*        label="Rating"*/}
                            {/*        type="text"*/}
                            {/*        onChange={event => setRating(event.target.value)}*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    type="text"
                                    onChange={event => setDescription(event.target.value)}
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
                        <Button onClick={handleSubmit}>Create</Button>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default CreateDialog;

