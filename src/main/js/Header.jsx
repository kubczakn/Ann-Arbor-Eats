import React, {useState} from 'react';
import Create from './Modals/Create.jsx'
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

    return (
        <Grid item className={classes.root} xs={12}>
            <AppBar position={'static'}>
                <Toolbar>
                    <Create attributes={attributes} onCreate={onCreate}/>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default Header;
