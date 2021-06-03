import React, {useState} from 'react';
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        paddingBottom: 20,
    },
    text: {
        color: '#ffffff',
    }
});

// TODO: Allow for edits on individual review attributes; probably need to add patch endpoint
const Header = ( {attributes, onCreate}) => {
    const classes = useStyles();
    const [name, setName] = useState(null);
    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);

    const handleUpload = (e) => {
        setImage(e.target.files[0]);
    }

    // TODO: Figure out cleaner way of handling form
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('rating', rating);
        formData.append('description', description);
        formData.append('image', image);
        onCreate(formData);

        // Clear out the dialog's inputs
        setName(null);
        setRating(null);
        setDescription(null);
        setImage(null);

        // Navigate away from the dialog to hide it.
        window.location = "#";
	}

	// TODO: Extract create dialog
    return (
        <Grid item className={classes.root} xs={12}>
            <AppBar position={'static'}>
                <Toolbar>
                    <Button href="#createPost">
                        <Typography className={classes.text}>Create</Typography>
                    </Button>
                    <div id="createPost" className="modalDialog">
                        <div>
                            <a href="#" title="Close" className="close">X</a>
                            <Typography>Create New Post</Typography>
                            {/*<h2>Create new post</h2>*/}
                            <form  encType="multipart/form-data">
                                <p>
                                    <input type="text" placeholder="name" className="field" onChange={event => setName(event.target.value)}/>
                                </p>
                                <p>
                                    <input type="text" placeholder="rating"  className="field" onChange={event => setRating(event.target.value)}/>
                                </p>
                                <p>
                                    <input type="text" placeholder="description"  className="field" onChange={event => setDescription(event.target.value)}/>
                                </p>
                                <p>
                                    <input type="file" name="image" accept={"image/png, image/jpeg"} className="field" onChange={handleUpload}/>
                                </p>
                                <button onClick={handleSubmit}>Create</button>
                            </form>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default Header;


// handleSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData();
//     this.props.attributes.forEach(attribute => {
//         formData.append(attribute, ReactDOM.findDOMNode(this.refs[attribute]).value.trim());
//     });
//     this.props.onCreate(formData);
//
//     // clear out the dialog's inputs
//     this.props.attributes.forEach(attribute => {
//         ReactDOM.findDOMNode(this.refs[attribute]).value = '';
//     });
//
//     // Navigate away from the dialog to hide it.
//     window.location = "#";
// }
